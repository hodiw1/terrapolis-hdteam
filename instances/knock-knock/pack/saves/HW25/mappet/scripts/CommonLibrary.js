const logger = mappet.getLogger();

function getRandomItemByChance(items) {
    var totalChance = 0;
    var entries = [];

    for (var id in items) {
        if (items.hasOwnProperty(id)) {
            totalChance += items[id];
            entries.push({id: id, chance: items[id]});
        }
    }

    var random = mappet.random(totalChance);

    var cumulative = 0;
    for (var i = 0; i < entries.length; i++) {
        cumulative += entries[i].chance;
        if (random < cumulative) {
            return entries[i].id;
        }
    }
    
    return "";
}

function getPlayerData(player) {
    return getStateSilently(player, "playerData");
}

function getStateSilently(statesProvider, stateId) {
    return statesProvider.getStates().has(stateId) ? JSON.parse(statesProvider.getStates().getString(stateId)) : {};
}

function contains(array, value) {
    if (array.indexOf(value) != -1)
        return true;
    return false;
}

function resetBlocks(c) {
    var world = c.getServer().getWorld(0);
    
    let doorCoords = [
        [-5, 23, 26],
        [-5, 23, 19], 
        [-7, 23, 17],
        [-9, 23, 19]
    ];
    
    doorCoords.forEach(function(coord) {
        let x = coord[0], y = coord[1], z = coord[2];
        let block = world.getBlock(x, y, z);
        
        if (block.getBlockId() == "hw25:intdooropen") {
            world.setBlock(mappet.createBlockState("hw25:intdoorclosed", block.getMeta()), x, y, z);
        }
    });
    
    let curtainCoords = [
        [0, 23, 19],
        [0, 23, 20],
        [-3, 23, 18],
        [-2, 23, 18],
        [-8, 23, 15],
        [-12, 23, 19],
        [-12, 23, 21],
        [-3, 23, 28],
        [-1, 23, 28],
        [-7, 23, 28],
        [-8, 23, 28],
        [-10, 23, 28],
        [-11, 23, 28],
        [-12, 23, 27]
    ];
    let replacements = {
        "hw25:curtainssingleopen": "hw25:curtainssingle",
        "hw25:curtainsdouble_ropen": "hw25:curtainsdouble_r", 
        "hw25:curtainsdouble_lopen": "hw25:curtainsdouble_l"
    };
    
    curtainCoords.forEach(function(coord) {
        let x = coord[0], y = coord[1], z = coord[2];
        let block = world.getBlock(x, y, z);
        
        if (block) {
            var blockId = block.getBlockId();
            var newBlockId = replacements[blockId];
            
            if (newBlockId) {
                world.setBlock(mappet.createBlockState(newBlockId, block.getMeta()), x, y, z);
            }
        }
    });
    
}

function setInteractCooldown(c, player, ticks) {
    let entityData = player.getEntityData();
    entityData.setBoolean("interactCooldown", true);
    c.scheduleScript(ticks, function (context) {
        entityData.remove("interactCooldown");
    });
}

function textInfo(c, player, text) {
    player.setupHUD("textInfo");
    player.changeHUDMorph("textInfo", 0, mappet.createMorph("{List:[{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Duration:0},Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{S:[1.0f,0.0f,1.0f],Limb:\"cube\",Morph:{Background:1426063360,Label:\""+text+"\",Name:\"label\",ForcedSettings:0b}}],Settings:{Hands:0b,Speed:0.1f,Action:\"null\",ShadowOption:1,Abilities:[],Updates:1b,HP:20,Attack:\"null\",BetterLightsShadow:1b,Hostile:1b},Name:\"blockbuster.empty\",ForcedSettings:1b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b,Duration:3},Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{Limb:\"cube\",Morph:{Background:1426063360,Label:\""+text+"\",Name:\"label\",ForcedSettings:0b}}],Settings:{Hands:0b,Speed:0.1f,Action:\"null\",ShadowOption:1,Abilities:[],Updates:1b,HP:20,Attack:\"null\",BetterLightsShadow:1b,Hostile:1b},Name:\"blockbuster.empty\",ForcedSettings:1b},Duration:50.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b,Duration:3},Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{S:[1.0f,0.0f,1.0f],Limb:\"cube\",Morph:{Background:1426063360,Label:\""+text+"\",Name:\"label\",ForcedSettings:0b}}],Settings:{Hands:0b,Speed:0.1f,Action:\"null\",ShadowOption:1,Abilities:[],Updates:1b,HP:20,Attack:\"null\",BetterLightsShadow:1b,Hostile:1b},Name:\"blockbuster.empty\",ForcedSettings:1b},Duration:3.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"));
    
    let check = Math.floor(mappet.random(101));
    player.getEntityData().setInt("textInfo", check);
    c.scheduleScript(53, function (context) {
        if (player.getEntityData().getInt("textInfo") == check) player.getEntityData().remove("textInfo");
    });
}

