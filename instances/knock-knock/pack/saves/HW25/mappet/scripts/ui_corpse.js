function main(c) {try{
    let player = c.getPlayer();
    let entityData = player.getEntityData();
    let pos = player.getPosition();
    let ui = mappet.createUI(c, "handler").background();
    let o = c.getServer().getPlayer(entityData.getString("playerName"))
    let playerName = o.getName();


    let inventory = o.getInventory();
    let items = [];

    for (let i = 0; i < inventory.size(); i++) {
        let stack = inventory.getStack(i);
        if (stack.getItem().getId() != "minecraft:air") {
            items.push({
                id: stack.getItem().getId(),
                count: stack.getCount(),
                tag: stack.getData().dumpJSON()
            });
        }
    }

    ui.click().id("unClick").rxy(0.5, 0.5).wh(100, 100).anchor(0.5);
    ui.label("Выйти...").color(0x505050).rx(0.5, 0).ry(0.5, 100).wh(100, 8).anchor(0.5).labelAnchor(0.5);
    ui.click().id("clickExit").rxy(0.5, 0.5).rwh(1, 1).anchor(0.5);

    let lootMain = ui.layout();
    lootMain.current.id("main").rxy(0.5, 0.5).wh(100, 100).anchor(0.5).visible(true);
    lootMain.graphics().rxy(0.5, -0.2).w(150).h(20).anchor(0.5, 0).rect(0, 0, 1, 1, 0x90000000).rwh(1, 1);
    lootMain.graphics().rxy(0.5, 0).w(150).h(100).anchor(0.5, 0).rect(0, 0, 1, 1, 0x60000000).rwh(1, 1);
    lootMain.label(playerName).rxy(0.5, -0.1).wh(180, 10).anchor(0.5).labelAnchor(0.5);
    
    let lootItems = lootMain.stringList(lootString(items)).id("lootItems");
    lootItems.background(0x00000000).rxy(0.5, 0.5).wh(150, 100).anchor(0.5);

    if (!lootString(items).length) {
        lootMain.label("Пусто...").rxy(0.5, 0.5).wh(100, 10).anchor(0.5).labelAnchor(0.5);
    }

    player.openUI(ui);
    player.playSound("mp.sounds:trs.entity.player_crawl7", pos.x, pos.y, pos.z, 1, 1.5);
    c.getSubject().playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z);
    entityData.setString("inUI", "corpse")
}catch(e){
    // c.send(e)
}
}

function handler(c) {
    let s = c.getSubject();
    let entityData = s.getEntityData();
    let pos = s.getPosition();
    let uiContext = s.getUIContext();
    let data = uiContext.getData()

    if (uiContext.isClosed()) {
        entityData.remove("inUI")
        return
    }

    if (uiContext.getLast() == "clickExit") {
        s.closeUI();
        c.getSubject().playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z, 0.5, 1.2);
        c.getSubject().playSound("mp.sounds:trs.entity.player_crawl10", pos.x, pos.y, pos.z, 0.5, 1.5);
    }
}

function lootString(items) {
    let lootString = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let id = item.id;

        if (itemsName[id] != undefined) {
            lootString.push(itemsName[id]);
        } else {
            lootString.push(item.id);
        }
    }

    return lootString;
}