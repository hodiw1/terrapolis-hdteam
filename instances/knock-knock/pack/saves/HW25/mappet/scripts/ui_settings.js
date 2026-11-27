function main(c) {try {
    let player = c.getPlayer();
    let pos = player.getPosition();
    let entityData = player.getEntityData();
    
    if (entityData.has("interactCooldown")) return;
    if (mappet.vector(-10.5, 23, 24.5).distance(player.getPosition()) > 1.5) return;
    
    let customGameSetting;
    if (JSON.stringify(getStateSilently(c.getServer(), "customGameSetting")) === '{}') {
        customGameSetting = difficultySettings;
        c.getServer().getStates().setString("customGameSetting", JSON.stringify(customGameSetting))
    } else {
        customGameSetting = getStateSilently(c.getServer(), "customGameSetting");
    }

    let ui = mappet.createUI(c, "handler").background().closable(true);
    
    ui.label("Нажмите, чтобы закрыть...").color(0x505050).rx(0.5, 0).ry(0.5, 100).wh(100, 8).anchor(0.5).labelAnchor(0.5);
    ui.click().id("clickExit").rxy(0.5, 0.5).rwh(1, 1).anchor(0.5).enabled(true);
    ui.click().id("unclick").rxy(0.5, 0.5).wh(150, 150).anchor(0.5).enabled(true);
    
    let lt = ui.layout();
    lt.current.id("mainMenu").rxy(0.5, 0.5).wh(150, 150).anchor(0.5).visible(true);//106
    
    let back = lt.graphics().rxy(0, 0).rwh(1, 1);
    back.rect(0, 0, 1, 1, 0x75000000).rw(1).rh(1, 0);
    
    lt.label("Настройки").rx(0.5, 0).ry(0, 8).anchor(0.5).labelAnchor(0.5);
    
    //------------------------------SETTINGS---------------------------------------------   
    let ltSettings = lt.layout();
    ltSettings.current.id("ltSettings").rx(0.5, 0).ry(0.5).wh(150, 150).anchor(0.5).visible(true);

    ltSettings.icon("refresh").id("refreshSett").rx(1, -10).ry(0, 2).rw(0, 10).rh(0, 10).anchor(0.5, 0).tooltip("Сбросить", 3)

    let clmnSettings = ltSettings.column(2);
    clmnSettings.current.scroll().rx(0.5).ry(0.5, 5).rw(1, -10).rh(0, 130).anchor(0.5);

    let ltStat = clmnSettings.layout()
    ltStat.current.id("ltStat.owner").rxy(0.5, 0.5).wh(100, 27).anchor(0.5).visible(true);
    ltStat.label("Хозяин дома").rx(0.5, 0).ry(0.28, 0).rw(0, 100).rh(0, 15).anchor(0.5, 0.5).labelAnchor(0.5, 0.5).color(0x898b8a).tooltip("Кто будет хозяином дома?", 1)
    ltStat.graphics().rx(0.5, 0).ry(1, 0).rw(0, 100).rh(0, 15).anchor(0.5, 1).rect(0, 0, 1, 1, 0xff181d19).rwh(1, 1);
    ltStat.label(customGameSetting.owner).id("settInfo.owner").rx(0.5, 0).ry(0.76, 1).rw(1, 0).rh(0, 15).anchor(0.5, 0.5).labelAnchor(0.5, 0.5)
    
    ltStat.click().id("settOwRight").rx(1, -21).ry(1, 0).rw(0, 10).rh(0, 15).anchor(1, 1)
    ltStat.label("→").id("lblSettRight").rx(1, -19).ry(1, 1).rw(0, 10).rh(0, 15).anchor(1, 1).labelAnchor(0.5, 0.5)
    ltStat.graphics().rx(1, -20).ry(1, 0).rw(0, 10).rh(0, 15).anchor(1, 1).rect(0, 0, 1, 1, 0x38000000).rwh(1, 1).hoverOnly()
        
    ltStat.click().id("settOwLeft").rx(0, 20).ry(1, 0).rw(0, 10).rh(0, 15).anchor(0, 1)
    ltStat.label("←").id("lblSettLeft").rx(0, 20).ry(1, 1).rw(0, 10).rh(0, 15).anchor(0, 1).labelAnchor(0.5, 0.5)
    ltStat.graphics().rx(0, 20).ry(1, 0).rw(0, 10).rh(0, 15).anchor(0, 1).rect(0, 0, 1, 1, 0x38000000).rwh(1, 1).hoverOnly()
    //ltStat.textbox(customGameSetting.owner).id("settInfo.owner").tooltip("Имя хозяина").rx(0.5, 0).ry(1, 0).rw(0, 100).rh(0, 15).anchor(0.5, 1);
    
    let ltStat2 = clmnSettings.layout()
    ltStat2.current.id("ltStat.startAmmo").rxy(0.5, 0.5).wh(100, 17).anchor(0.5).visible(true);
//    ltStat2.label("Стартовые патроны").rx(0.5, 0).ry(0.28, 0).rw(0, 100).rh(0, 15).anchor(0.5, 0.5).labelAnchor(0.5, 0.5).color(0x898b8a).tooltip("Появятся ли в начале игры патроны у хозяина", 1)
    ltStat2.toggle("Стартовые патроны", customGameSetting.startAmmo ? true : false).id("settInfo.startAmmo").rx(0.5, 0).ry(1, 0).rw(0, 122).rh(0, 15).anchor(0.5, 1).color(0x898b8a, false).tooltip("Появятся ли в начале игры патроны у хозяина", 1);


    for (let i = 0; i < Object.keys(difficultyCustomSetting).length; i++) {
        let currSett = Object.keys(difficultyCustomSetting)[i]
        let ltStat = clmnSettings.layout()
        ltStat.current.id("ltStat." + currSett).rxy(0.5, 0.5).wh(100, 27).anchor(0.5).visible(true);
        ltStat.label(difficultyCustomSetting[currSett][3].split("#")[0]).rx(0.5, 0).ry(0.28, 0).rw(0, 100).rh(0, 15).anchor(0.5, 0.5).labelAnchor(0.5, 0.5).color(0x898b8a).tooltip(difficultyCustomSetting[currSett][3].split("#")[1], 0)
        ltStat.graphics().rx(0.5, 0).ry(1, 0).rw(0, 100).rh(0, 15).anchor(0.5, 1).rect(0, 0, 1, 1, 0xff181d19).rwh(1, 1);

        try {
            if (["nigthTime", "dayTime"].indexOf(currSett) !== -1) {
                ltStat.label(Number((customGameSetting[currSett] / 60).toFixed(2)) + " " + difficultyCustomSetting[currSett][2]).id("settInfo." + currSett).rx(0.5, 0).ry(0.76, 1).rw(1, 0).rh(0, 15).anchor(0.5, 0.5).labelAnchor(0.5, 0.5)
            } else if (currSett == "freezingSpeed") {
                ltStat.label(customGameSetting[currSett].toFixed(1) + " " + difficultyCustomSetting[currSett][2]).id("settInfo." + currSett).rx(0.5, 0).ry(0.76, 1).rw(1, 0).rh(0, 15).anchor(0.5, 0.5).labelAnchor(0.5, 0.5)
            } else {
                ltStat.label(customGameSetting[currSett] + " " + difficultyCustomSetting[currSett][2]).id("settInfo." + currSett).rx(0.5, 0).ry(0.76, 1).rw(1, 0).rh(0, 15).anchor(0.5, 0.5).labelAnchor(0.5, 0.5)
            }
        } catch (e) {}
    
        ltStat.click().id("settRight." + currSett).rx(1, -20).ry(1, 0).rw(0, 10).rh(0, 15).anchor(1, 1)
        ltStat.label("→").id("lblSettRight").rx(1, -19).ry(1, 1).rw(0, 10).rh(0, 15).anchor(1, 1).labelAnchor(0.5, 0.5)
        ltStat.graphics().rx(1, -20).ry(1, 0).rw(0, 10).rh(0, 15).anchor(1, 1).rect(0, 0, 1, 1, 0x38000000).rwh(1, 1).hoverOnly()
        
        ltStat.click().id("settLeft." + currSett).rx(0, 20).ry(1, 0).rw(0, 10).rh(0, 15).anchor(0, 1)
        ltStat.label("←").id("lblSettLeft").rx(0, 21).ry(1, 1).rw(0, 10).rh(0, 15).anchor(0, 1).labelAnchor(0.5, 0.5)
        ltStat.graphics().rx(0, 20).ry(1, 0).rw(0, 10).rh(0, 15).anchor(0, 1).rect(0, 0, 1, 1, 0x38000000).rwh(1, 1).hoverOnly()
    }
    
    let ltStat3 = clmnSettings.layout();
    ltStat3.current.id("ltStat.monstersKill").rxy(0.5, 0.5).wh(100, 17).anchor(0.5).visible(true);
    ltStat3.toggle("Убийство нечисти", customGameSetting.monstersKill ? true : false).id("settInfo.monstersKill").rx(0.5, 0).ry(1, 0).rw(0, 122).rh(0, 15).anchor(0.5, 1).color(0x898b8a, false).tooltip("Будет ли уменьшаться общее количество нечисти при убийстве дробовиком. \n[7(Если убить всю нечисть, она больше не появится до конца игры)", 1);

    
    
    if (c.getServer().getStates().getString("!settingsOccupied") != "") return;
    
    entityData.setString("inUI", "settings")
    c.getServer().getStates().setString("!settingsOccupied", player.getName());
    player.openUI(ui);
    player.playSound("mp.sounds:hnt.items.drivlic_pickup", pos.x, pos.y, pos.z, 1, 1.5);
    playSoundToPlayers(c, "mp.sounds:trs.entity.ghost_door", pos, "block", 0.5, 1.5);
    c.getSubject().setMorph(mappet.createMorph(morphSettings[1]));
} catch (e) {c.send(e)}}