function repairDoor(c, player) {
    let gameData = getStateSilently(c.getServer(), "gameData");
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");
    inv = player.getInventory(), slots = [];
    
    for (var i = 0; i < inv.size(); i++) {
        var s = inv.getStack(i), id;
        if (!s.isEmpty() && ((id = s.getItem().getId()) == "hnt:scrap1" || id == "hnt:scrap2" || id == "hnt:scrap3")) {
            slots.push(i);
        }
    }
    if (slots.length > 0 && gameData.door < 100) {
        var slot = slots[Math.floor(Math.random() * slots.length)];
        var stack = inv.getStack(slot);
        stack.getCount() > 1 ? stack.setSize(stack.getCount() - 1) : inv.setStack(slot, null);
        playSoundToPlayers(c, "mp.sounds:trs.interact.repair_process1", mappet.vector(-13.5, 23, 25.5), "block", 1.0, mappet.random(1.4, 1.8))
        
        gameData.door += customGameSetting.doorRepair;
        if (gameData.door > 100) gameData.door = 100;
        c.getServer().getStates().setString("gameData", JSON.stringify(gameData));
    }
    textInfo(c, player, "[7Прочность двери: [f"+gameData.door+"%");
}

function swapLight(c) {
    let world = c.getServer().getWorld(0);
    
    let coords = [
        [-9, 25, 26],
        [-2, 25, 26],
        [-7, 25, 21],
        [-1, 24, 18],
        [-11, 25, 20],
        [-7, 25, 15]
    ];
    let replacements = {
        "hw25:lamp": "hw25:lampoff",
        "hw25:lampoff": "hw25:lamp", 
        "hw25:lantern2": "hw25:lantern2_off",
        "hw25:lantern2_off": "hw25:lantern2"
    };
    
    coords.forEach(function(pos){
        let block = world.getBlock(pos[0],pos[1],pos[2]), id = block.getBlockId();
        if(replacements[id]) world.setBlock(mappet.createBlockState(replacements[id], block.getMeta()), pos[0], pos[1], pos[2]);
    });
    
}

function standUp(player) {
    let pos = player.getPosition();
    let sits = player.getStates().getString("sits")
    let seatPos = mappet.vector(sits.split(",")[0], sits.split(",")[1], sits.split(",")[2])
    let seatBlock = player.getWorld().getBlock(seatPos)
    let direction = metaToVector(seatBlock.getMeta())
    player.getStates().reset("sits")
    player.executeScript("items.js", "equipmentChange")
    player.removePotion(mappet.getPotion("jump_boost"));
    player.setMotion(direction.x / 4, 0, direction.z / 4)
    player.setHunger(20);
    playSoundToPlayers(player, "mp.sounds:trs.entity.player_crawl3", pos, "block", 0.35, mappet.random(0.9, 1.2))
}

