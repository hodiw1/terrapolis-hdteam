function tick(c) {
    let player = c.getPlayer();
    let playerMorph = mappet.toNBT(player.getMorph())
    let pos = player.getPosition();
    let look = player.getLook()
    let flooredPos = floor(pos);
    let entityData = player.getEntityData();

    if (!player.getStates().has("gm")) player.getStates().setNumber("gm", player.getGameMode())

    if (player.getGameMode() == 3 && player.getStates().getNumber("gm") != 3) {
        player.getStates().setNumber("gm", player.getGameMode());
        let playerMorph = mappet.toNBT(player.getMorph());
        playerMorph.setCompound("Hitbox", mappet.createCompound("{Eye:1f,Sneak:1.8f,Enabled:1b,Height:1.8f,Width:0.0f}"))
        player.setMorph(mappet.createMorph(playerMorph))
    } else if (player.getGameMode() != 3 && player.getStates().getNumber("gm") == 3) {
        player.getStates().setNumber("gm", player.getGameMode());
        let playerMorph = mappet.toNBT(player.getMorph());
        playerMorph.setCompound("Hitbox", mappet.createCompound("{Eye:0.9f,Sneak:1.65f,Enabled:1b,Height:1.8f}"))
        player.setMorph(mappet.createMorph(playerMorph))
    }
    
    if (player.getMainItem().getItem().getId() == "hw25:shotgun" && !entityData.getBoolean("stunned")) {
        player.swingArm(1)
    }
    
    player.executeScript("rayCasting.js");

    if (player.getGameMode() == 3) return;

    if (player.getMorph() != null && !entityData.getBoolean("stunned") && !player.getStates().has("sits") && mappet.toNBT(player.getMorph()).getString("Name").startsWith("chameleon.pl_") && playerMorph.getList("BodyParts").getCompound(playerMorph.getList("BodyParts").size() - 1).getCompound("Morph").getString("Name") != "sequencer") {
        let lastPose
        try {lastPose = JSON.parse(player.getStates().getString("lastPose"))}
        catch(e) {lastPose = [pos.x, pos.z], player.getStates().setString("lastPose", JSON.stringify([pos.x, pos.z]))}
        let moveVector = mappet.vector(pos.x - lastPose[0], 0, pos.z - lastPose[1]).normalize()
        let lookVector = mappet.vector(look.x, 0, look.z)
        let morph = mappet.toNBT(player.getMorph())

        if (moveVector.length() > 0.01) {
            let dotProduct = moveVector.dotProduct(lookVector)
            player.getStates().setString("lastPose", JSON.stringify([pos.x, pos.z]))
            if (dotProduct < -0.2 && player.getMorph() != null && mappet.toNBT(player.getMorph()).getString("Name").startsWith("chameleon.pl_")) {
                if (!morph.has("Actions")) {
                    morph.addCompound("Actions")
                }
                if (!morph.get("Actions").has("running")) {
                    morph.get("Actions").addCompound("running")
                    morph.get("Actions").setCompound("running", mappet.createCompound("{Speed:-1f,Name:\"running\"}"))
                    morph.get("Actions").addCompound("crouching")
                    morph.get("Actions").setCompound("crouching", mappet.createCompound("{Speed:-1f,Name:\"crouching\"}"))
                    player.setMorph(mappet.createMorph(morph))
                }
            } else if (player.getMorph() != null && morph.has("Actions") && morph.get("Actions").get("running").getFloat("Speed") < 0) {
                morph.remove("Actions")
                player.setMorph(mappet.createMorph(morph))
            }

        }
    }

    let sits = player.getStates().getString("sits")
    
    if (player.isSneaking() && player.getStates().has("sits")) {
        standUp(player)
    } else if (player.getStates().has("sits") && pos.distance(mappet.vector(parseInt(sits.split(",")[0]) + 0.5, sits.split(",")[1], parseInt(sits.split(",")[2])  + 0.5)) > 0.31) {
        standUp(player)
    }

}

function EntityInteract(c) {try{
    if (c.getValue("hand") == "off" || c.getObject().getStates().getString("dead") == "true") return
    let s = c.getSubject();
    let playerData = getPlayerData(s);
    let mainItem = s.getMainItem();
    let pos = s.getPosition();
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");
    let o = c.getObject();
    let oPos = o.getPosition();
    let oData = getPlayerData(o);
    let oRole = o.getStates().has("name") ? getPlayerData(c.getServer().getPlayer(o.getStates().getString("name"))).role : ""
    
    if (s.getGameMode() == 3 || s.getStates().has("roped")) return;
    if (getPlayerData(o).role == "owner" && mainItem.getItem().getId() != "minecraft:air") {
        o.giveItem(mainItem)
        mainItem.setCount(0)
    }
    
    if (playerData.role == "monster" && o.isNpc() && o.getStates().has("name") && oRole != "monster") {
        if (s.getStates().has("voted")) return;
        o.getStates().add("voteKill", 1)
        s.getStates().setString("voted", 1)
        textInfo(c, s, "[7Ты выбрал [r"+ o.getStates().getString("name") + "[7 своей [rжертвой")
        s.playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z, 1.0, 0.8);
        // c.send(o.getStates().getString("name"))
        if (o.getStates().getNumber("voteKill") >= (c.getServer().getStates().getNumber("monstersInHouse") - c.getServer().getStates().getNumber("ropedMonsters"))) {
            // c.send("Проверка на убиство прошла "+ o.getStates().getNumber("voteKill" +"\n М в доме: "+ c.getServer().getStates().getNumber("monstersInHouse") +" М связано: "+ c.getServer().getStates().getNumber("ropedMonsters")))
            let starvation = 3
            votedPlayer = c.getServer().getPlayer(o.getStates().getString("name"))
            votedData = getPlayerData(votedPlayer)
            if (votedData.role == "owner") {
                if (customGameSetting.damageOwner >= votedData.hp) {
                    // c.send("Хозяин умер КОНЕЦ ИГРЫ")
                    c.getServer().getStates().setString("!gameStatus", "lose_ownerKill")
                    c.getServer().executeScript("game.js", "end")
                } else {
                    votedData.hp -= customGameSetting.damageOwner
                    votedPlayer.getStates().setString("playerData", JSON.stringify(votedData))
                    votedPlayer.getStates().setString("damaged", "")
                    starvation = 1
                    // c.send("Урон по хозяину"+ JSON.stringify(votedData))
                }
            } else {
                // c.send("Убйство:"+ o.getStates().getString("name")) 
                o.getStates().setString("dead", "true")
                rejectPlayer(c, votedPlayer)
                starvation = 3
            }
            c.getServer().getAllPlayers().forEach(function (player) {
                if (getPlayerData(player).role == "monster" && player.getStates().has("voted") && !player.getStates().has("roped")) {
                    player.getStates().add("starvation", starvation);
                    player.getStates().setNumber("starvation", Math.min(player.getStates().getNumber("starvation"), customGameSetting.starvation))
                }
            })
        }
    }
    if (playerData.role != "owner") return;
    if (o.isNpc()) return;
    switch (mainItem.getItem().getId()) {
        case "hnt:mineral3":
            rejectPlayer(c, o)
            mainItem.setCount(mainItem.getCount() - 1);
            c.getWorld().displayMorph(mappet.createMorph("{Scheme:\"trs_ghostMorph\",Name:\"snowstorm\",ForcedSettings:0b}"), 6, oPos.x, oPos.y + 1, oPos.z)
            playSoundToPlayers(c, "mp.sounds:hnt.items.mineral1_pickup", s.getPosition(), "master", 1, 1.2);
            playSoundToPlayers(c, "mp.sounds:trs.entity.ghost_dissapear", s.getPosition(), "master", 1.0, 1.3);
            break;
        case "hw25:thermometer":
            mainItem.setCount(mainItem.getCount() - 1);
            playSoundToPlayers(c, "mp.sounds:hnt.items.airhornitem_pickup", o.getPosition(), "master", 1, 1.3);
            textInfo(c, s, "Температура " + oData.name + " : \u00a7e"+ oData.temperature)
            break;
        case "hw25:magnifier":
            // s.send("Обыск человека")
            playSoundToPlayers(c, "mp.sounds:hnt.items.cameraupgraded_pickup", o.getPosition(), "master", 1, 1.2);
            playSoundToPlayers(c, "mp.sounds:trs.entity.player_crawl3", o.getPosition(), "master", 1, 1.3);
            s.getEntityData().setString("playerName", o.getName())
            s.executeScript("ui_corpse.js")
            mainItem.setCount(mainItem.getCount() - 1);
            break;
        case "hw25:rope":
            if (o.getStates().has("roped") || o.getEntityData().getBoolean("stunned")) return;
            if (o.getStates().has("sits")) standUp(o)
            
            c.scheduleScript(o.getStates().has("sits") ? 15 : 0, function() {
                textInfo(c, o, "Хозяин связал тебя")
                playSoundToPlayers(c, "minecraft:item.armor.equip_leather", o.getPosition(), "master", 1, 1.2)
                ropePlayer(o, true)
                mainItem.setCount(mainItem.getCount() - 1);
            })
            break;
    }
}catch(e){
    // c.send(e)
}
}