function handler(c) {try{
    let world = c.getServer().getWorld(0);
    let s = c.getSubject();
    let entityData = s.getEntityData();
    let pos = s.getPosition();
    let uiContext = s.getUIContext();
    let key = uiContext.getHotkey();
    let data = uiContext.getData()
    let customGameSetting = JSON.parse(c.getServer().getStates().getString("customGameSetting"));
    let last = uiContext.getLast();
    let players = c.getServer().getAllPlayers();

    if (uiContext.isClosed()) {
        changeSettingsMorph(c);
        entityData.remove("inUI")
        s.sendActionBar("[\u00A76TAB\u00A7r] Начать игру");
    }

    if (last == "clickExit") {
        s.closeUI();
        s.playSound("mp.sounds:trs.ui.skillcheck_done", pos.x, pos.y, pos.z, 0.5, 1.5);
    } 

    if (last == "refreshSett") {
        applySettings(difficultySettings)
        c.getServer().getStates().setString("customGameSetting", JSON.stringify(customGameSetting))
        
        uiContext.get("settInfo.owner").label(customGameSetting.owner);
        uiContext.get("settInfo.startAmmo").state(customGameSetting.startAmmo);
        uiContext.get("settInfo.monstersKill").state(customGameSetting.monstersKill);
        
        s.playSound("mp.sounds:trs.ui.skillcheck", pos.x, pos.y, pos.z, 0.5, 1.9);
        
        for (let i = 3; i < Object.keys(customGameSetting).length; i++) {
            let currSett = Object.keys(customGameSetting)[i]
            if (["nigthTime", "dayTime"].indexOf(currSett) !== -1) {
                uiContext.get("settInfo." + currSett).label(Number((customGameSetting[currSett] / 60).toFixed(2)) + " " + difficultyCustomSetting[currSett][2]);
            } else if (currSett == "freezingSpeed") {
                uiContext.get("settInfo." + currSett).label(customGameSetting[currSett].toFixed(1) + " " + difficultyCustomSetting[currSett][2]);
            } else {
                uiContext.get("settInfo." + currSett).label(customGameSetting[currSett] + " " + difficultyCustomSetting[currSett][2]);
            }
        }
    }
    

    if (last == "settOwRight" || last == "settOwLeft") {
        let playerNames = ["Случайно"];
        for (var i = 0; i < players.size(); i++) {
            playerNames.push(players.get(i).getName());
        }
        var currentOwner = customGameSetting.owner || "Случайно";
        var idx = 0;
        for (var i = 0; i < playerNames.length; i++) {
            if (playerNames[i] == currentOwner) {
                idx = i;
                break;
            }
        }
        if (last == "settOwRight") {
            idx = idx + 1 >= playerNames.length ? 0 : idx + 1;
        } else {
            idx = idx - 1 < 0 ? playerNames.length - 1 : idx - 1;
        }
        customGameSetting.owner = playerNames[idx]
        uiContext.get("settInfo.owner").label(customGameSetting.owner);
        c.getServer().getStates().setString("customGameSetting", JSON.stringify(customGameSetting))
        s.playSound("mp.sounds:trs.ui.comp_key"+Math.floor(mappet.random(1,3)), pos.x, pos.y, pos.z, 0.2, 0.5);
    }

    if (last.startsWith("settLeft.") || last.startsWith("settRight.")) {
        let currSett = last.split(".")[1];
        let mouseButton = data.getList(last).getFloat(4)
        if (last.split(".")[0] == "settLeft") {
            customGameSetting[currSett] = Math.max(customGameSetting[currSett] - difficultyCustomSetting[currSett][0] * (mouseButton == 1 ? 3 : mouseButton == 2 ? 10 : 1), difficultyCustomSetting[currSett][1][0]);
        } else {
            customGameSetting[currSett] = Math.min(customGameSetting[currSett] + difficultyCustomSetting[currSett][0] * (mouseButton == 1 ? 3 : mouseButton == 2 ? 10 : 1), difficultyCustomSetting[currSett][1][1]);
        }

        if (["nigthTime", "dayTime"].indexOf(currSett) !== -1) {
            uiContext.get("settInfo." + currSett).label(Number((customGameSetting[currSett] / 60).toFixed(2)) + " " + difficultyCustomSetting[currSett][2]);
        } else {
            customGameSetting.freezingSpeed = Math.round(customGameSetting.freezingSpeed * 10) / 10
            uiContext.get("settInfo." + currSett).label(customGameSetting[currSett] + " " + difficultyCustomSetting[currSett][2]);
        }

        s.playSound("mp.sounds:trs.ui.comp_key"+Math.floor(mappet.random(1,3)), pos.x, pos.y, pos.z, 0.2, 1);
        
        c.getServer().getStates().setString("customGameSetting", JSON.stringify(customGameSetting))
    }

    if (last == "settInfo.startAmmo") {
        customGameSetting.startAmmo = uiContext.get("settInfo.startAmmo").state ? 0 : 1;
        c.getServer().getStates().setString("customGameSetting", JSON.stringify(customGameSetting))
        s.playSound("mp.sounds:hnt.items.ammo_pickup", pos.x, pos.y, pos.z, 0.4, 1);
    }
    
    if (last == "settInfo.monstersKill") {
        customGameSetting.monstersKill = uiContext.get("settInfo.monstersKill").state ? 0 : 1;
        c.getServer().getStates().setString("customGameSetting", JSON.stringify(customGameSetting))
        s.playSound("mp.sounds:trs.entity.ghost_appear", pos.x, pos.y, pos.z, 0.2, 1);
    }

    if (last == "settInfo.owner") {
        c.send(data.getString("settInfo.owner"))
        customGameSetting.owner = data.getString("settInfo.owner")
        c.getServer().getStates().setString("customGameSetting", JSON.stringify(customGameSetting))
    }

    function applySettings(settings) {
        for (let setting in settings) {
            customGameSetting[setting] = settings[setting];
        }
    }
}catch(e) {c.send(e)}    }

function changeSettingsMorph(c){
    if (c.getServer().getEntities("@e[mpid=start]").size() > 0) {
        c.getServer().getStates().reset("!settingsOccupied");
        Java.from(c.getServer().getEntities("@e[mpid=start]"))[0].setMorph(mappet.createMorph(morphSettings[0]));
        playSoundToPlayers(c, "mp.sounds:trs.entity.ghost_door", mappet.vector(-11, 23, 24), "block", 0.5, 1.2);
    }
}