function ropePlayer(player, rope) {
    let armRender = player.getArmRender(0);
    if (rope) {
        player.getStates().setString("roped", "true")
        let skin = JSON.parse(player.getStates().getString("skin"))
        let ropes = {
            male : '{S:[0f,0f,0f],R:[0f,180f,0f],T:[0.01f,0.05f,0f],Limb:"torso",Morph:{Skin:"b.a:hw/rope/skins/rope.png",Name:"blockbuster.hw/rope",ForcedSettings:0b}}',
            female : '{S:[0f,0f,0f],R:[5f,180f,0f],T:[0.01f,0.02f,0.02f],Limb:"torso",Morph:{Skin:"b.a:hw/rope_slim/skins/rope.png",Name:"blockbuster.hw/rope_slim",ForcedSettings:0b}}',
            slim : '{S:[0f,0f,0f],R:[0f,180f,0f],T:[0f,0.05125f,0.02f],Limb:"torso",Morph:{Skin:"b.a:hw/rope_slim/skins/rope.png",Name:"blockbuster.hw/rope_slim",ForcedSettings:0b}}'
        }
        let oMorph = mappet.createCompound(JSON.parse(player.getStates().getString("skin")).morph)
        let ropeMorph = mappet.createCompound(ropes[skin.modelType])
        let list;
        let itemIndex = 0

        if (oMorph.has("BodyParts")) {
            list = oMorph.getList("BodyParts")
            itemIndex = oMorph.get("BodyParts").size()
            list.addCompound(mappet.createCompound(ropeMorph))                        
        } else {
            list = mappet.createList("["+ ropeMorph.stringify() +"]");
        }

        oMorph.setList("BodyParts", list);
        player.setMorph(mappet.createMorph(oMorph));
        armRender.moveTo("linear", 10, 0, -2, 0);

        if (skin.modelType != "slim") {
            list.getCompound(itemIndex).remove("S")
        } else (
            list.getCompound(itemIndex).setList("S", mappet.createList("[1.1f,1f,1f]"))
        )
        oMorph.setList("BodyParts", list);
        oMorph.addCompound("Pose")
        oMorph.getCompound("Pose").setCompound("Pose", mappet.createCompound("{right_arm:{RX:0.6108652f,F:0b,RY:0.6108652f,X:1f,Y:-0.5f},left_arm:{RX:0.6108652f,F:0b,RY:-0.6108652f,X:-1f,Y:-0.5f},right_elbow:{RX:0.1745329f,F:0b},left_elbow:{RX:0.1745329f,F:0b}}"));
        player.setMorph(mappet.createMorph(oMorph));
        
        player.applyPotion(mappet.getPotion("slowness"), 99999, 1, false);
    } else {
        armRender.moveTo("linear", 16, 0, 0.05, 0);
        player.getStates().reset("roped")
        let oMorph = mappet.createCompound(JSON.parse(player.getStates().getString("skin")).morph)
        oMorph.addCompound("Pose")
        player.setMorph(mappet.createMorph(oMorph));
        player.removePotion(mappet.getPotion("slowness"))
        player.applyPotion(mappet.getPotion("slowness"), 99999, 0, false);
    }

}

function rejectPlayer(c, rejected, pushToSpectators) {
    if (pushToSpectators == undefined) pushToSpectators = true;

    let beds = JSON.parse(c.getServer().getStates().getString("beds"))
    let guests = JSON.parse(c.getServer().getStates().getString("guests"))
    let spectators = JSON.parse(c.getServer().getStates().getString("spectators"))

    if (rejected.getName() == c.getServer().getStates().getString("currentGuest")) {
        let gameData = getStateSilently(c.getServer(), "gameData");
        c.getServer().getStates().setString("currentGuest", "")
        gameData.time = 2;
        c.getServer().getStates().setString("gameData", JSON.stringify(gameData))
    }
    if (guests.indexOf(rejected.getName()) !== -1 && getStateSilently(rejected, "playerData").role == "monster") {
        c.getServer().getStates().add("monstersInHouse", -1)
        if (rejected.getStates().has("roped")) c.getServer().getStates().add("ropedMonsters", -1)
    }
    if (rejected.getStates().has("roped")) ropePlayer(rejected, false)
    if (getStateSilently(rejected, "playerData").role == "monster") c.getServer().getStates().add("monsterCount", -1)
    if (beds.indexOf(rejected.getName()) !== -1) beds[beds.indexOf(rejected.getName())] = "";
    if (guests.indexOf(rejected.getName()) !== -1) guests.splice(guests.indexOf(rejected.getName()), 1);
    
    rejected.getStates().setString("playerData", JSON.stringify(cloneObject(playerDataOrig)));
    rejected.setGameMode(3);
    rejected.setPosition(-26, 25, 26);

    pushToSpectators ? spectators.push(rejected.getName()) : null;

    c.getServer().getStates().setString("beds", JSON.stringify(beds));
    c.getServer().getStates().setString("guests", JSON.stringify(guests));
    c.getServer().getStates().setString("spectators", JSON.stringify(spectators));
    // if (c.getServer().getPlayer("Tinpis")) {c.getServer().getPlayer("Tinpis").send(spectators)}
   
    spectators.length <= 3 ? rollPlayerData(c, rejected) : null;
} 

