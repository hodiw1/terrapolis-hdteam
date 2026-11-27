
function main(c) {
    if (!c.getPlayer().getMinecraftPlayer().func_70003_b(1, "/gamemode 1")) return
    let world = c.getServer().getWorld(0)
    let s = c.getSubject();
    let entityData = s.getEntityData();
    let pos = s.getPosition()
    let gameData = JSON.parse(c.getServer().getStates().getString("gameData"));
    
    
    let ui = mappet.createUI(c, "handler")//.background();
    ui.current.keybind(2, "gm_1", "Creative");
    ui.current.keybind(3, "gm_2", "Adventure");
    ui.current.keybind(4, "gm_3", "Spectator");
    
    let players = Java.from(c.getServer().getAllPlayers())
    let entities = [];

    world.getEntities(pos.x - 32, pos.y - 32, pos.z - 32, pos.x + 32, pos.y + 32, pos.z + 32, true).forEach(function(ent) {
        if (ent.isNPC() && ent.getNpcId() == "item") entities.push(ent)  
    })

    let mainlt = ui.layout();
    mainlt.current.id("mainlt").rx(0.5, 0).ry(0.5, 0).rw(0, 65).rh(0, 65).anchor(0.5, 0.5).visible(true);
    mainlt.graphics().rx(0.5, 0).ry(0.5, 0).rw(1, 0).rh(1, 0).anchor(0.5, 0.5).gradient(0x836c6c5e, 0x8320201c).rwh(1, 1);
    
    let select = 0;
    for (let i in players) {
        playerName = players[i].getName()
        playerName == s.getName() ? select = i : null
    }
    
    mainlt.stringList(players.map(function(p) {return p.name}), select).id("StringPlayer").rx(0, 0).ry(0, 0).rw(0, 70).rh(1, 100).anchor(1, 0)
    
     let play_pause = mainlt.icon(gameData.isContinues ? "pause" : "play").id("play_pause").rx(0.5, 0).ry(0.5, 0).wh(20, 20).anchor(0.5).tooltip((gameData.isContinues ? "Остановить" : "Запустить") + " время");
         play_pause.context("rightload", "skip", "Пропустить стадию", 0xff0000);
         
    let game = mainlt.icon("refresh").id("game_reset").rx(0.5, 15).ry(0.5, -15).wh(20, 20).anchor(0.5).tooltip("Game_reset");
    game.context("solid_dislike", "game_end", "game_end", 0x000088);
    game.context("solid_like", "game_start", "game_start", 0xaf5600);
    
    let tp = mainlt.icon("computer_map").id("tp_player").rx(0.5, 0).ry(0.5, -15).wh(20, 20).anchor(0.5).tooltip("Teleportation");
    tp.context("sphere", "tp_Lobby", "Лобби", 0xe45100);  
    
    let blockBreak = mainlt.icon("tools_tnt").id("blockBreak").rx(0.5, -16).ry(0.5, -15).wh(20, 20).anchor(0.5).tooltip("Разрушение блоков");
    
    let roleChange = mainlt.icon("adminpanel_user").id("roleChange").rx(0.5, 15).ry(0.5, 0).wh(20, 20).anchor(0.5).tooltip("Сменить роль [7\\[[rПКМ[7]");
    roleChange.context("emoji_cool", "roleChange_owner", "owner", 0xe48500);
    roleChange.context("emoji_relaxed", "roleChange_stranger", "stranger", 0x008800);
    roleChange.context("emoji_skull_small", "roleChange_monster", "monster", 0x880000);
    roleChange.context("other_x", "roleChange_", "empty", 0x000000);
    
    let coordCopy = mainlt.icon("material").id("coord").rx(0.5, 0).ry(0.5, 15).wh(20, 20).anchor(0.5).tooltip("Координаты");
    coordCopy.context("block", "block", "Pos Игрока", 0x000000);
    coordCopy.context("visible", "camera", "Pos Взгляда", 0x000000);
    coordCopy.context("block", "blockData", "Дата Блока", 0x000000);
    coordCopy.context("block", "blockMeta", "Мета Блока", 0x000000);
    
    let plData = mainlt.icon("computer_cassete").id("plData").rx(0.5, -16).ry(0.5, 0).wh(20, 20).anchor(0.5).tooltip("Дата игрока");
    plData.context("visible", "block", "Посмотреть", 0x000000);
    
    s.openUI(ui, true);
    entityData.setString("inUI", "ui_admin")
    
    let uiContext = s.getUIContext();
    let data = uiContext.getData();
    data.setString("entities", JSON.stringify(entities.map(function(e) {return e.getUniqueId()})))

    uiContext.sendToPlayer()
}