function interact(c) {try{
    let gameData = getStateSilently(c.getServer(), "gameData");
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");
    let player = c.getPlayer();
    let playerData = getPlayerData(player);
    let mainItem = player.getMainItem();
    let pos = mappet.vector(c.getValue("x"), c.getValue("y"), c.getValue("z"));
    let rayTrace = player.rayTrace(2);
    let blockId = c.getValue("block");
    let meta = c.getValue("meta");
    let entityData = player.getEntityData();
    let baseMorph = mappet.createCompound(JSON.parse(player.getStates().getString("skin")).morph);
    let block = player.getWorld().getBlock(pos);
    let rot = player.getRotations();

    player.getEntityData().setNBT("interactionPos", pos.toArrayString());

    if (player.getGameMode() == 3 || entityData.has("interactCooldown") || player.getStates().has("roped")) return;
    if (mappet.vector(pos.x + 0.5, pos.y, pos.z + 0.5).distance(player.getPosition()) > 1.9) return;

    switch (mainItem.getItem().getId()) {
        case "trials:stepladderitem":
            // c.send("interact item");
            break;
    }
    switch (blockId) {
        case "hnt:bed":
            if (playerData.role == "owner" && gameData.stage == "day") {
                gameData.time = 0;
                playSoundToPlayers(c, "mp.sounds:hnt.entity.player_standup", pos, "block", 0.5, mappet.random(0.9, 1.1));
                c.getServer().getStates().setString("gameData", JSON.stringify(gameData));
                setInteractCooldown(c, player, 20);
            }
            break;
        case "hw25:curtainssingleopen":
        case "hw25:curtainssingle":
        case "hw25:curtainsdouble_l":
        case "hw25:curtainsdouble_lopen":
        case "hw25:curtainsdouble_r":
        case "hw25:curtainsdouble_ropen":
            if (blockId.indexOf("hw25:curtains") === 0 && gameData.stage != "sleep") {
                let isOpen = blockId.indexOf("open") !== -1;
                let sound = isOpen ? "mp.sounds:hw.curtains_close" : "mp.sounds:hw.curtains_open";
                let newBlockId = isOpen ? blockId.replace("open", "") : blockId + "open";
                c.getWorld().setBlock(mappet.createBlockState(newBlockId, meta), pos.x, pos.y, pos.z);
                playSoundToPlayers(c, sound, pos, "block", 0.5, mappet.random(1, 1.3));
                player.swingArm();
                setInteractCooldown(c, player, 15);
            }
            break;
        case "hw25:outdoorclosed":
            if (playerData.role == "owner" && player.getMainItem().getItem().getId() == "hnt:hammer") {
                playSoundToPlayers(c, "mp.sounds:hw.door_knock"+ Math.floor(mappet.random(1, 5)), pos, "block", 1, mappet.random(1.2, 1.5))
                player.swingArm();
                repairDoor(c, player);
                setInteractCooldown(c, player, 10);
            }
            else if (playerData.role == "owner" && gameData.stage != "day") {
                c.getWorld().setBlock(mappet.createBlockState("hw25:outdoorhatch", meta), pos.x, pos.y, pos.z)
                playSoundToPlayers(c, "mp.sounds:trs.items.hatchitem_pickup", pos, "block", 0.5, 1.2)
                player.swingArm();
                setInteractCooldown(c, player, 10);
            } else if (c.getServer().getStates().getString("!gameStatus") == "end" || (playerData.role == "owner" && gameData.stage == "day")) {
                c.getWorld().setBlock(mappet.createBlockState("hw25:outdooropen", meta), pos.x, pos.y, pos.z)
                playSoundToPlayers(c, "mp.sounds:hw.door_open", pos, "block", 0.5, mappet.random(1, 1.3))
                player.swingArm();
                setInteractCooldown(c, player, 20);
            } else if (playerData.role == "monster" && gameData.stage == "sleep") {
                if (player.getStates().has("voted")) break;
                player.getStates().setString("voted", 1);
                textInfo(c, player, "[7Ты выбрал [rсломать дверь")
                player.playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z, 1.0, 0.8);
                player.playSound("mp.sounds:hw.door_knock4", pos.x, pos.y, pos.z, 0.25, 0.5);
                c.getServer().getStates().add("voteDoor", 1);

                if (c.getServer().getStates().getNumber("voteDoor") >= (c.getServer().getStates().getNumber("monstersInHouse") - c.getServer().getStates().getNumber("ropedMonsters"))) {
                    // c.send("Урон по двери");
                    gameData.door -= customGameSetting.doorHurt;
                    c.getServer().getStates().setString("gameData", JSON.stringify(gameData));
                    c.getServer().getStates().setString("doorDamaged", 1);

                    if (gameData.door <= 0) {
                        // c.send("дверь сломали, монстры вас отьебали")
                        c.getServer().getStates().setString("!gameStatus", "lose_doorMsr")
                        c.getServer().executeScript("game.js", "end")
                    }
                }
            } else if (playerData.role != "owner") {
                playSoundToPlayers(c, "mp.sounds:hw.door_knock"+ Math.floor(mappet.random(1, 5)), pos, "block", 1, mappet.random(0.9, 1.3))
                player.swingArm();
            } 
            break;
        case "hw25:outdooropen":
            if (c.getServer().getStates().getString("!gameStatus") == "end" || (playerData.role == "owner" && gameData.stage == "day")) {
                c.getWorld().setBlock(mappet.createBlockState("hw25:outdoorclosed", meta), pos.x, pos.y, pos.z)
                playSoundToPlayers(c, "mp.sounds:hw.door_close", pos, "block", 0.5, mappet.random(1, 1.3))
                setInteractCooldown(c, player, 20);
                player.swingArm();
            }
            break;
        case "hw25:outdoorhatch":
            if (playerData.role != "owner" || c.getServer().getStates().getString("currentGuest") == "") return;
            player.executeScript("ui_acceptOrReject.js")
            break;
        case "hw25:intdoorclosed":
                c.getWorld().setBlock(mappet.createBlockState("hw25:intdooropen", meta), pos.x, pos.y, pos.z)
                playSoundToPlayers(c, "mp.sounds:hw.door_open", pos, "block", 0.5, mappet.random(1.0, 1.1))
                player.swingArm();
                setInteractCooldown(c, player, 20);
            break;
        case "hw25:intdooropen":
            var entities = Java.from(c.getServer().getWorld(0).getEntities(pos.x + 0.5, pos.y, pos.z + 0.5, 0.45))
            entities.forEach(function (entity) {
                if (entity.isPlayer()) {
                    var direction = metaToVector(meta)
                    entity.setMotion(direction.x / 3, 0.001, direction.z / 3)
                }
            })
            c.getWorld().setBlock(mappet.createBlockState("hw25:intdoorclosed", meta), pos.x, pos.y, pos.z)
            playSoundToPlayers(c, "mp.sounds:hw.door_close", pos, "block", 0.5, mappet.random(1.0, 1.1))
            player.swingArm();
            setInteractCooldown(c, player, 20);
            break;
        case "hnt:cardboard":
            c.getWorld().setBlock(mappet.createBlockState("hnt:cardboard_open", meta), pos.x, pos.y, pos.z)
            playSoundToPlayers(c, "mp.sounds:hnt.interact.sellbox_open", pos, "block", 0.5, mappet.random(1.3, 1.5))
            player.swingArm();
            var random = mappet.random(101);
            if (random < customGameSetting.scrapChance) {
                var item = "hnt:scrap"+Math.floor(mappet.random(1, 4))
                textInfo(c, player, "Вы что-то нашли!");
                player.giveItem(mappet.createItem(item, 1));
            } else if (random > 100 - customGameSetting.boxItemChance) {
                var itemsSpawnChancesСopy = JSON.parse(JSON.stringify(itemsSpawnChances));
                delete itemsSpawnChancesСopy[""];
                var item = getRandomItemByChance(itemsSpawnChancesСopy);
                textInfo(c, player, "Вы что-то нашли!");
                player.giveItem(item != "hnt:mineral3" ? mappet.createItem(item) : mappet.createItem(mappet.createCompound("{id:\"hnt:mineral3\",tag:{display:{Lore:[],Name:\"\u00A7cКамень изгнания\"}},Count:1b}")));
            } else {
                textInfo(c, player, "[7Пусто...");
            }
            break;
        case "hw25:snowdrift":
            c.getWorld().removeBlock(pos.x, pos.y, pos.z)
            playSoundToPlayers(c, "minecraft:entity.snowman.hurt", pos, "block", 0.5, mappet.random(1.0, 1.3))
            player.swingArm();
            player.giveItem(mappet.createItem("hw25:snowball", 1));
            c.getWorld().spawnParticles(mappet.getParticleType("blockcrack"), false, pos.x + 0.5, pos.y, pos.z + 0.5, 10, 0.25, 0.1, 0.25, 1, 80);
            c.scheduleScript(100, function () {
                if (c.getServer().getStates().getString("!gameStatus") == "end") {
                    c.getWorld().setBlock(mappet.createBlockState("hw25:snowdrift", 5), pos.x, pos.y, pos.z)
                    c.getWorld().spawnParticles(mappet.getParticleType("blockcrack"), false, pos.x + 0.5, pos.y, pos.z + 0.5, 5, 0.25, 0.1, 0.25, 1, 80);
                    playSoundToPlayers(c, "minecraft:entity.snowman.hurt", pos, "block", 0.1, mappet.random(0.8, 1.0))
                }
            });
            break;
        case "hnt:radio":
            c.getWorld().stopSound("mp.sounds:hnt.items.invisible");
            if (Math.floor(mappet.random(101)) < 0.05) {
                textInfo(c, player, "Сейчас играет: §bDuran Duran - INVISIBLE")
                c.getWorld().playSound("mp.sounds:hnt.items.invisible", pos.x, pos.y, pos.z, 1, mappet.random(0.85, 1.1));
            }
            c.getWorld().playSound("mp.sounds:hnt.interact.laptop_key2", pos.x, pos.y, pos.z, 1, 0.9);
            player.swingArm();
            break;
        case "hnt:workbench":
            if (playerData.role != "owner") return;
            if (mainItem.getItem().getId() == "hw25:magnifier" || mainItem.getItem().getId() == "hw25:thermometer") {
                mainItem.setCount(mainItem.getCount() - 1);
                playSoundToPlayers(c, "mp.sounds:trs.interact.item_break", pos, "block", 0.5, mappet.random(1.3, 1.5));
                player.swingArm();
                if (mappet.random(101) < 50) {
                    textInfo(c, player, "Успех");
                    player.giveItem(mappet.createItem("hnt:scrap"+ Math.floor(mappet.random(1, 4)), 1));
                } else {
                    textInfo(c, player, "Провал");
                }
            } else {
                if (mainItem.getItem().getId() == "minecraft:air") {
                    textInfo(c, player, "Здесь можно переработать некоторые предметы");
                } else {
                    textInfo(c, player, "Это нельзя переработать");
                }
            }
            break;
        case "hw25:note":
            player.executeScript("ui_note.js");
            break;
        case "hnt:sofal":
        case "hnt:sofar":
        case "hw25:sofal":
        case "hw25:sofar":
        case "hnt:chair":
            if (player.isSneaking() || mainItem.getItem().getId() != "minecraft:air" || player.getStates().has("sits") || player.getStates().has("roped")) break;
                player.setRotations(rot.x, normalizeAngle(rot.y), normalizeAngle(rot.z))

                var rotVector = metaToVector(block.getMeta())
                var offset = (block.getBlockId() == "hnt:chair"? 0.05 : 0.2)
                offset = mappet.vector(rotVector.x * offset, rotVector.y * offset, rotVector.z * offset);
                
                player.moveTo("sine_inout", 10, pos.x + 0.5 + offset.x, pos.y, pos.z + 0.5 + offset.z, false);
                player.rotateTo("sine_inout", 10, 0, metaToRotation(block.getMeta()), metaToRotation(block.getMeta()))
                player.applyPotion(mappet.getPotion("jump_boost"), 9999, 128, false);
                playSoundToPlayers(c, "mp.sounds:trs.entity.player_crawl11", pos, "block", 0.4, mappet.random(0.7, 0.8))
                
                c.scheduleScript(10, function() {
                    player.getStates().setString("sits", vectorToArray(pos))
                    if (player.getStates().has("sits")) {
                        player.setHunger(1);
                        player.setPosition(pos.x + 0.5 + offset.x, pos.y, pos.z + 0.5 + offset.z)
                        player.setRotations(0, metaToRotation(block.getMeta()), metaToRotation(block.getMeta()))
                        baseMorph.getCompound("Pose").getCompound("Pose").combine(mappet.createCompound("{right_knee:{RX:-0.6981317f},left_leg:{RX:0.9599311f},right_leg:{RX:0.9599311f},model:{Y:-1.5f,Z:1f},left_knee:{RX:-0.6981317f}}"));
                        baseMorph.setCompound("Settings", mappet.createCompound('{Hands:0b,Speed:0f,Action:"null",ShadowOption:0,Abilities:[],Updates:1b,HP:20,Attack:"null",BetterLightsShadow:1b,Hostile:1b}'));
                        player.setMorph(mappet.createMorph(baseMorph))
                        player.swingArm(1);
                    }
                })
            break;
    }
    }catch(e){
        // c.send(e)
    }
}

