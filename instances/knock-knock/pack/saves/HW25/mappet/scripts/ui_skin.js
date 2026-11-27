let chatColors = {
    "4": { name: "dark_red", hex: 0xAA0000 },
    "c": { name: "red", hex: 0xFF5555 },
    "6": { name: "gold", hex: 0xFFAA00 },
    "e": { name: "yellow", hex: 0xFFFF55 },
    "2": { name: "dark_green", hex: 0x00AA00 },
    "a": { name: "green", hex: 0x55FF55 },
    "b": { name: "aqua", hex: 0x55FFFF },
    "3": { name: "dark_aqua", hex: 0x00AAAA },
    "1": { name: "dark_blue", hex: 0x0000AA },
    "9": { name: "blue", hex: 0x5555FF },
    "d": { name: "light_purple", hex: 0xFF55FF },
    "5": { name: "dark_purple", hex: 0xAA00AA },
    "f": { name: "white", hex: 0xFFFFFF },
    "7": { name: "gray", hex: 0xAAAAAA },
    "8": { name: "dark_gray", hex: 0x555555 },
    "0": { name: "black", hex: 0x000000 }
}

function main(c) {try{
    const baseMorphCompound = mappet.createCompound("{Pose:{Pose:{model:{}}},Transition:{Interp:11,Animates:1b,Duration:8},Skin:[{Path:\"http://ely.by/storage/skins/b24c2896ab75d3972f2cd8b9f49f8aff.png\"},{Path:\"b.a:hw/male_overlay.png\",Erase:1b},{Path:\"b.a:hw/skins/male_0.png\"}],Scale:0.95f,Name:\"chameleon.pl_male\",ForcedSettings:0b}");
    let s = c.getSubject(); 
    let skin = getStateSilently(s, "skin")
    let playerSettings = getStateSilently(s, "settings");

    if (JSON.stringify(skin) == "{}") {
        skin = {
            link : "minecraft:textures/entity/steve.png", 
            modelType : "male",
            uniformSkin : "male_0.png",
            morph : baseMorphCompound
        }
        s.getStates().setString("skin", JSON.stringify(skin))
    }
    let files = getSkinsList(skin)

    let ui = mappet.createUI(c, "handler").background().closable(true);

    let lt = ui.layout();
    lt.current.id("mainMenu").rxy(0.5, 0.5).wh(130, 235).anchor(0.5).visible(true);
    let back = lt.graphics().rxy(0, 0).rwh(1, 1);
    back.rect(0, 0, 1, 1, 0xff191919).rw(1).rh(1, 18);
    back.rect(0, 0, 1, 1, 0xff252525).xy(0, 0).rw(1).h(-15);

    let chatGraf = lt.graphics().rxy(0, 0).rwh(1, 1).id("chatGraf");
    chatGraf.icon("adminpanel_user_message", 9, -7, (0xFF000000 | chatColors[playerSettings.chatColor].hex) >>> 0 , 0.5, 0.5)
    let chatColorBtn = lt.click().id("chatColor").xy(9, -8).wh(18, 18).anchor(0.5).tooltip("Цвет ника")

    Object.keys(chatColors).forEach(function(color){
        chatColorBtn.context("", "color_"+ color, "\u00A7"+ color + chatColors[color].name, chatColors[color].hex)
    });

    lt.icon("close").id("exit").rx(1, -10).ry(0, -7).wh(10, 10).anchor(0.5).tooltip("Закрыть");
    lt.label("Кастомизация").id("lblСustom").
    rx(0.5).y(-2).wh(130, 10).anchor(0.5, 1).labelAnchor(0.5);

    let morphCompound = baseMorphCompound
    morphCompound = editMorph(morphCompound, skin)

    lt.morph(mappet.createMorph(morphCompound)).id("morphPlayer")
    .rxy(0.5, 0).wh(130, 200).anchor(0.5,0).position(0.013, 1.05, -0.01).rotation(3, -29).distance(1.8).fov(70)

    lt.label("Текущий скин").id("lblInfo").
    rx(0.5).y(202).wh(130, 10).anchor(0.5, 0).labelAnchor(0.5);

    let row = lt.row(3, 3)
    row.current.rxy(0.5, 1).wh(95, 30).anchor(0.5, 1).visible(true);
    row.button("Ely").id("elyBtn").anchor(0.5).wh(20, 18).tooltip("Ely.by").background(0x264b24)
    row.button("TL").id("tlBtn").anchor(0.5).wh(20, 18).tooltip("TLauncher").background(0x264b24)
    row.button("URL").id("customBtn").anchor(0.5).wh(20, 18).tooltip("URL").background(0x264b24)
    row.button("").id("modelTypeBtn").rxy(1, 1).anchor(1, 1).wh(20, 18).tooltip("Тип модели").background(0x2D3646)
    lt.graphics().rx(0.5, 35).ry(1, -4).wh(25, 15).anchor(0.5, 1).visible(true).icon("pose", 0, 0, 0xffffffff, 0.5, 0.5).rwh(1, 1).rxy(0.5, 0).anchor(0.5);

    let skinList = lt.stringList(files).id("strings").tooltip("Путь до костюмов " + " \\config\\blockbuster\\models\\hw\\skins");
    skinList.rx(1).ry(1, -19).wh(100, 70).anchor(0, 0).background(0xff191919).visible(false)
    lt.button("Лицензия").id("licBtn").rx(0, 20).ry(1).anchor(0, 0).wh(66, 15).tooltip("Лиценизя").background(0x264b24)
    lt.button("").id("skinTypeBtn").rx(0, 89).ry(1).anchor(0, 0).wh(20, 15).tooltip("Костюм").background(0x2D3646)
    lt.graphics().rx(0.5, 33).ry(1, 16).wh(20, 15).anchor(0.5, 1).visible(true).icon("other_hanger", 0, 0, 0xffffffff, 0.5, 0.5).rwh(1, 1).rx(0.5).y(-1).anchor(0.5);

    c.getSubject().openUI(ui);
    }catch(e) {
        // c.send(e)
    }
    }

