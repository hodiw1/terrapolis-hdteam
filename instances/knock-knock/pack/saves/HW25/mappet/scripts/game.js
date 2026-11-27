function start(c) {try{
    // c.send("game started");
    
    let world = c.getServer().getWorld(0);
    let gameData = cloneObject(gameDataOrig)
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");
    gameData.time = 40;
    gameData.door = customGameSetting.doorStartHp;

    c.scheduleScript(20, function (context) { //для плавного появления из темноты
        resetBlocks(c)
        deleteLoot(c)
        c.executeCommand("/mp npc despawn @e");
        world.setTime(1500);
        world.setBlock(mappet.createBlockState("hw25:outdoorclosed", 5), -13, 23, 25);
        
        customGameSetting.startAmmo ? spawnItem("hnt:ammo", mappet.vector(-10.5, 22.5, 28.5), world, null, 1, "owner") : null;
        spawnItem("hnt:hammer", mappet.vector(-10.5, 23, 24.5), world, null, 1, "owner")
        
        let shotGun = spawnItem("hw25:shotgun", mappet.vector(-11.6, 23, 27.5), world, null, 1, "owner")
        shotGun.setMorph(mappet.createMorph("{Hitbox:{Eye:0.9f,Sneak:0.5f,Enabled:1b,Height:0.5f,Width:0.5f},Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{R:[0.0f,0.0f,90.0f],S:[0.7f,0.7f,0.7f],T:[-0.125f,-0.0625f,0.0f],Limb:\"cube\",Morph:{Transform:\"\",Name:\"item\",ForcedSettings:0b,Stack:{id:\"hw25:shotgun\",Count:1b,Damage:0s}}}],Name:\"blockbuster.empty\",ForcedSettings:0b}"))
        shotGun.setRotations(0, 0, 0)
        
        if (c.getServer().getAllPlayers().size() == 1) {
            c.send("\u00A7e⚠ \u00A7rЭтот режим не рассчитан на одного игрока, но ты можешь протестировать некоторые игровые механики.");
        }
    });

    c.getServer().getStates().setString("!gameStatus", "running")
    c.getServer().getStates().setString("currentGuest", "")
    c.getServer().getStates().setString("guests", "[]")
    c.getServer().getStates().setString("spectators", "[]")
    c.getServer().getStates().setString("randomItems", "[]")
    c.getServer().getStates().setString("beds", '["", "", "", "", "", ""]')
    c.getServer().getStates().setNumber("ropedMonsters", 0)
    c.getServer().getStates().setNumber("guestsOnThisDay", 0)
    c.getServer().getStates().setNumber("monsterCount", 0)
    c.getServer().getStates().setNumber("monstersInHouse", 0)
    c.getServer().getStates().setString("gameData", JSON.stringify(gameData));

    if (world.getBlock(-9, 25, 26).getBlockId() != "hw25:lampoff") swapLight(c);
    
    let monsterRandomData = {
        character : randomAElement(strangerCharacter.map(function(character) {return character[0]})),
        behaviour : randomAElement(strangerBehaviour.map(function(behaviour) {return behaviour[0]})),
        temperature : Math.random() < 0.25 ? 36.6 : Math.random() < 0.5 ? Number(mappet.random(35.0, 36.6).toFixed(1)) : Number(mappet.random(36.6, 38.0).toFixed(1))
    }
    c.getServer().getStates().setString("monsterRandomData", JSON.stringify(monsterRandomData))

    let players = Java.from(c.getServer().getAllPlayers()).sort(function() {return Math.random() - 0.5});

    let ownerName = customGameSetting.owner
    let playersName = players.map(function (player) {return player.getName()})
    if (playersName.indexOf(ownerName) !== -1) {
        let splicedPlayer = players.splice(playersName.indexOf(ownerName), 1)[0];     
        players.unshift(splicedPlayer);  
    }

    players.forEach(function (player) {try {
        let states = player.getStates();
        let pos = player.getPosition();
        states.reset("voted");
        states.reset("damaged");
        states.setString("playerData", JSON.stringify(cloneObject(playerDataOrig)));
        player.getInventory().clear();
        player.closeHUD("dark");
        player.closeHUD("timer");
        player.setupHUD("dark");
        player.setupHUD("timer");
        player.closeUI();
        setInteractCooldown(c, player, 70);
        player.changeHUDMorph("dark", 0, mappet.createMorph("{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
        if (player.getStates().has("roped")) {
            ropePlayer(player, false)
        }

        player.applyPotion(mappet.getPotion("weakness"), 99999, 0, false);
        player.applyPotion(mappet.getPotion("slowness"), 99999, 0, false);
        player.closeUI();
    } catch (e) {
        // c.send(e)
    }
    })

    let owner = players[0];
    let ownerData = cloneObject(playerDataOrig);
    
    ownerData.hp = customGameSetting.ownerHp;
    ownerData.role = "owner";

    owner.getStates().setString("playerData", JSON.stringify(ownerData));

    c.scheduleScript(20, function () {
        owner.setPosition(-6.5, 22, 15.5)
        owner.setGameMode(2)
        owner.changeHUDMorph("dark", 0, mappet.createMorph("{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
        let maxHP = customGameSetting.ownerHp;
        let currentHP = maxHP;
        let newHP = maxHP;
        owner.setupHUD("ownerStatus")
        owner.changeHUDMorph("ownerStatus", 0, mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:7,Duration:20},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:40.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
        owner.changeHUDMorph("ownerStatus", 1, mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (currentHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (currentHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (newHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:20},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:40.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (newHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
        owner.getInventory().clear();
    });

    let spectators = players.slice(1, players.length);

    c.scheduleScript(20, function () {
        spectators.forEach(function (player, i) {
            if (i < 3) rollPlayerData(c, player)
            player.setGameMode(3)
            player.setPosition(-26 + Math.round(mappet.random(0, 4)) * (Math.random() > 0.5? -1: 1), 25, 26 + Math.round(mappet.random(0, 4)) * (Math.random() > 0.5? -1: 1))
            player.changeHUDMorph("dark", 0, mappet.createMorph("{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
        })
    })
    c.getServer().getStates().setString("spectators", JSON.stringify(spectators.map(function(spectator) {return spectator.getName()})))
    mappet.random(101) < customGameSetting.weatherChance ? world.setRaining(true): world.setRaining(false);
    
}catch(e){
    // c.send("start: "+ e)
}
}

function main(c) {
    start(c);
}

function timer(c) {try{
    let world = c.getServer().getWorld(0);
    let data = getStateSilently(c.getServer(), "gameData");
    let players = c.getServer().getAllPlayers();
    let spectators = JSON.parse(c.getServer().getStates().getString("spectators"))
    let guests = JSON.parse(c.getServer().getStates().getString("guests"))
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");

    if (data.isContinues) {
        if (data.time > 0) {
            data.time--;
        } else {
            switch (data.stage) {
                case "day":
                    if (spectators.length > 0) {
                        data.time = customGameSetting.nigthTime;
                        data.stage = "night";
                        players.forEach(function(player){
                            player.changeHUDMorph("dark", 0, mappet.createMorph("{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:8.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:10.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:8.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
                        })
                        c.scheduleScript(10, function () {
                            // c.send("Время принимать гостей")
                            c.executeCommand("/weather "+ (Math.random() > 0.5 ? "rain" : "clear"))
                            c.getServer().getWorld(0).setBlock(mappet.createBlockState("hw25:outdoorclosed", 5), -13, 23, 25)
                            spectatorSpawn(c)
                            swapLight(c)
                            checkPlayersInHouse()
                        })
                        world.setTime(14000);
                    } else {
                        if (checkPlayersInHouse() == true) {
                            // c.send("го ту слииииип")
                            setSleepPhase()
                        } else {
                            return;
                        }
                    }
                    c.scheduleScript(10, function () {
                        c.getServer().getWorld(0).setBlock(mappet.createBlockState("hw25:outdoorclosed", 5), -13, 23, 25)
                        deleteLoot(c)
                    });
                    break;
                case "night":
                    if (c.getServer().getStates().getString("currentGuest") != "") {
                        let rejected = c.getServer().getPlayer(c.getServer().getStates().getString("currentGuest"));
                        rejectPlayer(c, rejected)
                    }
                    if (c.getServer().getStates().getNumber("guestsOnThisDay") < customGameSetting.guestsCount && spectators.length != 0) {
                        data.time = customGameSetting.nigthTime;
                        spectatorSpawn(c)
                    } else {
                        if (checkPlayersInHouse() == true) {
                            // c.send("го ту слииииип")
                            setSleepPhase()
                        } else {
                            return;
                        }
                    }
                    c.scheduleScript(10, function () {
                        c.getServer().getWorld(0).setBlock(mappet.createBlockState("hw25:outdoorclosed", 5), -13, 23, 25)
                    });
                    break;
                case "sleep":
                    data.time = customGameSetting.dayTime;
                    data.cycle++;
                    players.forEach(function(player) {
                        player.changeHUDMorph("timer", 1, mappet.createMorph("{Label:\"День " + (data.cycle + 1) + "\",Shadow:1b,AnchorX:1.0f,Name:\"label\",ForcedSettings:0b}"));
                        if (getStateSilently(player, "playerData").role == "monster" && guests.indexOf(player.getName()) !== -1 && !player.getStates().has("roped")) {
                            player.changeHUDMorph("dark", 0, mappet.createMorph("{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
                            player.changeHUDMorph("dark", 0, mappet.createMorph("{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
                        } 
                    });
                    data.stage = "day";
                    world.setTime(1500);
                    mappet.random(101) < customGameSetting.weatherChance ? world.setRaining(true): world.setRaining(false);
                    // c.send("Погода "+ (world.isRaining() ? "паршивая" : "норм"))
                    c.getServer().getStates().reset("voteDoor");
                    
                    if (data.cycle >= customGameSetting.dayCount) {
                        let totalGuests = JSON.parse(c.getServer().getStates().getString("guests")).length;
                        let monsters = c.getServer().getStates().getNumber("monstersInHouse");
                        let ropedMonsters = c.getServer().getStates().getNumber("ropedMonsters");
                        let activeMonsters = monsters - ropedMonsters;
                        let humans = totalGuests - monsters;
    
                        if (humans >= customGameSetting.guestsNeed && activeMonsters <= 0) {
                            c.getServer().getStates().setString("!gameStatus", "win");
                        } else {
                            c.getServer().getStates().setString("!gameStatus", "lose");
                        }
                        end(c);
                        return;
                    }
                    c.scheduleScript(12, function () {
                        residentsWakup(c)
                        spawnLoot(c)
                        // c.send("новый день: " + (data.cycle + 1))
                    })

                    if (!c.getServer().getStates().has("doorDamaged")) {
                        data.door -= customGameSetting.doorBreak
                    }
                    if (data.door <= 0) {
                        // c.send("дверь сломалась, игра завершилась")
                        c.getServer().getStates().setString("!gameStatus", "lose_door")
                        end(c)
                    }
                    c.getServer().getStates().reset("doorDamaged")
                    break;
            }
        }

        players.forEach(function(player) {
            player.changeHUDMorph("timer", 0, mappet.createMorph("{Label:\"" + Math.floor(data.time / 60) + " : " + data.time % 60 + "\",Shadow:1b,AnchorX:1.0f,Name:\"label\",ForcedSettings:0b}"));
        });

        c.getServer().getStates().setString("gameData", JSON.stringify(data));

        function setSleepPhase() {
            data.time = customGameSetting.doomsdayTime;
            data.stage = "sleep";
            
        
            players.forEach(function(player) {
                if (getStateSilently(player, "playerData").role == "monster" && guests.indexOf(player.getName()) !== -1 && !player.getStates().has("roped")) {
                    player.changeHUDMorph("dark", 0, mappet.createMorph("{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:8.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:10.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:8.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
                } else {
                    player.changeHUDMorph("dark", 0, mappet.createMorph("{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
                    player.changeHUDMorph("dark", 0, mappet.createMorph("{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
                }
            });
            
            c.getServer().getStates().setNumber("guestsOnThisDay", 0)
            c.getServer().getStates().setString("currentGuest", "")
            c.scheduleScript(12, function () {
                residentsGoToSleep(c)
                swapLight(c)
                resetBlocks(c)
            })
            world.setTime(15000);
        }
    }

    function checkPlayersInHouse() {
        let play = true
        let guests = JSON.parse(c.getServer().getStates().getString("guests"))
        players.forEach(function(player){
            if ((guests.indexOf(player.getName()) !== -1 || getPlayerData(player).role == "owner") && !inBoxs(player.getPosition(), houseBoxs)) {
                if (getPlayerData(player).role == "owner") {
                    c.getServer().getStates().setString("!gameStatus", "lose")
                    end(c);
                    play = false
                } else {
                    rejectPlayer(c, player)
                }
                // c.send("не успел: "+ player.getName())
                
            }
        })
        // c.send(play)
        return play
    }
}catch(e){
    // c.send("timer: "+ e)
}
}

function end(c) {
    // c.send("game ended");
    let world = c.getServer().getWorld(0);
    let players = Java.from(c.getServer().getAllPlayers()).sort(function() {return Math.random() - 0.5});
    let guests = getStateSilently(c.getServer(), "guests")
    let guestsString = [];
    let gameStatus = c.getServer().getStates().getString("!gameStatus")
    let monstersInHouse = c.getServer().getStates().getNumber("monstersInHouse") - c.getServer().getStates().getNumber("ropedMonsters")

    let itemSpawnPos = getSpawnPos(world, spawnBoxs)

    c.scheduleScript(20, function (context) {
        deleteLoot(c);
        c.executeCommand("/mp npc despawn @e");//криптонит усрана
        resetBlocks(c);
        world.setTime(1500);
        world.setBlock(mappet.createBlockState("hw25:outdoorclosed", 5), -13, 23, 25);
        world.spawnNpc("start", -10.5, 23, 24.4);
        world.spawnNpc("donators", -11.6, 23, 27.5);
        world.spawnNpc("credits", -13.5, 22, 18.5);

        if (!c.getServer().getStates().has("spawnedBlocks")) {
            c.getServer().getStates().setString("spawnedBlocks", "[]")
        }
        let spawnedBlocks = getStateSilently(c.getServer(), "spawnedBlocks")

        for (let i = 0; i < 15; i++) {
            let randomIndex = Math.floor(Math.random() * itemSpawnPos.length);
            let pos = itemSpawnPos.splice(randomIndex, 1)[0]
            let block = mappet.createBlockState("hw25:snowdrift", Math.floor(mappet.random(2, 6)))
            
            if (world.getBlock(pos.x, pos.y - 1, pos.z).getBlockId() != "hnt:grass") {
                i--
                continue;
            }
            world.setBlock(block, pos.x, pos.y, pos.z)
            spawnedBlocks.push(vectorToArray(pos))
        }
        c.getServer().getStates().setString("spawnedBlocks", JSON.stringify(spawnedBlocks))
    });

    guests.forEach(function (name) {
        let player = c.getServer().getPlayer(name)
        if (player) {
            let playerData = getPlayerData(player);
            guestsString.push(playerData.role == "monster" ? "[c"+ name +"[r" : name)
        } 
    });

    let gameData = cloneObject(gameDataOrig)
    gameData.isContinues = 0;
    c.getServer().getStates().setString("gameData", JSON.stringify(gameData));
    
    c.getServer().getStates().setString("!gameStatus", "end")
    c.getServer().getStates().setString("currentGuest", "")
    c.getServer().getStates().setString("guests", "[]")
    c.getServer().getStates().setString("spectators", "[]")
    c.getServer().getStates().setString("randomItems", "[]")
    c.getServer().getStates().setString("beds", '["", "", "", "", "", ""]')
    c.getServer().getStates().setNumber("ropedMonsters", 0)
    c.getServer().getStates().setNumber("guestsOnThisDay", 0)
    c.getServer().getStates().setNumber("monsterCount", 0)
    c.getServer().getStates().setNumber("monstersInHouse", 0)
    c.getServer().getStates().setString("gameData", JSON.stringify(gameData));
    c.getServer().getStates().reset("voteDoor");
    c.getServer().getStates().reset("!settingsOccupied");

    c.scheduleScript(20, function() {
        spawn(-8.5, 22, 26.5, 1.5, players.length)
        function spawn(centerX, centerY, centerZ, radius, count) {
            for (let i = 0; i < count; i++) {
                let spawnPlayer = players[i]
                let angle = i * (2 * Math.PI / count);
        
                let x = centerX + radius * Math.cos(angle);
                let z = centerZ + radius * Math.sin(angle);
                spawnPlayer.setGameMode(2)
                spawnPlayer.getInventory().clear();
                spawnPlayer.setPosition(x, centerY, z)
                lookAtTarget(spawnPlayer, mappet.vector(-8.5, 22, 26.5))
            }
        }
    })

    players.forEach(function (player) {try {
        let states = player.getStates();
        states.reset("voted");
        states.reset("damaged");
        states.setString("playerData", JSON.stringify(cloneObject(playerDataOrig)));
        player.getInventory().clear()
        // player.closeHUD("dark");
        player.closeHUD("timer");
        player.closeHUD("CharacterInfo")
        // player.setupHUD("dark");
        player.changeHUDMorph("dark", 0, mappet.createMorph("{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
        if (player.getStates().has("roped")) {
            ropePlayer(player, false)
        }
        
        c.scheduleScript(40, function() {
            let gameEndString = "Игра Завершена";
            let textColor = 13684944;

            if (gameStatus == "win") {
                gameEndString = "ЛЮДИ ПЕРЕЖИЛИ ЭТУ НЕДЕЛЮ!";
                textColor = 1810944;
            } else if (gameStatus == "lose") {
                gameEndString = monstersInHouse ? "НЕЧИСТЬ ПРОБРАЛАСЬ В ДОМ!" : "НЕДОСТАТОЧНО ЛЮДЕЙ В ДОМЕ!";
                textColor = 16724224;
            } else if (gameStatus == "lose_door") {
                gameEndString = "НУЖНО БЫЛО ЧИНИТЬ ДВЕРЬ!";
                textColor = 16724224;
            } else if (gameStatus == "lose_doorMsr") {
                gameEndString = "НЕЧИСТЬ ВЫЛОМАЛА ДВЕРЬ!";
                textColor = 16724224;
            } else if (gameStatus == "lose_ownerKill") {
                gameEndString = "ГОСТИ РАСТЕРЗАЛИ ХОЗЯИНА!";
                textColor = 16724224;
            }
            
            player.playSound("mp.sounds:hnt.ui.ui_dayresultsting", -9, 22, 26, 1, 0.7);
            setInteractCooldown(c, player, 100);
            player.setupHUD("endGame");
            player.changeHUDMorph("dark", 0, mappet.createMorph("{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:\"b.a:trs/ui/white_square.png\",Name:\"blockbuster.image\",ForcedSettings:0b}"));
            player.changeHUDMorph("endGame", 0, mappet.createMorph('{Color:'+ textColor +',Label:"'+ gameEndString +'",Shadow:1b,Name:"label",ForcedSettings:0b}'));
            player.changeHUDMorph("endGame", 2, mappet.createMorph('{Background:1694498816,Max:106,Label:"'+ guestsString.join(", ") +'",AnchorY:0.0f,AnchorX:0.0f,Name:"label",ForcedSettings:0b}'));
        })
    } catch (e) {
        // c.send(e)
    }
    })
}

function spectatorSpawn(c) {try{
    c.getServer().getStates().add("guestsOnThisDay", 1)
    let spectators = JSON.parse(c.getServer().getStates().getString("spectators"))
    let guest = c.getServer().getPlayer(spectators[0])   
    // c.send("Гость: "+ guest.getName())
    guest.setPosition(-31.5, 21, 41)
    guest.setRotations(Math.round(mappet.random(0, 10)) * (Math.random() > 0.5? -1: 1), -140 + Math.round(mappet.random(0, 20)) * (Math.random() > 0.5? -1: 1), -140 + Math.round(mappet.random(0, 20)) * (Math.random() > 0.5? -1: 1))
    guest.setGameMode(2)

    spectators.shift();
    if (spectators[2] != undefined) rollPlayerData(c, c.getServer().getPlayer(spectators[2]))

    c.getServer().getStates().setString("spectators", JSON.stringify(spectators))
    c.getServer().getStates().setString("currentGuest", guest.getName())
    // if (c.getServer().getPlayer("Tinpis")) {c.getServer().getPlayer("Tinpis").send("spawn"+ spectators)}
    }catch(e){
        // c.send("spectatorSpawn: "+ e)
    }
}

function residentsWakup(c) {try{
    let players = Java.from(c.getServer().getAllPlayers());
    let spectators = JSON.parse(c.getServer().getStates().getString("spectators"))
    let beds = getStateSilently(c.getServer(), "beds")
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting")
    let entities = Java.from(c.getServer().getWorld(0).getEntities(-7, 22, 25, 25))


    entities.forEach(function (entity) {
        if(entity.isNpc() && entity.getStates().has("name") && !entity.getStates().has("dead")) {
            entity.remove()
        } else if (entity.isNpc() && entity.getStates().has("name") && entity.getStates().has("dead")) {
            let deadMorph = mappet.toNBT(entity.getMorph())
            let list = deadMorph.getList("Skin")
            list.addCompound(mappet.createCompound('{Path:"b.a:hw/wound_overlay.png"}'))

            deadMorph.remove("Skin")  
            deadMorph.setList("Skin", list)

            entity.setMorph(mappet.createMorph(deadMorph))
        }
    })
    players.forEach(function (player) {
        let pos = player.getPosition()
        let playerData = getPlayerData(player);
        let bedIndex = beds.indexOf(player.getName())
        player.getStates().setString("voted", 1)
        player.getStates().has("starvation") && bedIndex !== -1 ? player.getStates().add("starvation", -1) : null;

        if (playerData.role == "monster" && player.getStates().has("roped") && bedIndex !== -1) {
            c.getServer().getStates().add("ropedMonsters", -1);
            // c.send("сброс завязанных монстров")
        }

        if (playerData.role == "monster" && bedIndex !== -1 && player.getStates().getNumber("starvation") < 0) {
            if (player.getStates().has("roped")) {
                let layMorph = mappet.toNBT(player.getMorph());
                !layMorph.has("Pose") ? layMorph.addCompound("Pose") : null;
                layMorph.getCompound("Pose").combine(mappet.createCompound('{Pose:{torso:{F:0b},model:{RX:1.570796f,Y:-10f}}}'));

                let bedProp = bedsProp[bedIndex];
                let npcSpawnPos = bedProp.pos

                let npc = c.getServer().getWorld(0).spawnNpc("sleep", "default", npcSpawnPos.x, npcSpawnPos.y, npcSpawnPos.z, bedProp.rot, 0, bedProp.rot);
                npc.getStates().setString("name", player.getName())
                npc.getStates().setString("dead", "true")
                npc.setMorph(mappet.createMorph(layMorph))
                ropePlayer(player, false)
            } else {
                player.setupHUD("stun")
                let npc = player.getWorld().spawnNpc("corpse", pos.x, pos.y, pos.z);
                let deathMorph = mappet.createCompound(JSON.parse(player.getStates().getString("skin")).morph);
            
                deathMorph.setCompound("Hitbox", mappet.createCompound('{Eye:0.9f,Sneak:0.5f,Enabled:1b,Height:0.5f}'));
                deathMorph.setCompound("Actions", mappet.createCompound('{running:"stun1_idle",falling:"stun1_idle",sprinting:"stun1_idle",crouching:"stun1_idle",riding_idle:"lying_idle",dying:"stun1_idle",idle:{Speed:0f,Name:"stun1_idle"},flying:"stun1_idle",land:"lying_idle",crouching_idle:"stun1_idle",hurt:"stun1_idle"}'));
            
                npc.setMorph(mappet.createMorph(deathMorph));
                npc.setRotations(0, player.getYaw(), player.getYawHead());
                npc.playAnimation("stun1");
                npc.getStates().setString("name", player.getName());
                npc.getStates().setString("dead", "true")
                npc.getStates().setString("basedPlayerMorph", JSON.stringify(JSON.parse(player.getStates().getString("skin")).morph))
            }
            player.getStates().reset("starvation");
            rejectPlayer(c, player) 
            spectators = JSON.parse(c.getServer().getStates().getString("spectators"))
            beds = getStateSilently(c.getServer(), "beds")
        }
        if (player.getStates().has("roped")) ropePlayer(player, false)
        if (playerData.role == "owner") {
            if (player.getStates().has("damaged")) {
                player.getStates().reset("damaged");
                let maxHP = customGameSetting.ownerHp;
                let currentHP = playerData.hp + customGameSetting.damageOwner;
                let newHP = playerData.hp;
                player.setupHUD("ownerStatus")
                player.changeHUDMorph("ownerStatus", 0, mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:7,Duration:20},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:40.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
                player.changeHUDMorph("ownerStatus", 1, mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (currentHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (currentHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (newHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:20},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:40.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (newHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
            }
            player.setPosition(-6.5, 22, 15.5);
            player.setGameMode(2);
        } 
        if (playerData.role != "owner" && bedIndex !== -1) {
            bedProp = bedsProp[bedIndex];
            spawnPos = bedProp.playerPos
            player.setPosition(spawnPos.x, spawnPos.y, spawnPos.z);
            player.setGameMode(2);
        }
        if (spectators.indexOf(player.getName()) !== -1) {
            player.setPosition(-26 + Math.round(mappet.random(0, 4)) * (Math.random() > 0.5? -1: 1), 25, 26 + Math.round(mappet.random(0, 4)) * (Math.random() > 0.5? -1: 1));
            player.setGameMode(3);
        }
        player.changeHUDMorph("dark", 0, mappet.createMorph('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:15},Texture:"b.a:trs/ui/white_square.png",Name:"blockbuster.image",ForcedSettings:0b},Duration:5.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:"b.a:trs/ui/white_square.png",Name:"blockbuster.image",ForcedSettings:0b},Duration:8.0f,EndPoint:0b}],Name:"sequencer",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}'));
    });
    }catch(e){
        // c.send("residentsWakup: "+ e)
    }
}

function residentsGoToSleep(c) {try{
    let players = Java.from(c.getServer().getAllPlayers());
    let entities = Java.from(c.getServer().getWorld(0).getEntities(-7, 22, 25, 25))
    let beds = getStateSilently(c.getServer(), "beds")
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");
    let i = 0;
    entities.forEach(function (entity) {
        if(entity.isNpc() && entity.getStates().has("name") && entity.getStates().has("dead")) {
            entity.remove()
        }
    })
    players.forEach(function (player) {
        let playerData = getPlayerData(player);

        let inventory = player.getInventory();
        for (let j = 0; j < inventory.size(); j++) {
            let stack = inventory.getStack(j);
            if (stack.getItem().getId() == "hw25:snowball") {
                stack.setCount(0);
            }
        }
        
        if (playerData.role != "monster" || (playerData.role == "monster" && player.getStates().has("roped"))|| (playerData.role == "monster" && player.getGameMode() == 3)) {
            player.setPosition(-44.5 - (i * 15), 22, 17.5);
            player.setGameMode(2);
            i++
        }

        player.getStates().reset("voted");
        player.closeUI();

        let baseMorph = mappet.createCompound(JSON.parse(player.getStates().getString("skin")).morph)
        let layMorph = mappet.toNBT(player.getMorph());
        if (player.getStates().has("roped")) {
            !layMorph.has("Pose") ? layMorph.addCompound("Pose") : null;
            layMorph.getCompound("Pose").combine(mappet.createCompound('{Pose:{torso:{F:0b},model:{RX:1.570796f,Y:-10f}}}'));
        } else {
            !baseMorph.has("Pose") ? baseMorph.addCompound("Pose") : null;
            baseMorph.setCompound("Pose", mappet.createCompound('{Pose:{right_knee:{},right_arm:{F:0b},left_leg:{},torso:{F:0b},left_hand:{F:0b},right_elbow:{},left_knee:{},left_elbow:{},head:{F:0b},left_arm:{F:0b},right_leg:{},right_hand:{},model:{RX:1.570796f,Y:-10f}}}'))
            layMorph = baseMorph
        }
        
        let npc = false;
        if (playerData.role == "owner") {
            npc = c.getServer().getWorld(0).spawnNpc("sleep", "default", -5.5, 22.5, 15.3, 0, 0, 0);

            let residentsCount = JSON.parse(c.getServer().getStates().getString("guests")).length
            let guestsNeed = customGameSetting.guestsNeed - residentsCount;
            
            var w = guestsNeed > 4 ? "гостей" : guestsNeed > 0 ? "гостя" : "";
            let text = guestsNeed > 0 ? "[7Чтобы выжить, нужно впустить ещё [r" + guestsNeed + " " + w : "[7Чтобы выжить, убедись, что среди гостей [rнет нечисти[7...";
            player.setupHUD("residentsCount");
            player.changeHUDMorph("residentsCount", 0, mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Duration:0},Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{S:[1.0f,0.0f,1.0f],Limb:\"cube\",Morph:{Label:\""+text+"\",Name:\"label\"}}],Name:\"blockbuster.empty\"},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b},Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{Limb:\"cube\",Morph:{Label:\""+text+"\",Name:\"label\"}}],Name:\"blockbuster.empty\"},Duration:100.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b},Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{S:[1.0f,0.0f,1.0f],Limb:\"cube\",Morph:{Label:\""+text+"\",Name:\"label\"}}],Name:\"blockbuster.empty\"},Duration:10.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
        }
        
        let bedIndex = beds.indexOf(player.getName())
        
        if (playerData.role == "monster" && bedIndex !== -1) {
            var d = player.getStates().getNumber("starvation");
            var w = d > 4 ? "дней" : d > 1 ? "дня" : d == 1 ? "день" : "";
            let text = d > 0 ? "[7Ты можешь [rголодать [7ещё [r" + d + " " + w : "[4Убей или [lумри [r[4от голода";
            textInfo(c, player, text);
            player.applyPotion(mappet.getPotion("minecraft:night_vision"), customGameSetting.doomsdayTime * 20 + 30, 1, false);
            player.applyPotion(mappet.getPotion("blindness"), customGameSetting.doomsdayTime * 20 + 30, 1, false);
            if (!player.getStates().has("roped")) {
                let bedProp = bedsProp[bedIndex];
                let playerPos = bedProp.playerPos
                player.setPosition(playerPos.x, playerPos.y, playerPos.z)
            }
        }

        if ((playerData.role != "monster" && bedIndex !== -1) || (playerData.role == "monster" && player.getStates().has("roped") && bedIndex !== -1)) {
            let bedProp = bedsProp[bedIndex];
            let npcSpawnPos = bedProp.pos
            npc = c.getServer().getWorld(0).spawnNpc("sleep", "default", npcSpawnPos.x, npcSpawnPos.y, npcSpawnPos.z, bedProp.rot, 0, bedProp.rot);
        }

        if (playerData.role == "monster" && player.getStates().has("roped") && bedIndex !== -1) {
            c.getServer().getStates().add("ropedMonsters", 1);
        }

        if (npc) {
            npc.getStates().setString("name", player.getName())
            npc.setMorph(mappet.createMorph(layMorph))
        }
    });
    // c.send("Нечисть пиздит")
    }catch(e){
        // c.send("residentsGoToSleep: "+ e)
    }
}

function guestEnterHouse(c) {try {
    if (!c.getSubject().isPlayer()) return;

    let player = c.getSubject()
    if (player.getName() == c.getServer().getStates().getString("currentGuest")) {
        let beds = JSON.parse(c.getServer().getStates().getString("beds"))
        let guests = JSON.parse(c.getServer().getStates().getString("guests"))
        let freeBed = getRandomFreeSlot(beds);
        if (freeBed !== false) {
            // c.send("Принял")
            if (getPlayerData(player).role == "monster") c.getServer().getStates().add("monstersInHouse", 1);
            beds[freeBed] = player.getName();
            guests.push(player.getName())
            c.getServer().getStates().setString("currentGuest", "")
            c.getServer().getStates().setString("guests", JSON.stringify(guests))
            c.getServer().getStates().setString("beds", JSON.stringify(beds))
            
            c.getServer().getWorld(0).setBlock(mappet.createBlockState("hw25:outdoorclosed", 5), -13, 23, 25)
            playSoundToPlayers(c, "mp.sounds:hw.door_close", mappet.vector(-13, 23, 25), "block", 0.5, mappet.random(1, 1.3))
            
        } else {
            // c.send("нет свободных мест")
            rejectPlayer(player)
        }

        let data = getStateSilently(c.getServer(), "gameData");
        data.time = 2;
        c.getServer().getStates().setString("gameData", JSON.stringify(data));
    }
} catch (e) {
    // c.send("guestEnterHouse: "+ e)
}
}


function spawnLoot(c) {
    // let morph = mappet.createMorph("{Skin:\"b.a:empty/skins/texture.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{S:[0.1f,100.0f,0.1f],G:1.0f}}},BodyParts:[{Limb:\"cube\",Morph:{Meta:3b,Block:\"blockbuster:green\",Name:\"block\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b}")
    let world = c.getServer().getWorld(0);
    let itemSpawnPos = getSpawnPos(world, spawnBoxs)

    if (!c.getServer().getStates().has("spawnedBlocks")) {
        c.getServer().getStates().setString("spawnedBlocks", "[]")
    }
    let spawnedBlocks = getStateSilently(c.getServer(), "spawnedBlocks")

    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * itemSpawnPos.length);
        let pos = itemSpawnPos.splice(randomIndex, 1)[0]
        let block = mappet.createBlockState("hnt:cardboard", Math.floor(mappet.random(2, 6)))
        world.setBlock(block, pos.x, pos.y, pos.z)
        // world.displayMorph(morph, 300, pos.x + 0.5, pos.y, pos.z + 0.5);
        spawnedBlocks.push(vectorToArray(pos))
    }
    
    for (let i = 0; i < 10; i++) {
        let randomIndex = Math.floor(Math.random() * itemSpawnPos.length);
        let pos = itemSpawnPos.splice(randomIndex, 1)[0]
        let block = mappet.createBlockState("hw25:snowdrift", Math.floor(mappet.random(2, 6)))
        
        if (world.getBlock(pos.x, pos.y - 1, pos.z).getBlockId() != "hnt:grass") {
            i--
            continue;
        }
        world.setBlock(block, pos.x, pos.y, pos.z)
        // world.displayMorph(morph, 100, pos.x + 0.5, pos.y, pos.z + 0.5);
        spawnedBlocks.push(vectorToArray(pos))
    }
    
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * itemSpawnPos.length);
        let pos = itemSpawnPos.splice(randomIndex, 1)[0]
        
        spawnItem("hw25:vetka", mappet.vector(pos.x + 0.5, pos.y, pos.z + 0.5), world)
        // world.displayMorph(morph, 300, pos.x + 0.5, pos.y, pos.z + 0.5);
        spawnedBlocks.push(vectorToArray(pos))
    }
    c.getServer().getStates().setString("spawnedBlocks", JSON.stringify(spawnedBlocks))
}

function deleteLoot(c) {
    // let morph = mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b},Skin:\"b.a:empty/skins/texture.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{S:[0.0f,0.0f,0.0f],G:1.0f}}},BodyParts:[{Limb:\"cube\",Morph:{Meta:2b,Block:\"blockbuster:green\",Name:\"block\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b},Duration:10.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b},Skin:\"b.a:empty/skins/texture.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{G:1.0f}}},BodyParts:[{Limb:\"cube\",Morph:{Meta:2b,Block:\"blockbuster:green\",Name:\"block\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b},Duration:10.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b},Skin:\"b.a:empty/skins/texture.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{S:[0.0f,0.0f,0.0f],G:1.0f}}},BodyParts:[{Limb:\"cube\",Morph:{Meta:2b,Block:\"blockbuster:green\",Name:\"block\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b},Duration:10.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}")
    let world = c.getServer().getWorld(0);
    let itemSpawnPos = []
    
    if (c.getServer().getStates().has("spawnedBlocks")) {
        getStateSilently(c.getServer(), "spawnedBlocks").forEach(function (pos) {
            itemSpawnPos.push(arrayToVector(pos));
        })
    }
    itemSpawnPos.forEach(function (pos) {
        let block = mappet.createBlockState("minecraft:air")
        world.setBlock(block, pos.x, pos.y, pos.z)
        // world.displayMorph(morph, 90, pos.x + 0.5, pos.y, pos.z + 0.5);
    })
    c.getServer().getStates().reset("spawnedBlocks")

    world.getEntities(-12, 21, 25, 50).forEach(function (ent) {
        if (ent.isNpc() && ent.getNpcId() == "item" && !inBoxs(ent.getPosition(), houseBoxs)) {
            ent.remove()
        }
    })
}