function sendInChat(c) {
    let player = c.getPlayer();
    let playerSettings = JSON.parse(player.getStates().getString("settings"));
    let players = c.getServer().getAllPlayers();

    if (playerSettings.chatColor != undefined) {
        c.cancel();
        c.send("<§" + playerSettings.chatColor + c.getPlayer().getName() + "§f> " + c.getValue("message"));

        for (i in players) {
            let player = players[i];
            let pos = player.getPosition();
            player.playSound("mp.sounds:ui.chat_message", pos.x, pos.y, pos.z, 1, 1);
        }
    }
}

function join(c) {
    let s = c.getSubject();
    s.getStates().setString("canDestroyBlocks", "false")
    s.changeHUDMorph("dark", 0, mappet.createMorph('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Color:-16777216,Animation:{Interp:21,Animates:1b,Duration:15},Texture:"b.a:trs/ui/white_square.png",Name:"blockbuster.image",ForcedSettings:0b},Duration:5.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:0,Animation:{Interp:21,Animates:1b,Duration:8},Texture:"b.a:trs/ui/white_square.png",Name:"blockbuster.image",ForcedSettings:0b},Duration:8.0f,EndPoint:0b}],Name:"sequencer",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}'));
    
    if (!s.getStates().has("!notFirstTime")) {
        s.executeScript("ui_firstEnter.js")
        s.setPosition(-40, 21, 46);
        s.setRotations(0,  -130, -130);
		s.setGameMode(2);
    }
    
    if (!s.getStates().has("playerData")) {
        s.getStates().setString("playerData", JSON.stringify(playerDataOrig));
    }
    if (!s.getStates().has("settings")) {
        s.getStates().setString("settings", JSON.stringify({
            "chatColor": "f",
            "ambientSnow": 1,
            "interactTooltip": 1,
        }));
    }
    
    if (c.getServer().getStates().getString("!gameStatus") == "running") {
        rejectPlayer(c, s);
    }

    s.sendActionBar("Привет, " + s.getName());
    c.getWorld().playSound("mp.sounds:trs.events.server_on", 9, 13, 10, 100.0, 1.5);
    s.applyPotion(mappet.getPotion("weakness"), 99999, 0, false);
    s.applyPotion(mappet.getPotion("slowness"), 99999, 0, false);
    s.getMinecraftHUD("FOOD").setRender(false);
    s.getMinecraftHUD("HEALTH").setRender(false);
    s.getMinecraftHUD("EXPERIENCE").setRender(false);

    c.getServer().getAllPlayers().forEach(function(p) {
        let entityData = p.getEntityData();
        if (entityData.get("inUI") == "gameMenu") {
            let uiContext = p.getUIContext();
            uiContext.get("lbOnline").label(uiContext.get("lbOnline").label.slice(0, -1) + (c.getServer().getAllPlayers().length))
            uiContext.sendToPlayer();
        }
    })
}