function getRandomFreeSlot(array) {
    var freeIndices = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] === "") {
            freeIndices.push(i);
        }
    }

    if (freeIndices.length === 0) return false;

    var randomIndex = freeIndices[Math.floor(mappet.random(freeIndices.length))];

    return randomIndex;
}

function rollPlayerData(c, player) {try {
    let monsterRandomData = JSON.parse(c.getServer().getStates().getString("monsterRandomData"))
    let spectatorData = cloneObject(playerDataOrig);
    let spectatorSkin = JSON.parse(player.getStates().getString("skin"))
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");

    spectatorData.hp = 1;
    spectatorData.role = Math.random() < 0.5 && c.getServer().getStates().getNumber("monsterCount") < customGameSetting.maxMonsters ? "monster" : "stranger";
    spectatorData.name = randomAElement(spectatorSkin.modelType == "female" ? femaleNames : maleNames);
    spectatorData.character = randomAElement(strangerCharacter.map(function(character) {return character[0]}));
    spectatorData.behaviour = randomAElement(strangerBehaviour.map(function(behaviour) {return behaviour[0]}));
    spectatorData.temperature = Math.random() < (spectatorData.role == "stranger" ? 0.5 : 0.25) ? 36.6 : Math.random() < 0.5 ? Number(mappet.random(35.0, 36.6).toFixed(1)) : Number(mappet.random(36.6, 38.0).toFixed(1));
    
    let spectatorMorph = mappet.createCompound(spectatorSkin.morph)
    let skins = getSkinsList(spectatorSkin) 

    let index = skins.indexOf(spectatorSkin.uniformSkin);
    if (index !== -1) skins.splice(index, 1);
    let randomUniformSkin = skins[Math.floor(Math.random() * skins.length)]

    spectatorMorph.getList("Skin").getCompound(2).setString("Path", "c.s:pl_"+ spectatorSkin.modelType +"/skins/"+ randomUniformSkin)
    player.setMorph(mappet.createMorph(spectatorMorph))
    
    spectatorSkin.morph = spectatorMorph.stringify()
    spectatorSkin.uniformSkin = randomUniformSkin
    player.getStates().setString("skin", JSON.stringify(spectatorSkin))

    if (spectatorData.role == "monster") {
        c.getServer().getStates().add("monsterCount", 1)
        player.getStates().setNumber("starvation", customGameSetting.starvation)
        let random = Math.floor(mappet.random(0, 3));

        switch (random) {
            case 0:
                spectatorData.character = monsterRandomData.character
                break;
            case 1:
                spectatorData.behaviour = monsterRandomData.behaviour
                break;
            case 2:
                spectatorData.temperature = monsterRandomData.temperature
                break;
        }
    }

    let guaranteedSpawn = ["hnt:ammo", "hnt:mineral3"]
    
    let giveItem = false;
    var item = getRandomItemByChance(itemsSpawnChances)
    let items = getStateSilently(c.getServer(), "randomItems")
    let gameData = getStateSilently(c.getServer(), "gameData")
    items.forEach(function(spawnedItem) {
    if (guaranteedSpawn.indexOf(spawnedItem) !== -1) 
        guaranteedSpawn.splice(guaranteedSpawn.indexOf(spawnedItem), 1) 
    })
    if (gameData.cycle + guaranteedSpawn.length >= 7 && guaranteedSpawn.indexOf(item) == -1 && items.indexOf(item) == -1 && guaranteedSpawn.length > 0) {
        items.push(guaranteedSpawn[Math.floor(mappet.random(guaranteedSpawn.length))])
        c.getServer().getStates().setString("randomItems", JSON.stringify(items))
        giveItem = items[items.length - 1]
    } else {
        giveItem = item
        if (guaranteedSpawn.indexOf(item) !== -1 && items.indexOf(item) == -1) {
            items.push(item)
            c.getServer().getStates().setString("randomItems", JSON.stringify(items))
        }
    }
    player.getInventory().clear();
    if (giveItem != false && giveItem != "") {
        let createdItem = giveItem != "hnt:mineral3" ? mappet.createItem(giveItem) : mappet.createItem(mappet.createCompound("{id:\"hnt:mineral3\",tag:{display:{Lore:[],Name:\"\u00A7cКамень изгнания\"}},Count:1b}"))
        player.giveItem(createdItem)
    }


    // c.send(player.getName() + " Роль: " + spectatorData.role + " Имя: " + spectatorData.name + " Характер: " + spectatorData.character + " Поведение: " + spectatorData.behaviour + " Температура: " + spectatorData.temperature + "\nПредмет: " + (itemsName[item] != undefined ? itemsName[item] : "Нихуя"));
    player.getStates().setString("playerData", JSON.stringify(spectatorData));
    player.getStates().setString("updateHudInfo", "true")
    player.executeScript("hud_info.js")
} catch (e) {
    // c.send(e)
}
    
}