function handler(c) {try{
    let s = c.getSubject();
    let entityData = s.getEntityData();
    let pos = s.getPosition();
    let ray = s.rayTrace(30);
    let uiContext = c.getSubject().getUIContext();
    if (uiContext.isClosed()) {
        entityData.remove("inUI")
        return
    }
    let key = uiContext.getHotkey();
    let context = uiContext.getContext();
    let data = uiContext.getData();
    let players = Java.from(c.getServer().getAllPlayers())
    let puppet = c.getServer().getPlayer(data.get("StringPlayer"))
    let pupPos = puppet.getPosition()
//    let entitesUUID = JSON.parse(data.getString("entities"))
    let gameData = JSON.parse(c.getServer().getStates().getString("gameData"));
    let playerData = JSON.parse(s.getStates().getString("playerData"));
    
//    let entPuppet, entPupPos
//    if (entitesUUID.length > 0) {
//        entPuppet = c.getServer().getEntity(entitesUUID[data.get("StringEntities.index")])
//        entPupPos = entPuppet.getPosition()
//    }
    
    if (uiContext.getLast() == "clickExit") {
        s.closeUI();
    }
    if (uiContext.getLast() == "play_pause") {
        if (uiContext.get("play_pause").icon == "play") {
            gameData.isContinues = 1;
            uiContext.get("play_pause").icon("pause").tooltip("Остановить время");
        } else {
            gameData.isContinues = 0;
            uiContext.get("play_pause").icon("play").tooltip("Запустить время");
        }
        c.getServer().getStates().setString("gameData", JSON.stringify(gameData))
    }
    if (context == "skip") {
        gameData.time = 0;
        c.getServer().getStates().setString("gameData", JSON.stringify(gameData));
        s.send("DEV: Стадия пропущена");
        s.closeUI();
    }
    if (uiContext.getLast() == "blockBreak") {
        s.getStates().setString("canDestroyBlocks", s.getStates().getString("canDestroyBlocks") == "true" ? "false" : "true");
        s.send("canDestroyBlocks: "+(s.getStates().getString("canDestroyBlocks") == "true" ? "\u00A7aвкл." : "\u00A7cвыкл."))
    }
    if (uiContext.getLast() == "roleChange") {
        s.send("\u00A77Текущая роль: \u00A7r" + playerData.role);
    } else if (context && context.indexOf("roleChange_") === 0) {
        let newRole = context.replace("roleChange_", "");
        playerData.role = newRole;
        s.getStates().setString("playerData", JSON.stringify(playerData));
        s.send("\u00A77Новая роль: \u00A7r" + playerData.role);
    }
    //s.getStates().getString("canDestroyBlocks")
    if (uiContext.getLast() === "StringEntities") {
        uiContext.get("StringEntities").tooltip("x:"+ Math.floor(entPupPos.x) +" y:"+ Math.floor(entPupPos.y) +" z:"+ Math.floor(entPupPos.z))
        if (!entPuppet.isGlowing()) entPuppet.applyPotion(mappet.getPotion("glowing"), 20, 1, false);
    }
    if (key.startsWith("gm_")) {
        puppet.setGameMode(key.split("_")[1])
        puppet.closeUI()
    }
    if (context.startsWith("del_") || uiContext.getLast() == "del_all") {
        let deleteEntCount = 0
        c.getServer().getWorld(0).getEntities(pos.x - 128, pos.y - 128, pos.z - 128, pos.x + 128, pos.y + 128, pos.z + 128, true).forEach(function(ent) {
            if (context == "del_item" && ent.isNPC() && ent.getNpcId() == "item") removeEnt()
            if (context == "del_corpse" && ent.isNPC() && ent.getNpcId() == "corpse") removeEnt()
            if (context == "del_npc" && ent.isNPC() && ent.getNpcId() == "ghost") removeEnt()
            if (uiContext.getLast() == "del_all")  {
                c.executeCommand("/mp npc despawn @e")
                return;
            }
        })
        s.send("\u00A7lDEBUG\u00A7r: Сущностей удалено: "+ deleteEntCount)
    }
//    if (context.startsWith("item_") ) {
//        switch (context) {
//            case "item_delete":
//                entPuppet.remove()
//                c.scheduleScript(1, function (x) {updateEntities(c)})
//                break;
//            case "item_pickup":
//                entPuppet.setPosition(pupPos.x, pupPos.y, pupPos.z)
//                break;
//            case "item_tp":
//                puppet.setPosition(entPupPos.x, entPupPos.y, entPupPos.z)
//                break;
//            case "item_glow":
//                entPuppet.setGlowing(!entPuppet.isGlowing());
//                break;
//            case "item_AI":
//                entPuppet.setAIEnabled(!entPuppet.isAIEnabled());
//                s.send("AI Enabled: "+entPuppet.isAIEnabled());
//                break;
//            case "item_entityData":
//                c.send(entPuppet.getEntityData())
//            break;
//        }
//    }
    if (context.startsWith("tp_") ) {
        let tpPosition = mappet.vector(0, 0, 0)
        switch (context) {
            case "tp_Lobby":
                tpPosition = mappet.vector(-8.5, 22, 26.5)
                break;
        }
        puppet.setPosition(tpPosition.x, tpPosition.y, tpPosition.z)
        puppet.playSound("minecraft:entity.endermen.teleport", tpPosition.x, tpPosition.y, tpPosition.z)
    }
    if (context.startsWith("game_") ) {
        switch (context.split("_")[1]) {
            case "start":
                c.getServer().executeScript("game.js", "main", c)
                break;
            case "end":
                c.getServer().executeScript("game.js", "end", c)
                break;
        }
    }
    if (uiContext.getLast() == "tp_player") {
        s.setPosition(pupPos.x, pupPos.y, pupPos.z)
        s.playSound("minecraft:entity.endermen.teleport", pupPos.x, pupPos.y, pupPos.z)
    }
    if (context == "block") {
        s.setClipboard(Math.floor(pos.x) +", "+ Math.floor(pos.y) +", "+ Math.floor(pos.z));
        s.send("\u00A7lDEBUG\u00A7r: Блок "+ Math.floor(pos.x) +" "+ Math.floor(pos.y) +" "+ Math.floor(pos.z))
    }
    if (context == "camera" && ray.isBlock()) {
        let block = ray.getBlock();
        s.setClipboard(block.x +", "+ block.y +", "+ block.z);
        s.send("\u00A7lDEBUG\u00A7r: Блок взгляда "+ block.x +" "+ block.y +" "+ block.z)
    }
    if (context == "blockData" && ray.isBlock() && c.getWorld().hasTileEntity(ray.getBlock().x, ray.getBlock().y, ray.getBlock().z)) {
        s.setClipboard(c.getWorld().getTileEntity(ray.getBlock().x, ray.getBlock().y, ray.getBlock().z).getData());
        s.send("\u00A7lDEBUG\u00A7r: Нбт Блока " + c.getWorld().getTileEntity(ray.getBlock().x, ray.getBlock().y, ray.getBlock().z).getData());
    }
    if (context == "blockMeta" && ray.isBlock()) {
        s.setClipboard(c.getWorld().getBlock(ray.getBlock().x, ray.getBlock().y, ray.getBlock().z).getMeta());
        s.send("\u00A7lDEBUG\u00A7r: Мета блока " + c.getWorld().getBlock(ray.getBlock().x, ray.getBlock().y, ray.getBlock().z).getMeta());
    }
    
    if (uiContext.getLast() == "btnCopy") {s.setClipboard(".rx("+rx+", "+x+").ry("+ry+", "+y+").rw("+rw+", "+w+").rh("+rh+", "+h+").anchor("+anchorX+", "+anchorY+")")}
    if (uiContext.getLast().startsWith("track")) { rx = data.getDouble("trackrx"), x = data.getDouble("trackx"), ry = data.getDouble("trackry"),y = data.getDouble("tracky"), rw = data.getDouble("trackrw"), w  = data.getDouble("trackw"), rh = data.getDouble("trackrh"), h = data.getDouble("trackh"), anchorX = data.getDouble("trackanchorX"), anchorY = data.getDouble("trackanchorY"), uiContext.get("window").rx(rx, x).ry(ry, y).rw(rw, w).rh(rh, h).anchor(anchorX, anchorY)}
}catch(e){
    // c.send(e)
}}

