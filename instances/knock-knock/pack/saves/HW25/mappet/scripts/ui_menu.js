function main(c) {
    let players = c.getServer().getAllPlayers();

    let player = c.getSubject();
    let settings = getStateSilently(player, "settings")
    let entityData = player.getEntityData();
    let pos = player.getPosition();
    
    let ui = mappet.createUI(c, "handler").background().closable(true);
    
    ui.getCurrent().keybind(15, "exit", "exit ui");
    
    ui.label("Нажмите, чтобы закрыть...").color(0x505050).rx(0.5, 0).ry(0.5, 100).wh(100, 8).anchor(0.5).labelAnchor(0.5);
    ui.click().id("clickExit").rxy(0.5, 0.5).rwh(1, 1).anchor(0.5).enabled(true);
    
    let lt = ui.layout();
    lt.current.id("mainMenu").rxy(0.5, 0.5).wh(140, 80).anchor(0.5).visible(true);//106
    
    let back = lt.graphics().rxy(0, 0).rwh(1, 1);
    back.rect(0, 0, 1, 1, 0xff191919).rw(1).rh(1, 0);
    back.rect(0, 0, 1, 1, 0xff252525).xy(0, 0).rw(1).h(18);
    
    lt.label("[7"+ "Игроков онлайн" +": [r" + c.getServer().getAllPlayers().length).id("lbOnline").rx(0, 5).ry(0, 13).rw(0, 100).rh(0, 15).anchor(0, 0.5);
    
    let btnSkin = lt.button("Кастомизация").id("btnSkin");
    btnSkin.background(0x575757).rx(0.5, 0).ry(0.5, -3).wh(90, 20).anchor(0.5, 0.5).enabled(c.getServer().getStates().getString("!gameStatus") != "end" ? false : true);
    
    let lblGame;
    if (c.getServer().getStates().getNumber("gameVoted") > 0) {
        lblGame = "\u00A77"+ (player.getStates().has("gameVoted") ? "Ожидание" : "Голосовать")  +": \u00A7r"+ c.getServer().getStates().getNumber("gameVoted") + "\u00A77/" + players.length;
    } else {
        lblGame = c.getServer().getStates().getString("!gameStatus") != "end" ? "Завершить игру" : "Начать игру";
    }
    
    lt.button(lblGame).id("btnGame").background(player.getStates().has("gameVoted") ? 0x6c4545 : 0x976767).rx(0.5, 0).ry(0.5, 20).wh(90, 20).anchor(0.5, 0.5).enabled(true);//c.getServer().getStates().has("!GAME_STATUS")
    lt.click().id("btnGameBlock").rx(0.5, 0).ry(0.5, 20).wh(90, 20).anchor(0.5, 0.5).enabled(player.getStates().has("gameVoted"));
    
    lt.icon("gear").id("settings")
    .rx(1, 0).ry(1, 0).wh(16, 16).anchor(1, 1)
    .enabled(true).tooltip("Настройки");
    
    let ltSett = lt.layout();
    ltSett.current.id("ltSett").rx(1, 3).ry(1, 0).wh(16, 48).anchor(0, 1).visible(false);
    
    ltSett.graphics().rxy(0, 0).rwh(1, 1).rect(0, 0, 1, 1, 0xff191919).rw(1, 0).rh(1, 0);
    ltSett.graphics().rxy(0, 0).rwh(1, 1).shadow(0xff191919, 0x00000000, 2).rw(1).rh(1);
    
    ltSett.icon("particle").id("ambientSnow").rx(0.5, 0).ry(1, -25).wh(16, 16).anchor(0.5, 1)
    .enabled(true).tooltip("[7Частицы снега[r "+(settings.ambientSnow ? "вкл. " : "[8выкл."), 2);
    
    ltSett.icon("device_mouse").id("interactTooltip").rx(0.5, 0).ry(1, -5).wh(16, 16).anchor(0.5, 1)
    .enabled(true).tooltip("[7Подсказки взаимодействия[r "+(settings.interactTooltip ? "вкл. " : "[8выкл."), 2);
    
    player.playSound("mp.sounds:trs.ui.comp_enter", pos.x, pos.y, pos.z, 1.0, 1.5);
    player.openUI(ui);
    entityData.setString("inUI", "gameMenu");
}

