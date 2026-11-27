var names = {
    1: {
        name: "[cNazzy",
        description: "Автор режима",
        morph: "{Pose:{Pose:{right_knee:{},right_arm:{},left_leg:{},torso:{},left_hand:{},right_elbow:{},left_knee:{},left_elbow:{},head:{},left_arm:{},right_leg:{},right_hand:{},model:{RY:-0.1f}}},Skin:\"b.a:hw/skins/nazzy.png\",Name:\"chameleon.pl_male\",ForcedSettings:0b}",
        youtube: "https://www.youtube.com/@NazzyChannel",
        discord: "https://discord.gg/pgxw3he",
        telegram: "https://t.me/nazzy_ch",
    },
    2: {
        name: "[2Tinpis",
        description: "Техническая часть",
        youtube: "https://www.youtube.com/@tinpis1533",
        morph: "{Pose:{Pose:{right_knee:{},right_arm:{},left_leg:{},torso:{},left_hand:{},right_elbow:{},left_knee:{},left_elbow:{},head:{},left_arm:{},right_leg:{},right_hand:{},model:{RY:0.17453294f}}},Skin:\"b.a:hw/skins/tinpis.png\",Name:\"chameleon.pl_male\",ForcedSettings:0b}"
    },
    3: {
        name: "[6VikosIII",
        description: "Создание моделей \n[7Создание текстур[r\nДекор локации",
        morph: "{Pose:{Pose:{head:{},right_knee:{},right_arm:{},left_leg:{},torso:{},left_arm:{},right_leg:{},model:{RY:0.08726647f},right_elbow:{},left_knee:{},left_elbow:{}}},Skin:\"b.a:hw/skins/vikoslll.png\",Name:\"chameleon.pl_female\",ForcedSettings:0b}",
        youtube: "https://www.youtube.com/@VikosIII",
        discord: "https://discord.com/invite/yMFRQ8q",
        telegram: "https://t.me/VIKOSIII",
    },
    4: {
        name: "[3Kryystll",
        description: "Создание моделей \n[7Декор локации",
        morph: "{Skin:\"b.a:hw/skins/kryystll.png\",Name:\"chameleon.pl_male\",ForcedSettings:0b}",
        youtube: "https://www.youtube.com/@KRYYSTLL",
        telegram: "https://t.me/kryystll001",
    }
};
var maxNumber = Object.keys(names).length

