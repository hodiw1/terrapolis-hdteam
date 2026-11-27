function main(c) {
    let player = c.getPlayer();
    let pos = player.getPosition();
    let ui = mappet.createUI(c, "handler").background();
    
    if (player.getEntityData().has("interactCooldown")) return;
    if (mappet.vector(-11.5, 23, 27.5).distance(player.getPosition()) > 1.5) return;

    let settings = ui.layout();
    let back = settings.graphics().rxy(0, 0).rwh(1, 1);

    settings.current.id("ltSettings").rxy(0.5, 0.5).wh(200, 250).anchor(0.5).visible(true);
    back.rect(0, 0, 1, 1, 0x50000000).rwh(1, 1);

    settings.click().id("clickExit").rxy(0.5, 0.5).rwh(3, 3).anchor(0.5);
    settings.label("Нажмите, чтобы закрыть...").color(0x505050).rx(0.5, 0).ry(1, 20).anchor(0.5).labelAnchor(0.5);

    settings.label("[c♥ [fСПИСОК ДОНАТЕРОВ [c♥").rx(0.5, 0).ry(0, 10).labelAnchor(0.5);
    settings.label("Режим опубликован благодаря вам!").color(0x909090).rx(0.5, 0).ry(0, 22).labelAnchor(0.5);

    let scroll = settings.column(0, 0);
    let text = scroll.text(mappet.getWorldDir().resolve("donators.list").read());

    scroll.getCurrent().scroll().rxy(0, 0).wh(200, 203).anchorY(-0.2);
    text.textAnchor(0.5);

    player.openUI(ui);
    player.getEntityData().setString("inUI", "gameMenu");
    player.playSound("mp.sounds:trs.interact.note_inspect", pos.x, pos.y, pos.z, 1.0, mappet.random(1, 1.2));
}

function handler(c) {
    let player = c.getPlayer();
    let pos = player.getPosition();
    let uiContext = player.getUIContext();
    let entityData = player.getEntityData();

    if (uiContext.isClosed()) {
        entityData.remove("inUI");
        return;
    }

    if (uiContext.getLast() == "clickExit") {
        entityData.remove("inUI");
        player.closeUI();
        player.playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z, 0.5, 1.2);
    }
}