function handler(c) {
    let players = c.getServer().getAllPlayers()

    let player = c.getSubject();
    let settings = getStateSilently(player, "settings")
    let entityData = player.getEntityData();
    let pos = player.getPosition();

    let uiContext = player.getUIContext();
    let key = uiContext.getHotkey();
    
    if (uiContext.isClosed()) {
        entityData.remove("inUI");
        return;
    }
    if (uiContext.getLast() == "settings") {
        if (uiContext.get("ltSett").visible) {
            uiContext.get("ltSett").visible(false)
            uiContext.get("settings").icon("gear")
        } else {
            uiContext.get("ltSett").visible(true)
            uiContext.get("settings").icon("leftload")
        }
        btnSound()
    }  
    if (uiContext.getLast() == "ambientSnow") {
        settings.ambientSnow ? settings.ambientSnow = 0 : settings.ambientSnow = 1
        player.getStates().setString("settings", JSON.stringify(settings))
        uiContext.get("ambientSnow").tooltip("[7Частицы снега[r "+(settings.ambientSnow ? "вкл. " : "[8выкл."), 2);
        btnSound()
    }  
    if (uiContext.getLast() == "interactTooltip") {
        settings.interactTooltip ? settings.interactTooltip = 0 : settings.interactTooltip = 1
        player.getStates().setString("settings", JSON.stringify(settings))
        uiContext.get("interactTooltip").tooltip("[7Подсказки взаимодействия[r "+(settings.interactTooltip ? "вкл. " : "[8выкл."), 2);
        btnSound()
    }  
    if (uiContext.getLast() == "clickExit" || key == "exit") {
        player.closeUI();
        btnSound()
    }  
    if (uiContext.getLast() == "btnSkin") {
        player.closeUI();
        btnSound()
        player.executeScript("ui_skin.js");
    }  
    if (uiContext.getLast() == "btnGame") {
        player.closeUI();
        btnSound()
        player.getStates().setNumber("gameVoted", 1);
        c.getServer().getStates().add("gameVoted", 1);
        if (c.getServer().getStates().getNumber("gameVoted") >= players.length) {
            uiContext.get("btnGameBlock").enabled(true);

            c.getServer().getStates().reset("gameVoted");
            players.forEach(function(p) {
                p.closeUI();
                let pos = p.getPosition();
                p.getStates().reset("gameVoted");
                p.sendActionBar("\u00A77"+ (c.getServer().getStates().getString("!gameStatus") == "end" ? "Начинаем игру..." : "Возвращение в лобби..."));
                p.playSound("mp.sounds:trs.ui.skillcheck_done", pos.x, pos.y, pos.z, 0.5, 0.8);
            })
            c.getServer().executeScript("game.js", c.getServer().getStates().getString("!gameStatus") != "end" ? "end" : "start");
        } else {
            players.forEach(function(p) {
                let entityData = p.getEntityData();
                let pos = p.getPosition();
                if (entityData.get("inUI") == "gameMenu") {
                    let uiContext = p.getUIContext();
                    uiContext.get("btnGame").label("\u00A77"+ (p.getStates().has("gameVoted") ? "Ожидание" : "Голосовать")  +": \u00A7r"+ c.getServer().getStates().getNumber("gameVoted") + "\u00A77/" + players.length);
                    uiContext.sendToPlayer();
                }
                p.sendActionBar("\u00A7" + getStateSilently(player, "settings").chatColor + player.getName() + "\u00A7r " + "голосует за " + (c.getServer().getStates().getString("!gameStatus") != "end" ? "завершение" : "запуск") + " игры" + " \u00A77(\u00A7r" + c.getServer().getStates().getNumber("gameVoted") + " \u00A77/ " + players.length + ")");
                p.playSound("mp.sounds:trs.ui.skillcheck", pos.x, pos.y, pos.z, 0.5, 1.3);
            })
        }
    }
    function btnSound() {
        player.playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z, 0.5, 1.2);
        player.playSound("mp.sounds:trs.ui.comp_key3", pos.x, pos.y, pos.z, 1.0, 1.3);
    }
}