function main(c) {
    var player = c.getPlayer();
    let pos = player.getPosition();
    let ui = mappet.createUI(c, "handler").background().closable(true);
    
    ui.getCurrent().keybind(15, "exit", "exit ui");
    
    let lt = ui.layout();
    lt.current.id("ltMain").rxy(0.5, 0.5).wh(200, 80).anchor(0.5).visible(true);
    
    let back = lt.graphics().rxy(0, 0).rwh(1, 1);
    back.rect(0, 0, 1, 1, 0xff202020).rw(1).rh(1, 18);
    back.rect(0, 0, 1, 1, 0xff303030).xy(0, 0).rw(1).h(-18);
    back.rect(0, 0, 1, 1, 0xff151515).wh(80, 80).rx(0, 5).ry(0, 10)
    
    let num = 1;
    
    lt.label("[7Создатели режима").id("title")
    .rx(0, 6).ry(0, -9).anchor(0.5).labelAnchor(0, 0.5); //title
    
    lt.icon("close").id("clickExit").rx(1, -10).ry(0, -9).wh(10, 10).anchor(0.5);
    
    lt.morph(mappet.createMorph(names[num].morph)).id("morph")
    .wh(80, 80).rx(0.0, 5).ry(0, 10).position(0, 1.5, 0.8).distance(0.8).fov(50).enabled(false); //morph
    
    lt.label(names[num].name).id("lblName")
    .rx(0.5, -8).ry(0.5, -25).anchor(0.5).labelAnchor(0, 0.5); //name
    
    let media = lt.row(0, 0);
    media.getCurrent().rx(1, -8).ry(0.5, -26).wh(45, 20).anchor(1, 0.5)
    media.icon("youtube").id("icYoutube").rx(0, 0).ry(0.5, 0).wh(10, 10).anchor(0.5).enabled(true);
    media.icon("discord").id("icDiscord").rx(0.5, 0).ry(0.5, 0).wh(10, 10).anchor(0.5).enabled(true);
    media.icon("telegram").id("icTelegram").rx(1, 0).ry(0.5, 0).wh(10, 10).anchor(0.5).enabled(true);
    
    let scroll = lt.column(0, 0);
    scroll.getCurrent().scroll().rx(1, 0).ry(0.5, 10).wh(108, 50).anchor(1, 0.5);
    let text = scroll.text(names[num].description).id("slDescription");
    
    let trackpad = lt.layout();
    trackpad.current.id("pTrackpad").rx(0.5, 40).ry(1, 3).wh(100, 15).anchor(0.5).visible(true);
    trackpad.graphics().rxy(0, 0).rwh(1, 1).rect(0, 0, 1, 1, 0xff151515).rw(1).rh(1);
    
    trackpad.click().id("pgRight").rx(1, 0).ry(1, 0).rw(0, 10).rh(0, 15).anchor(1, 1)
    trackpad.label(">").id("lbltpRight").rx(1, 1).ry(1, 1).rw(0, 10).rh(0, 15).anchor(1, 1).labelAnchor(0.5, 0.5)
    trackpad.graphics().rx(1, 0).ry(1, 0).rw(0, 10).rh(0, 15).anchor(1, 1).rect(0, 0, 1, 1, 0x38000000).rwh(1, 1).hoverOnly()
    
    trackpad.label(num+"[7 / "+maxNumber).id("lblNum").rx(0.5, 0).ry(1, 1).rw(0, 15).rh(0, 15).anchor(0.5, 1).labelAnchor(0.5, 0.5)
    
    trackpad.click().id("pgLeft").rx(0, 0).ry(1, 0).rw(0, 10).rh(0, 15).anchor(0, 1)
    trackpad.label("<").id("lbltpLeft").rx(0, 0).ry(1, 1).rw(0, 10).rh(0, 15).anchor(0, 1).labelAnchor(0.5, 0.5)
    trackpad.graphics().rx(0, 0).ry(1, 0).rw(0, 10).rh(0, 15).anchor(0, 1).rect(0, 0, 1, 1, 0x38000000).rwh(1, 1).hoverOnly()
    
    player.openUI(ui);
    player.playSound("mp.sounds:trs.interact.app_beep", pos.x, pos.y, pos.z, 0.25, 2);
}

function handler(c)
{
    let player = c.getSubject();
    let entityData = player.getEntityData();
    let pos = player.getPosition();
    let uiContext = player.getUIContext();
    let num = parseInt(uiContext.get("lblNum").label.match(/\d+/)[0])
    let last = uiContext.getLast();
    
    if (last == "clickExit") {
        player.closeUI();
        player.playSound("mp.sounds:trs.ui.comp_key3", pos.x, pos.y, pos.z, 0.5, 1.8);
        return;
    } 
    
    num += {"pgRight":1,"pgLeft":-1}[uiContext.getLast()] || 0;
    num = num < 1 ? maxNumber : num > maxNumber ? 1 : num;
    
    uiContext.get("lblNum").label(num+" [7/ "+maxNumber);
    uiContext.get("lblName").label(names[num].name);
    uiContext.get("slDescription").label(names[num].description);
    uiContext.get("morph").morph(mappet.createMorph(names[num].morph));
    
    uiContext.get("icYoutube").enabled(names[num].youtube != null);
    uiContext.get("icDiscord").enabled(names[num].discord != null);
    uiContext.get("icTelegram").enabled(names[num].telegram != null);
    
    let linkMap = {
        "icYoutube": "youtube",
        "icDiscord": "discord",
        "icTelegram": "telegram"
    };
    let key = linkMap[last];
    if (key && names[num][key]) {
        player.openWebLink(names[num][key]);
    }
    
    player.playSound("mp.sounds:trs.ui.serv_info", pos.x, pos.y, pos.z, 0.1, 2);
}