function leave(c) {
    let s = c.getSubject();
    let entityData = s.getEntityData();
    let spectators = JSON.parse(c.getServer().getStates().getString("spectators"));
    let guests = JSON.parse(c.getServer().getStates().getString("guests"));
    let spectator = spectators.indexOf(s.getName());
    let guest = guests.indexOf(s.getName());

    if (spectator !== -1) {
        spectators.splice(spectator, 1);
        c.getServer().getStates().setString("spectators", JSON.stringify(spectators));
        rejectPlayer(c, s, 0);  
    } else if (c.getServer().getStates().getString("currentGuest") == s.getName()) {
        rejectPlayer(c, s, 0);
    } else if (guest !== -1) {
        rejectPlayer(c, s, 0);
    }
    
    if (entityData.getString("inUI") == "settings") c.getServer().executeScript("ui_settings.js", "changeSettingsMorph");
    
    entityData.remove("inUI");
    c.getWorld().playSound("mp.sounds:trs.events.server_on", 9, 13, 10, 100.0, 1.3);

    c.getServer().getAllPlayers().forEach(function(p) {
        let entityData = p.getEntityData();
        if (entityData.get("inUI") == "gameMenu") {
            let uiContext = p.getUIContext();
            uiContext.get("lbOnline").label(uiContext.get("lbOnline").label.slice(0, -1) + (c.getServer().getAllPlayers().length - 1))
            uiContext.sendToPlayer();
        }
    })

    c.getServer().getStates().reset("gameVoted")
    c.getServer().getAllPlayers().forEach(function(p) {
        p.getStates().reset("gameVoted")
    })
}