function handler(c) {try{
    const modelTypes = ["male", "female", "slim"];
    const baseMorphCompound = mappet.createCompound("{Pose:{Pose:{model:{}}},Transition:{Interp:11,Animates:1b,Duration:8},Skin:[{Path:\"http://ely.by/storage/skins/b24c2896ab75d3972f2cd8b9f49f8aff.png\"},{Path:\"b.a:hw/male_overlay.png\",Erase:1b},{Path:\"b.a:hw/skins/male_0.png\"}],Scale:0.95f,Name:\"chameleon.pl_male\",ForcedSettings:0b}");
    let morphCompound = baseMorphCompound
    let s = c.getSubject();
    let pos = s.getPosition();
    let skin = JSON.parse(s.getStates().getString("skin"));
    let playerSettings = JSON.parse(s.getStates().getString("settings"));
    let uiContext = s.getUIContext();
    let context = uiContext.getContext();
    let data = uiContext.getData();

    if (uiContext.isClosed()) {
        morphCompound = editMorph(morphCompound, skin)
        if (mappet.toNBT(s.getMorph()) == null || !mappet.toNBT(s.getMorph()).equals(morphCompound)) {
            s.setMorph(null)
            s.setMorph(mappet.createMorph(morphCompound))
        } 
    }
    if (context.startsWith("color_") ) {
        playerSettings.chatColor = context.split("_")[1]
        s.getStates().setString("settings", JSON.stringify(playerSettings))
        uiContext.get("chatGraf").removeAll()
        uiContext.get("chatGraf").icon("adminpanel_user_message", 9, -7, (0xFF000000 | chatColors[context.split("_")[1]].hex) >>> 0 , 0.5, 0.5)

    }
    if (uiContext.getLast() === "exit") {
        if (!s.getStates().has("skin")) {
            uiContext.get("exit").tooltip("скин не применился");
            s.playSound("mp.sounds:hnt.ui.ui_camfull", pos.x, pos.y, pos.z, 0.8, 1);
        } else {
            s.closeUI()
        }
    }
    if (uiContext.getLast() === "elyBtn") {
        let skinEly = getSkin(s.getName(), "ely");
        if (JSON.stringify(skinEly.json) == "{}" || skinEly.json === undefined) {
            skinEly = getSkin(c.getPlayer().getName(), "");
            s.playSound("mp.sounds:hnt.ui.ui_camfull", pos.x, pos.y, pos.z, 1, 0.8);
        }
        skin.link = skinEly.getLink();
        morphCompound = editMorph(morphCompound, skin)
        skin.morph = morphCompound.stringify()
        s.getStates().setString("skin", JSON.stringify(skin))
        uiContext.get("morphPlayer").morph(mappet.createMorph(morphCompound))
    }
    if (uiContext.getLast() === "licBtn") {
        let skinLicense = getSkin(s.getName(), "license");
        
        if (JSON.stringify(skinLicense.json) == "{}" || skinLicense.json === undefined) {
            skinLicense = getSkin(c.getPlayer().getName(), "");
            s.playSound("mp.sounds:hnt.ui.ui_camfull", pos.x, pos.y, pos.z, 1, 0.8);
        }
        
        skin.link = skinLicense.getLink();
        morphCompound = editMorph(morphCompound, skin)
        skin.morph = morphCompound.stringify()
        
        s.getStates().setString("skin", JSON.stringify(skin))
        uiContext.get("morphPlayer").morph(mappet.createMorph(morphCompound))
    }
    if (uiContext.getLast() === "tlBtn") {
        let skinTL = getSkin(s.getName(), "tl");
        if (JSON.stringify(skinTL.json) == "{}" || skinTL.json === undefined) {
            skinTL = getSkin(c.getPlayer().getName(), "");
            s.playSound("mp.sounds:hnt.ui.ui_camfull", pos.x, pos.y, pos.z, 1, 0.8);
        }
        skin.link = skinTL.getLink();
        morphCompound = editMorph(morphCompound, skin)
        skin.morph = morphCompound.stringify()
        s.getStates().setString("skin", JSON.stringify(skin))
        uiContext.get("morphPlayer").morph(mappet.createMorph(morphCompound))
    }
    if (uiContext.getLast() === "customBtn") {
        s.getClipboard(function (clipboard) {
            if (clipboard == "") {return}
            if (clipboard.length > 300) {return}
            skin.link = clipboard
            morphCompound = editMorph(morphCompound, skin)
            skin.morph = morphCompound.stringify()
            s.getStates().setString("skin", JSON.stringify(skin))
            uiContext.get("morphPlayer").morph(mappet.createMorph(morphCompound))
            uiContext.sendToPlayer();
            s.send("Скин по URL: "+ clipboard)
        });
    }
    if (uiContext.getLast() === "modelTypeBtn") {
        let currentIndex = modelTypes.indexOf(skin.modelType);  
        if (currentIndex === -1) {
            currentIndex = 0;
        } else {
            currentIndex = (currentIndex + 1) % modelTypes.length;
        } 
        skin.modelType = modelTypes[currentIndex];  
        
        let files = getSkinsList(skin)
        skin.uniformSkin = files[0]
        morphCompound = editMorph(morphCompound, skin)
        skin.morph = morphCompound.stringify()
        s.getStates().setString("skin", JSON.stringify(skin))
        uiContext.get("morphPlayer").morph(mappet.createMorph(morphCompound))
        uiContext.get("strings").setValues(files).selected(0)
    }
    if (uiContext.getLast() === "strings") {
        skin = JSON.parse(s.getStates().getString("skin"));
        let uniformLink = data.getString("strings")
        morphCompound = editMorph(morphCompound, skin)
        morphCompound.getList("Skin").getCompound(2).setString("Path", "c.s:pl_"+ skin.modelType +"/skins/"+ uniformLink)
        skin.morph = morphCompound.stringify()
        skin.uniformSkin = uniformLink
        s.getStates().setString("skin", JSON.stringify(skin))
        uiContext.get("morphPlayer").morph(mappet.createMorph(morphCompound))
    }
    if (uiContext.getLast() === "skinTypeBtn") {
        if (uiContext.get("strings").visible) {
            uiContext.get("strings").visible(false)
        } else {
            uiContext.get("strings").visible(true)
        }
    }

}catch(e) {
    // c.send(e)
}
}

function editMorph(morphCompound, skin) {
    morphCompound.setString("Name", "chameleon.pl_"+ skin.modelType)
    morphCompound.getList("Skin").getCompound(0).setString("Path", skin.link)
    morphCompound.getList("Skin").getCompound(1).setString("Path", "c.s:pl_"+ skin.modelType +"/skins/"+ skin.modelType +"_overlay.png")
    morphCompound.getList("Skin").getCompound(2).setString("Path", "c.s:pl_"+ skin.modelType +"/skins/"+ skin.uniformSkin)
    return morphCompound
}