function updateEntities(c) {
    let players = c.getServer().getAllPlayers()
    let gameData = JSON.parse(c.getServer().getStates().getString("gameData"));
    let entities = [];
    let pos = players[0].getPosition()
    c.getServer().getWorld(0).getEntities(pos.x - 128, pos.y - 128, pos.z - 128, pos.x + 128, pos.y + 128, pos.z + 128, true).forEach(function(ent) {
        if (ent.isNPC() && ent.getNpcId() == "ghost") entities.push(ent)  
    })
    c.getServer().getWorld(0).getEntities(pos.x - 128, pos.y - 128, pos.z - 128, pos.x + 128, pos.y + 128, pos.z + 128, true).forEach(function(ent) {
        if (ent.isNPC() && ent.getNpcId() == "item") entities.push(ent)
    })
    players.forEach(function(player) {
        let entityData = player.getEntityData();
        let pos = player.getPosition();
        let uiContext = player.getUIContext();
        if (!uiContext) return;
        let context = uiContext.getContext();
        let data = uiContext.getData();
        data.setString("entities", JSON.stringify(entities.map(function(e) {return e.getUniqueId()})))
        if (uiContext && entityData.getString("inUI") == "ui_admin") {
            uiContext.get("StringEntities").setValues(entities.map(function(e) {
                let name
                if (e.getNpcId() == "item") {
                    name = tl("item."+ mappet.toNBT(e.getMorph()).getList("BodyParts").getCompound(0).get("Morph").get("Stack").get("id").split(":")[1] , "ru")
                } else {
                    return e.getNpcState()
                }
                if (name == undefined) {
                    return mappet.toNBT(e.getMorph()).getList("BodyParts").getCompound(0).get("Morph").get("Stack").get("id")
                } else {
                    return tl("item."+ mappet.toNBT(e.getMorph()).getList("BodyParts").getCompound(0).get("Morph").get("Stack").get("id").split(":")[1] , "ru")
                }    
            })).selected(data.get("StringEntities.index"))
        }
        uiContext.sendToPlayer()
    })
}