function openContainer(c) {
    if (c.getPlayer().getGameMode() == 2 && c.getValue("gui") == "inventory") {
        c.getPlayer().closeUI()
        c.getPlayer().setSetting("keyBindInventory", 0);
    }
}

function jumpBoostBan(c) {
    var s = c.getSubject();
    var pos = s.getPosition();
    if (!s.isPlayer() || s.getGameMode() != 2) return;
    s.setHunger(1);
    c.scheduleScript(25, function() {
        if (s.isOnGround()) {
            s.setHunger(20);
        } else {
            s.setHunger(1);
        }
    });
    playSoundToPlayers(c, "mp.sounds:trs.entity.player_jump" + Math.round(mappet.random(1, 3)), pos, "player", 0.5, mappet.random(0.95, 1.1))
    s.playAnimation("jump");
}

function damageCancel(c) {
    if (c.subject.isPlayer()) {
        c.cancel();
    }
}

function death(player) {
    let state = getPlayerData(player);
    player.getStates().setString("playerData", JSON.stringify(state));
    player.setGameMode(3);
    spawnCorpse(player);
    player.getInventory().clear();
}

function checkOnMainItem(player) {
    if (player.getMainItem().getItem().getId() != "minecraft:air") {
        let npc = spawnItem(player.getMainItem().getItem().getId(), player.getPosition(), player.getWorld(), player.getMainItem().getData(), player.getMainItem().getCount(), getPlayerData(player).role);
        player.getMainItem().setCount(0);
        player.swingArm();
        npc.setRotations(player.getPitch(), player.getYaw(), player.getYawHead());
        npc.setMotion(player.getLook().x, 0, player.getLook().z);

        return npc;
    }
}