function lookAtTarget(subject, target) {
    var subjectPos = subject.getPosition();
    var targetPos
    try {
        targetPos = target.isPlayer() || target.isNpc() ? target.getPosition() : null
    } catch (c) {
        targetPos = target
    }

    var dx = targetPos.x - subjectPos.x;
    var dy = targetPos.y - subjectPos.y;
    var dz = targetPos.z - subjectPos.z;

    var yaw = Math.atan2(dz, dx) * 180 / Math.PI - 90;
    var pitch = -Math.atan2(dy, Math.sqrt(dx * dx + dz * dz)) * 180 / Math.PI;

    subject.setRotations(pitch, yaw, yaw);
}

function playSoundToPlayers(context, soundName, soundPos, category, volume, pitch, forced) {
    let server = context.getServer()
    let players = server.getAllPlayers()
    category = category == undefined ? "master" : category;
    volume = volume == undefined ? 1 : volume;
    pitch = pitch == undefined ? 1 : pitch;
    for (let i in players) {
        let player = players[i];
        let pos = player.getPosition();
        if (forced || (Math.abs(pos.y - soundPos.y) < 4 && pos.distance(soundPos) <= ((volume < 1 ? 1 : volume) * 16 + 7))) {
            player.playSound(soundName, category, soundPos.x, soundPos.y, soundPos.z, volume, pitch);
        }
    }
}

function canPickup(player, compound) {
    let fulledStacks = 0;

    for (let i = 0; i < 9; i++) {
        let stack = player.getInventory().getStack(i);

        if (!stack.isEmpty()) {
            fulledStacks++;
        }
        if (compound.getString("id") == stack.getItem().getId()) {
            if (compound.getByte("Count") <= stack.getMaxCount() - stack.getCount()) {
                fulledStacks--;
            }
        }
    }
    if (fulledStacks != 9) return true;
    return false;
}

function getServerFromWorld(world) {
    return mappet.getMappetServer(world.getMinecraftWorld().func_73046_m());
}

function getSkinsList(skin) {
    let excludePatterns = ["_overlay", "!"];
    let files = Java.from(mappet.createPath("./config/chameleon/models/pl_"+ skin.modelType +"/skins").list());

    for (var i = files.length - 1; i >= 0; i--) {
        let name = files[i].getFullName();
        var shouldExclude = false;
        
        for (var j = 0; j < excludePatterns.length; j++) {
            if (name.indexOf(excludePatterns[j]) !== -1) {
                shouldExclude = true;
                break;
            }
        }
        
        if (shouldExclude) {
            files.splice(i, 1);
        }
    }

    return files.map(function(f) {return f.getFullName()});
}


