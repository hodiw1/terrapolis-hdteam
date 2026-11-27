function main(c) {
    var player = c.getSubject();
    let pos = player.getPosition();
    
    let monsterRandomData = JSON.parse(c.getServer().getStates().getString("monsterRandomData")) 
    
    let ui = mappet.createUI(c, "handler").background().closable(false);
    let noteMain = ui.layout();
    noteMain.current.id("main").rxy(0.5, 0.5).wh(350, 180).anchor(0.5).visible(true);

    let noteMainGraphics = noteMain.graphics().rxy(0.5, 0.5).anchor(0.5).rwh(1, 1);
    noteMainGraphics.rect(0, 0, 1, 1, 0xffe7e4d8).rwh(1, 1);
    noteMainGraphics.rect(0, 0, 1, 1, 0xffe6ccc3).rwh(1, 0.15);

    let title = noteMain.label("Заметка от охотника")
    .rx(0.5).ry(0, 7).labelAnchor(0.5, 0.0).color(0x303030, false)

    var scroll = noteMain.column(5, 10);
    scroll.getCurrent().scroll().rx(0.5, 0).ry(0.5, 10).rw(1).rh(0.8).anchor(0.5);
    let text = scroll.text("Чтобы пережить неделю полнолуния, обращай внимание на [l" + monsterRandomData.character + " характер[r своих гостей." +
        "\n\nТакже проверь поведение, нечисть может [l" + findInfo(strangerBehaviour, monsterRandomData.behaviour) + "[r." +
        "\n\nИ да, зачастую у нежити [l" + (monsterRandomData.temperature > 36.6 ? "повышенная" : monsterRandomData.temperature < 36.6 ? "пониженная" : "нормальная") + " температура[r." +
        "\n\nНе забывай впускать заблудших странников, иначе они обречены на погибель!"
    ).color(0x000000, false);

    ui.label("Нажми вне области для закрытия...").color(0x505050).rx(0.5, 0).ry(0.5, 100).wh(100, 8).anchor(0.5).labelAnchor(0.5);
    ui.click().id("clickExit").rxy(0.5, 0.5).rwh(1, 1).anchor(0.5).enabled(true);
    
    if (c.getServer().getStates().getString("!gameStatus") == "end") {
       noteMainGraphics.rect(0, 0, 1, 1, 0xc5000000).rwh(1, 1);
       let block = noteMain.label("Эта заметка будет доступна Хозяину во время игры...").id("test")
       .rx(0.5).ry(0.5, -5).labelAnchor(0.5, 0.0).color(0xffffff, false)
    }

    player.openUI(ui);
    player.playSound("mp.sounds:trs.interact.note_inspect", pos.x, pos.y, pos.z, 1.0, mappet.random(1, 1.2));
}

function handler(c) {
    let player = c.getSubject();
    let pos = player.getPosition();
    let uiContext = player.getUIContext();
    let entityData = player.getEntityData();

    if (uiContext.getLast() == "clickExit") {
        player.closeUI();
        player.playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z, 0.5, 1.2);
        player.playSound("mp.sounds:trs.items.isotape_drop", pos.x, pos.y, pos.z, 1.0, 1.5);
    }
}

function findInfo(data, name) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][0] === name) {
            return data[i][2];
        }
    }
    return "";
}