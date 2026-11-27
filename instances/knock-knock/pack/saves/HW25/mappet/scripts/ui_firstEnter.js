    var greetingsText = "Привет, [6#[r!\nСпасибо за установку нашего режима! [c♥[r\n\n[e⚠ [eДанная игра не рассчитана на одного!\n[7Рекомендованное кол-во игроков: [r5+\n\n\n[cПроблемы с игрой?\n[7Заходи на Discord сервер автора ([rNazzy[7), там тебе смогут помочь.\n\n[6Снимаешь видео?\n[7Будем рады, если расскажешь о [rKNOCK KNOCK[7 на своём канале и поделишься впечатлениями!\n\n[e⚠ Важно:\n[7Если ты хочешь использовать ресурсы из этого режима для своих проектов, то обязательно указывай авторство и ссылку на первоисточник.\n\n[8P.S. Модификация данного режима разрешена.";
 
function main(c) {
    var player = c.getSubject();
    let pos = player.getPosition();
    let ui = mappet.createUI(c, "handler").background().closable(false);
       
    ui.getCurrent().keybind(15, "exit", "exit ui");
    
    let lt = ui.layout();
    lt.current.id("ltMain").rxy(0.5, 0.5).wh(300, 150).anchor(0.5).visible(true);
    
    let back = lt.graphics().rxy(0, 0).rwh(1, 1);
    back.rect(0, 0, 1, 1, 0xff202020).rw(1).rh(1, 18);
    back.rect(0, 0, 1, 1, 0xff303030).xy(0, 0).rw(1).h(-18);
    
    lt.label("[7KNOCK KNOCK").id("title")
    .rx(0.5, 0).ry(0, -9).anchor(0.5).labelAnchor(0.5); //title
    
    let media = lt.row(0, 0);
    media.getCurrent().rx(1, -8).ry(0, -9).wh(45, 20).anchor(1, 0.5);
    media.icon("youtube").id("youtube").rx(0, 0).ry(0.5, 0).wh(10, 10).anchor(0.5).enabled(true);
    media.icon("discord").id("discord").rx(0.5, 0).ry(0.5, 0).wh(10, 10).anchor(0.5).enabled(true);
    media.icon("telegram").id("telegram").rx(1, 0).ry(0.5, 0).wh(10, 10).anchor(0.5).enabled(true);
    
    let scroll = lt.column(5, 0);
    scroll.getCurrent().scroll().rx(0.5, 0).ry(0.5, 10).wh(280, 150).anchor(0.5);
    let text = scroll.text(greetingsText.split("#")[0] + player.getName() + greetingsText.split("#")[1]).id("slText");
    
    let btnTest = scroll.button("Хорошо!").id("btnOk");
    btnTest.background(0x558855).rx(0, 5).ry(0, 0).wh(50, 12).anchor(0.5, 0.5);
    
    player.openUI(ui);
    player.playSound("mp.sounds:trs.interact.app_beep", pos.x, pos.y, pos.z, 0.25, 2);
}

function handler(c)
{
    let player = c.getSubject();
    let players = c.getServer().getAllPlayers()
    let entityData = player.getEntityData();
    let pos = player.getPosition();
    let uiContext = player.getUIContext();
    let last = uiContext.getLast();
    
    if (last == "btnOk") {
        var data = uiContext.getData();
        var pressed = data.getInt("btnOk");

        if (pressed >= 10) {
            player.closeUI();
            player.playSound("mp.sounds:trs.ui.comp_key3", pos.x, pos.y, pos.z, 0.5, 1.8);
            player.executeScript("ui_skin.js")
            player.getStates().setString("!notFirstTime", "");
            return;
        }

        uiContext.get("btnOk").label(pressed+"[7 / 10");
    }
    
    last=="youtube"?player.openWebLink("https://www.youtube.com/@NazzyChannel"):
    last=="discord"?player.openWebLink("https://discord.gg/pgxw3he"):
    last=="telegram"?player.openWebLink("https://t.me/nazzy_ch"):null;
    
    
    player.playSound("mp.sounds:trs.ui.serv_info", pos.x, pos.y, pos.z, 0.1, 2);
}