function mouseUse(c) {try{
    let player = c.getPlayer();
    let inventory = player.getInventory();
    let ray = player.rayTrace(50);
    let pos = player.getPosition();
    let look = player.getLook();
    let button = c.getValue("button");
    let btnState = c.getValue("buttonState");
    let kickback = look.multiply(-1);
    let playerData = getPlayerData(player);
    let itemID = player.getMainItem().getItem().getId();
    if (itemID == "hw25:snowball" && button == 0 && btnState == true && player.getGameMode() != 3 && !player.getStates().has("roped")) {
        player.getMainItem().setCount(player.getMainItem().getCount() - 1);
        c.getWorld().shootBBGunProjectile(player, pos.x, pos.y + 1.5, pos.z, player.getYaw(), player.getPitch(), '{Gun:{StoredAmmo:0,Projectile:{Loop:20,List:[{Random:0.0f,SetDuration:0b,Morph:{Animation:{Animates:1b,Duration:5},Skin:"b.a:empty/skins/texture.png",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{}}},BodyParts:[{T:[0.0f,-0.4f,0.0f],Limb:"cube",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"hw25:snowball",Count:1b,Damage:0s}}}],Name:"blockbuster.empty",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Animates:1b,Duration:100},Skin:"b.a:empty/skins/texture.png",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{R:[3600.0f,0.0f,0.0f]}}},BodyParts:[{T:[0.0f,-0.4f,0.0f],Limb:"cube",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"hw25:snowball",Count:1b,Damage:0s}}}],Name:"blockbuster.empty",ForcedSettings:0b},Duration:100.0f,EndPoint:0b}],Name:"sequencer",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}}}')
        player.swingArm()
        playSoundToPlayers(c, "mp.sounds:trs.items.item_throw", pos, "player", 1, 1.5);
        playSoundToPlayers(c, "minecraft:entity.snowman.hurt", pos, "player", 0.25, 0.8);
    }

    if (itemID == "hw25:vetka" && button == 0 && btnState == true && player.getGameMode() != 3 && !player.getStates().has("roped")) {
        let victim = ray.getEntity()
        if (ray.isEntity() && pos.distance(victim.getPosition()) < 2.2 && victim.isPlayer() && !victim.getEntityData().getBoolean("stunned")) {
            player.getMainItem().setCount(player.getMainItem().getCount() - 1);
            let motion = victim.getPosition().subtract(pos).normalize()
            victim.setMotion(motion.x / 2, -1, motion.z / 2)
            victim.executeScript("player.js", "stun")
            player.swingArm()
            player.setRotations(player.getPitch(), normalizeAngle(player.getYaw()), normalizeAngle(player.getYawHead()))
            player.rotateTo("bounce_out", 2, player.getPitch() + -10, normalizeAngle(player.getYaw()), normalizeAngle(player.getYawHead()));
            playSoundToPlayers(c, "mp.sounds:hnt.interact.wood_break", pos, "player", 0.5, 1.5);
            c.getWorld().spawnParticles(mappet.getParticleType("blockcrack"), false, victim.getPosition().x, victim.getPosition().y + 1.01, victim.getPosition().z, 15, 0.25, 0.1, 0.25, 1, 5);
        }
    }

    if (itemID == "hnt:medkit" && button == 1 && btnState == true && player.getGameMode() != 3) {
        let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");
        
        if (playerData.role == "owner" && playerData.hp < customGameSetting.ownerHp) {
            player.getMainItem().setCount(player.getMainItem().getCount() - 1);
            playSoundToPlayers(c, "mp.sounds:hnt.items.medkit_pickup", pos, "player", 1, 1);
            player.playSound("mp.sounds:hnt.interact.player_heartbeat", pos.x, pos.y, pos.z, 0.5, 1.3);
            playerData.hp = Math.min(playerData.hp + customGameSetting.healOwner, customGameSetting.ownerHp);
            player.getStates().setString("playerData", JSON.stringify(playerData));
            let maxHP = customGameSetting.ownerHp;
            let currentHP = playerData.hp - customGameSetting.healOwner;
            let newHP = playerData.hp;
            player.setupHUD("ownerStatus")
            player.changeHUDMorph("ownerStatus", 0, mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:7,Duration:20},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:40.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Color:-15066598,Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (maxHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
            player.changeHUDMorph("ownerStatus", 1, mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (currentHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (currentHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f]},Right:-"+(-11 + (newHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:20},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:40.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{P:[-"+(-0.5 + (0.5 * maxHP) )+"f,0.0f,0.0f],S:[1.0f,0.0f,1.0f]},Right:-"+(-11 + (newHP * 11))+",Animation:{Interp:21,Animates:1b,Duration:5},Texture:\"b.a:hw/hp_point.png\",Name:\"blockbuster.image\",ForcedSettings:0b},Duration:5.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
        }
    }
    if (itemID == "hw25:doska" && button == 1 && btnState == true && player.getGameMode() != 3) {
        if (playerData.role == "owner") {
            player.getMainItem().setCount(player.getMainItem().getCount() - 1);
            let result = c.getServer().getStates().getNumber("monstersInHouse") > 0 ? ["[4Да", -65536] : ["[aНет", -16711936];
            let doska = c.getWorld().spawnNpc("item", pos.x, pos.y + 0.5, pos.z);
            doska.getEntityData().setString("access", "noone");
            //doska.getInteractionTrigger().remove(0);
            doska.setMorph(mappet.createMorph("{Skin:\"b.a:empty/skins/texture.png\",Scale:0.75f,BodyParts:[{Limb:\"cube\",Morph:{Loop:1,Hitbox:{Eye:0.9f,Sneak:1.65f,Enabled:1b,Height:0.2f},List:[{Random:0.0f,SetDuration:0b,Morph:{Pose:{Pose:{bone:{},glow:{}}},Skin:\"c.s:hw_doska/skins/doska_geo.png\",Name:\"chameleon.hw_doska\",ForcedSettings:0b},Duration:100.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{Pose:{bone:{},glow:{C:"+result[1]+",G:1.0f}}},Transition:{Interp:18,Animates:1b},Skin:\"c.s:hw_doska/skins/doska_geo.png\",Name:\"chameleon.hw_doska\",ForcedSettings:0b},Duration:70.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{Pose:{bone:{},glow:{}}},Transition:{Interp:21,Animates:1b},Skin:\"c.s:hw_doska/skins/doska_geo.png\",Name:\"chameleon.hw_doska\",ForcedSettings:0b},Duration:20.0f,EndPoint:1b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}}],Name:\"blockbuster.empty\",ForcedSettings:0b}"));
            doska.setMotion(look.x * 0.25, look.y * 0.5, look.z * 0.25);
            doska.setRotations(player.getPitch(), player.getYawHead() + 180, player.getYawHead() + 180);
            playSoundToPlayers(c, "mp.sounds:hw.board_use", doska.getPosition(), "block", 1.0, 1.0);
            
            c.scheduleScript(20, function(context) {
                textInfo(c, player, "[cЕсть ли нечисть в доме?")
            });
            c.scheduleScript(120, function(context) {
                textInfo(c, player, result[0])
                playSoundToPlayers(c, "mp.sounds:hw.board_result", doska.getPosition(), "block", 1.0, 1.0);
            });
            c.scheduleScript(180, function(context) {
                c.getWorld().displayMorph(mappet.createMorph("{Scheme:\"trs_ghostMorph\",Name:\"snowstorm\",ForcedSettings:0b}"), 6, doska.getPosition().x, doska.getPosition().y, doska.getPosition().z)
                playSoundToPlayers(c, "mp.sounds:trs.entity.ghost_dissapear", doska.getPosition(), "master", 1.0, 1.3);
                doska.remove();
            });
        }
    }
    
    if (itemID == "hw25:shotgun" && button == 1 && btnState == true && player.getGameMode() != 3 && !player.getStates().has("sits") && !player.getEntityData().getBoolean("stunned")) {
        for (let i = 0; i < inventory.size(); i++) {
            let stack = inventory.getStack(i);
            if (stack.getItem().getId() == "hnt:ammo") {
                stack.setCount(stack.getCount() - 1);
                playSoundToPlayers(c, "mp.sounds:hnt.interact.shotgun_shot", pos, "master", 100, 1, true)      
                
                player.setupHUD("shot");
                player.swingArm(1)
                player.setRotations(player.getPitch(), normalizeAngle(player.getYaw()), normalizeAngle(player.getYawHead()))

                let playerMorph = mappet.toNBT(player.getMorph())
                let list = playerMorph.getList("BodyParts")
                list.remove(list.size() - 1)
                list.addCompound(mappet.createCompound('{R:[90f,180f,180f],S:[0.7f,0.7f,0.7f],T:[-0.0625f,-0.54f,-0.459946f],Limb:"right_elbow",Morph:{Loop:1,List:[{Random:0f,SetDuration:0b,Morph:{Animation:{Interp:11,Animates:1b,Duration:0},Skin:"b.a:empty/skins/texture.png",CustomPose:{Size:[1f,1f,1f],Poses:{cube:{}}},BodyParts:[{Limb:"cube",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"hw25:shotgun",Count:1b,tag:{},Damage:0s}}},{R:[180f,-180f,0f],S:[0f,0f,0f],T:[0f,0.125f,0.95f],Limb:"cube",Morph:{Skin:"b.a:hw/muzzleflash/skins/muzzleflash.png",CustomPose:{Size:[1f,1f,1f],Poses:{cube:{G:1f}}},Name:"blockbuster.hw/muzzleflash",ForcedSettings:0b}}],Name:"blockbuster.empty",ForcedSettings:0b},Duration:0f,EndPoint:0b},{Random:0f,SetDuration:0b,Morph:{Animation:{Interp:11,Animates:1b,Duration:2},Skin:"b.a:empty/skins/texture.png",CustomPose:{Size:[1f,1f,1f],Poses:{cube:{P:[0f,0f,3f],R:[8f,0f,0f]}}},BodyParts:[{Limb:"cube",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"hw25:shotgun",Count:1b,tag:{},Damage:0s}}},{R:[190f,-180f,25f],T:[0f,0.1875f,0.95f],Limb:"cube",Morph:{Skin:"b.a:hw/muzzleflash/skins/muzzleflash.png",CustomPose:{Size:[1f,1f,1f],Poses:{cube:{G:1f}}},Name:"blockbuster.hw/muzzleflash",ForcedSettings:0b}}],Name:"blockbuster.empty",ForcedSettings:0b},Duration:2f,EndPoint:0b},{Random:0f,SetDuration:0b,Morph:{Animation:{Interp:11,Animates:1b,Duration:1},Skin:"b.a:empty/skins/texture.png",CustomPose:{Size:[1f,1f,1f],Poses:{cube:{P:[0f,0f,3.5625f],R:[5f,0f,0f]}}},BodyParts:[{Limb:"cube",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"hw25:shotgun",Count:1b,tag:{},Damage:0s}}},{R:[180f,-180f,25f],S:[0f,0f,0f],T:[0f,0.15625f,1.10625f],Limb:"cube",Morph:{Skin:"b.a:hw/muzzleflash/skins/muzzleflash.png",CustomPose:{Size:[1f,1f,1f],Poses:{cube:{G:1f}}},Name:"blockbuster.hw/muzzleflash",ForcedSettings:0b}}],Name:"blockbuster.empty",ForcedSettings:0b},Duration:1f,EndPoint:0b},{Random:0f,SetDuration:0b,Morph:{Animation:{Interp:11,Animates:1b,Duration:3},Skin:"b.a:empty/skins/texture.png",CustomPose:{Size:[1f,1f,1f],Poses:{cube:{}}},BodyParts:[{Limb:"cube",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"hw25:shotgun",Count:1b,tag:{},Damage:0s}}},{R:[180f,-180f,0f],S:[0f,0f,0f],T:[0f,0.125f,0.95f],Limb:"cube",Morph:{Skin:"b.a:hw/muzzleflash/skins/muzzleflash.png",CustomPose:{Size:[1f,1f,1f],Poses:{cube:{G:1f}}},Name:"blockbuster.hw/muzzleflash",ForcedSettings:0b}}],Name:"blockbuster.empty",ForcedSettings:0b},Duration:10f,EndPoint:0b}],Name:"sequencer",ForcedSettings:0b,Offset:[0f,0f,0f]}}'))
                player.setMorph(mappet.createMorph(playerMorph))
                
                let newPos = moveForwardAndRight(mappet.vector(0, 1.36, 0), look, 1.3, -0.5)
                
                player.displayMorph(mappet.createMorph("{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b,Duration:0},Skin:\"b.a:hw/muzzleflash/skins/muzzleflash.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{P:[0.0f,0.0f,-1.0f],S:[0.0f,0.0f,0.0f],G:1.0f}}},Name:\"blockbuster.hw/muzzleflash\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:12,Animates:1b,Duration:2},Skin:\"b.a:hw/muzzleflash/skins/muzzleflash.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{R:[0.0f,0.0f,45.0f],G:1.0f}}},Name:\"blockbuster.hw/muzzleflash\",ForcedSettings:0b},Duration:2.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Animates:1b,Duration:2},Skin:\"b.a:hw/muzzleflash/skins/muzzleflash.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{P:[0.0f,0.0f,2.0f],R:[0.0f,0.0f,65.0f],S:[0.0f,0.0f,0.0f],G:1.0f}}},Name:\"blockbuster.hw/muzzleflash\",ForcedSettings:0b},Duration:2.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"), 4, newPos.x, newPos.y+0.1, newPos.z, null, null, true, player);
                c.getServer().getWorld(0).displayMorph(mappet.createMorph("{LightValue:15,UUID:\"6381cff5-b13a-4833-91e4-9f7a06b8384d\",Name:\"light\",ForcedSettings:0b}"), 2, pos.x + newPos.x, pos.y + newPos.y+0.1, pos.z + newPos.z);
                
                player.rotateTo("bounce_out", 2, player.getPitch() + -10, normalizeAngle(player.getYaw()), normalizeAngle(player.getYawHead()));
                player.setMotion(kickback.x/2, 0, kickback.z/2)
                player.getArmRender(0).moveTo("back_out", 4, -0.1, 0, 0.5);
                c.scheduleScript(4, function(context) {
                    player.getArmRender(0).reset();
                });
                c.scheduleScript(6, function(context) {
                    let playerMorph = mappet.toNBT(player.getMorph())
                    let list = playerMorph.getList("BodyParts")
                    list.remove(list.size() - 1)
                    list.addCompound(mappet.createCompound('{R:[90f,180f,180f],S:[0.7f,0.7f,0.7f],T:[-0.0625f,-0.54f,-0.459946f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"hw25:shotgun",Count:1b,Damage:0s}}}'))
                    player.setMorph(mappet.createMorph(playerMorph))
                });
                if (ray.isEntity() && ray.getEntity().isPlayer()) {
                    let deadMan = ray.getEntity()
                    let deadManSkin = getStateSilently(deadMan, "skin")
                    let deadManPos = deadMan.getPosition()
                    let deadManRot = deadMan.getRotations()
                    let direct = deadManPos.subtract(pos).normalize()

                    deadMan.getStates().has("sits") ? standUp(deadMan) : null

                    // c.send("снайпнул: "+ ray.getEntity().getName())
                    
                    playSoundToPlayers(c, "mp.sounds:hnt.interact.bullet_hitflesh", deadManPos, "player", 1, 1)
                    c.getWorld().displayMorph(mappet.createMorph("{Scheme:\"hnt_blood\",Name:\"snowstorm\",ForcedSettings:0b}"), 6, ray.getHitPosition().x, ray.getHitPosition().y, ray.getHitPosition().z)
                    
                    deadMan.setupHUD("shot");
                    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");
                    if (getStateSilently(deadMan, "playerData").role == "monster" && customGameSetting.monstersKill) c.getServer().getStates().add("monsterCount", 1)
                    rejectPlayer(c, deadMan)

                    let deadNpc = c.getServer().getWorld(0).spawnNpc("sleep", "default", deadManPos.x, deadManPos.y, deadManPos.z, normalizeAngle(deadManRot.y), 0, normalizeAngle(deadManRot.z));
                    deadNpc.getStates().setString("dead", "true")
                    deadNpc.getStates().setString("name", deadMan.getName())
                    deadNpc.setRotations(0, normalizeAngle(deadManRot.y), normalizeAngle(deadManRot.z))
                    deadNpc.addMotion(direct.x/3, direct.y/2, direct.z/3)
                    
                    let deadMorph = mappet.createCompound(deadManSkin.morph)
                    deadMorph.setCompound("Actions", mappet.createCompound('{running:{Speed:0.0f,Name:"stun1_idle"},sprinting:{Speed:0.0f,Name:"stun1_idle"},falling:{Speed:0.0f,Name:"stun1_idle"},idle:{Speed:0.0f,Name:"stun1_idle"}}'))
                    deadMorph.setCompound("Hitbox", mappet.createCompound("{Eye:1f,Sneak:0.5f,Enabled:1b,Height:0.5f,Width:0.5f}"))

                    let list = deadMorph.getList("Skin")
                    list.addCompound(mappet.createCompound('{Path:"b.a:hw/wound_overlay.png"}'))

                    deadNpc.setMorph(mappet.createMorph(deadMorph))
                    deadNpc.playAnimation("stun_1")
                    
                } else if (ray.isBlock()) {
                    playSoundToPlayers(c, "mp.sounds:hnt.interact.bullet_hitblock", ray.getHitPosition(), "block", 1, 1)
                    c.getWorld().displayMorph(mappet.createMorph("{Scheme:\"trs_dust\",Name:\"snowstorm\",ForcedSettings:0b}"), 3, ray.getHitPosition().x, ray.getHitPosition().y, ray.getHitPosition().z)
                }
                
                break;
            }
        }
        
    }
    }catch(e) {
        // c.send(e)
    }
}

function hit(c) {try{
    let projectile = c.getValue("projectile");
    let entity = c.getValue("entity");
    let thrower = c.getValue("thrower");
    let pos = c.getValue("pos");

    projectile.remove();
    
    if (entity != null && entity.isPlayer()) {
        let entityData = entity.getEntityData();
        
        entityData.setInt("frostbite", entityData.getInt("frostbite") + 2)
        entity.setupHUD("stun")
        pos.y += 1.5;
        
        if (mappet.random(101) < 25) {
            entity.executeScript("player.js", "stun");
        }
        c.getWorld().playSound("mp.sounds:hnt.interact.bullet_hitflesh", pos.x, pos.y, pos.z, 1, mappet.random(1, 1.4));
    }
    c.getWorld().playSound("mp.sounds:hnt.interact.bullet_hitblock", pos.x, pos.y, pos.z, 0.5, mappet.random(0.8, 1.2));
    c.getWorld().displayMorph(mappet.createMorph("{Scheme:\"hw_snowball\",Vars:{variable.yacceleration:\"-15\",variable.speed:\"10\",variable.amount:\"15\"},Name:\"snowstorm\",ForcedSettings:0b}"), 40, pos.x, pos.y, pos.z);
} catch(e) {
    // c.send(e)
}
}

function stun(c) {
    let player = c.getServer().getPlayer(c.getValue("player_name"));
    let baseMorph = mappet.createCompound(JSON.parse(player.getStates().getString("skin")).morph);
    let pos = player.getPosition()
    let armRender = player.getArmRender(0);

    if (player.getEntityData().getBoolean("stunned")) return
    
    player.getStates().has("sits") ? standUp(player) : null
    player.getStates().has("roped") ? ropePlayer(player, false) : null

    c.scheduleScript(player.getStates().has("sits") || player.getStates().has("roped") ? 1 : 0, function() {
        player.getEntityData().setBoolean("stunned", true);
        baseMorph.setCompound("Hitbox", mappet.createCompound("{Eye:0.9f,Sneak:0.8f,Enabled:1b,Height:0.8f}"))
        baseMorph.setCompound("Pose", mappet.createCompound("Pose:{head:{},right_knee:{},right_arm:{},left_leg:{},torso:{},left_arm:{},right_leg:{},model:{SX:0.925f,SY:0.925f,SZ:0.925f,Y:-0.65625f},right_elbow:{},left_knee:{},left_elbow:{}}"))
        player.setMorph(mappet.createMorph(baseMorph));
        player.playAnimation("stun1");
        player.applyPotion(mappet.getPotion("jump_boost"), 48, 128, false);
        player.setHunger(1);
        player.rotateTo("bounce_out", 10, player.getPitch() + 30, player.getYaw(), player.getYawHead());
        c.getWorld().playSound("mp.sounds:hnt.entity.player_fall", pos.x, pos.y, pos.z);
        player.playSound("mp.sounds:hnt.entity.player_fall_firstperson", pos.x, pos.y, pos.z); 
        armRender.moveTo("linear", 10, 0, -2, 0);
        // c.getWorld().displayMorph(mappet.createMorph("{Scheme:\"hnt_dust\",Vars:{variable.size:\"0.4\"},Name:\"snowstorm\"}"), 40, pos.x, pos.y, pos.z);
    
        player.setupHUD("stun")
        c.scheduleScript(6, function() {
            baseMorph.setCompound("Hitbox", mappet.createCompound("{Eye:0.9f,Sneak:0.4f,Enabled:1b,Height:0.4f}"))
            baseMorph.setCompound("Actions", mappet.createCompound("{running:\"stun1_idle\",sprinting:\"stun1_idle\",falling:\"stun1_idle\",crouching:\"stun1_idle\",idle:\"stun1_idle\",land:\"stun1_idle\",crouching_idle:\"stun1_idle\",jump:\"stun1_idle\"}"))
            baseMorph.setCompound("Settings", mappet.createCompound("{Speed:0.0f}"))
            player.setMorph(mappet.createMorph(baseMorph));
            c.scheduleScript(20, function() {
                if (player.getEntityData().getBoolean("stunned")) {
                    baseMorph.setCompound("Hitbox", mappet.createCompound("{Eye:0.9f,Sneak:1.2f,Enabled:1b,Height:1.2f}"))
                    player.setMorph(mappet.createMorph(baseMorph));
                    player.playAnimation("stun1_gettingUp");
                    player.applyPotion(mappet.getPotion("slowness"), 999999, 0, false);
                    player.rotateTo("bounce_out", 5, player.getPitch() + 10, player.getYaw(), player.getYawHead());
                    c.getWorld().playSound("mp.sounds:hnt.entity.player_standup", pos.x, pos.y, pos.z);
                    armRender.moveTo("linear", 16, 0, 0.05, 0);
                    c.scheduleScript(10, function() {
                        player.rotateTo("bounce_out", 8, player.getPitch() - 25, player.getYaw(), player.getYawHead());
                        baseMorph.setCompound("Hitbox", mappet.createCompound("{Eye:0.9f,Sneak:1.6f,Enabled:1b,Height:1.8f}"))
                        baseMorph.remove("Actions")
                        baseMorph.remove("Settings")
                        player.setMorph(mappet.createMorph(baseMorph));
                        player.getEntityData().setBoolean("stunned", false);
                        player.setHunger(20);
                        armRender.reset();
                        c.scheduleScript(1, function() {player.executeScript("items.js", "equipmentChange")})                       
                    });
                }
            });
        });
    });
}

function moveForwardAndRight(pos, lookVec, distanceForward, distanceRight) {
    var length = lookVec.length();
    if (length === 0) return pos;
    var forwardX = lookVec.x / length;
    var forwardY = lookVec.y / length;
    var forwardZ = lookVec.z / length;

    var upX = 0, upY = 1, upZ = 0;

    var rightX = upY * forwardZ - upZ * forwardY;
    var rightY = upZ * forwardX - upX * forwardZ;
    var rightZ = upX * forwardY - upY * forwardX;

    var rightLength = Math.sqrt(rightX*rightX + rightY*rightY + rightZ*rightZ);
    if (rightLength === 0) return pos;
    rightX /= rightLength;
    rightY /= rightLength;
    rightZ /= rightLength;

    var newX = pos.x + forwardX * distanceForward + rightX * distanceRight;
    var newY = pos.y + forwardY * distanceForward + rightY * distanceRight;
    var newZ = pos.z + forwardZ * distanceForward + rightZ * distanceRight;

    return mappet.vector3(newX, newY, newZ);
}