function spawnItem(id, pos, world, nbt, count, access) {
    access = access == undefined ? "any" : access;
    let item = world.spawnNpc("item", pos.x, pos.y + 0.01, pos.z);
    let customTransform = "";

    if (count == null) {
        count = 1;
    }
    if (nbt == null) {
        nbt = mappet.createCompound();
    }

    item.setMorph(mappet.createMorph("{Hitbox:{Eye:0.9f,Sneak:0.5f,Enabled:1b,Height:0.5f,Width:0.5f},Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{" + (customTransform != "" ? customTransform : "T:[0.0f,-0.5f,0.0f]") + ",Limb:\"cube\",Morph:{Name:\"item\",Stack:{id:\"" + id + "\",Count:" + count + "b,Damage:0s,tag:" + nbt + "}}}],Settings:{Hands:1b},Name:\"blockbuster.empty\"}"));
    item.getEntityData().setString("id", id);
    item.getEntityData().setByte("Count", count);
    item.getEntityData().setCompound("tag", nbt);
    item.getEntityData().setString("access", access);
    item.setRotations(0, 0, Math.floor(mappet.random(-180, 180)))
    return item;
}

function normalizeAngle(angle) {
    while (angle > 180) angle -= 360;
    while (angle <= -180) angle += 360;
    return angle;
}

function contains(array, value) {
    if (array.indexOf(value) != -1)
        return true;
    return false;
}

function getBlocksInRadius(world, pos, radius, blockId, startsWith) {
    let blocks = [];

    for (let x = pos.x - radius; x <= pos.x + radius; x++) {
        for (let y = pos.y - radius; y <= pos.y + radius; y++) {
            for (let z = pos.z - radius; z <= pos.z + radius; z++) {
                let blockPos = mappet.vector(Math.floor(x), Math.floor(y), Math.floor(z));

                if (startsWith ? world.getBlock(blockPos).getBlockId().startsWith(blockId) : world.getBlock(blockPos).getBlockId() == blockId) {
                    blocks.push(blockPos);
                }
            }
        }
    }

    return blocks;
}

function isColliding(player, entity) {
    if (player.getBoundingBox().isColliding(entity.getBoundingBox()))
        return true;
    return false;
}

function floor(vector) {
    return mappet.vector(Math.floor(vector.x), Math.floor(vector.y), Math.floor(vector.z));
}

function arrayToVector(array) {
    return mappet.vector(array[0], array[1], array[2]);
}

function vectorToArray(vector) {
    return JSON.parse(vector.toArrayString());
}

function indexOfVector(array, vector) {
    let value = -1;

    array.forEach(function(vec, index) {
        if (vector.equals(vec)) {
            value = index;
        }
    });

    return value;
}

function cloneObject(obj) {
    let copy = {};

    Object.keys(obj).forEach(function(key) {
        copy[key] = obj[key];
    });

    return copy;
}

function metaToRotation(meta) {
    switch (meta) {
        case 2:
            return 180;
        case 3:
            return 0;
        case 4:
            return 90;
        case 5:
            return -90;
        default:
            return 0;
    }
}  

function metaToVector(meta) {
    switch (meta) {
        case 2:
            return mappet.vector(0, 0, -1);
        case 3:
            return mappet.vector(0, 0, 1);
        case 4:
            return mappet.vector(-1, 0, 0);
        case 5:
            return mappet.vector(1, 0, 0);
        default:
            return mappet.vector(0, 0, 0);
    }
}

function randomAElement(array) {
    return array[Math.floor(mappet.random(array.length))];
}

function inBoxs(pos, boxs) {
    let inHouse = false;
    boxs.forEach(function(box) {
        if (box.contains(pos)) {
            inHouse = true;
            return;
        }
    })    
    return inHouse;
}

function getSpawnPos(world, spawnBoxs) {
    let state = mappet.createBlockState("minecraft:air");
    let air = []

    spawnBoxs.forEach(function (box) {
        let blockPositions = Java.from(box.getBlocksPositions(world, state));
        blockPositions.forEach(function(pos) {
            air.push(pos);
        });
    })
    return air
}