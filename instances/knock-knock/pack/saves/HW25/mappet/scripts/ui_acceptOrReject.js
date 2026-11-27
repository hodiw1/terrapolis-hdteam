function main(c) {
    let player = c.getSubject();
    let entityData = player.getEntityData();
    
    let rot = player.getRotations()
    player.setRotations(rot.x, normalizeAngle(rot.y), normalizeAngle(rot.z))
    
    player.moveTo("sine_inout", 10, -12.2, 22.13, 25.5, false);
    player.rotateTo("sine_inout", 10, 10, 90, 90)
    let ui = mappet.createUI(c, "handler").closable(true);
    let noteMain = ui.layout();
    noteMain.current.id("main").rxy(0.5, 0.5).rwh(1, 1).anchor(0.5).visible(true);

    let acceptlt = noteMain.layout();
    acceptlt.current.id("acceptlt").rxy(0.45, 0.8).wh(200, 60).anchor(1, 0.5).visible(true);
    acceptlt.morph(mappet.createMorph("{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:11,Animates:1b,Duration:8},Skin:\"b.a:empty/skins/texture.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{S:[1.0f,0.0f,1.0f]}}},BodyParts:[{Limb:\"cube\",Morph:{Background:738197504,Color:10289010,Label:\"Впустить\",Shadow:1b,Name:\"label\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:11,Animates:1b,Duration:8},Skin:\"b.a:empty/skins/texture.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{}}},BodyParts:[{Limb:\"cube\",Morph:{Background:738197504,Color:10289010,Label:\"Впустить\",Shadow:1b,Name:\"label\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b},Duration:8.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"))
    .rxy(0.5, 0.5).anchor(0.5).rwh(1, 1).position(0.017, -0.008, -0).rotation(0, 0).distance(0.25).fov(70).enabled(false)
    acceptlt.click().id("accept").rxy(0.5, 0.5).anchor(0.5).rwh(1, 1);
    
    let rejectlt = noteMain.layout();
    rejectlt.current.id("rejectlt").rxy(0.55, 0.8).wh(200, 60).anchor(0, 0.5).visible(true);
    rejectlt.morph(mappet.createMorph("{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:11,Animates:1b,Duration:8},Skin:\"b.a:empty/skins/texture.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{S:[1.0f,0.0f,1.0f]}}},BodyParts:[{Limb:\"cube\",Morph:{Background:738197504,Color:10289010,Label:\"Впустить\",Shadow:1b,Name:\"label\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:11,Animates:1b,Duration:8},Skin:\"b.a:empty/skins/texture.png\",CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{}}},BodyParts:[{Limb:\"cube\",Morph:{Background:738197504,Color:16723772,Label:\"Прогнать\",Shadow:1b,Name:\"label\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b},Duration:8.0f,EndPoint:0b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}"))
    .rxy(0.5, 0.5).anchor(0.5).rwh(1, 1).position(0.017, -0.008, -0).rotation(0, 0).distance(0.25).fov(70).enabled(false)
    rejectlt.click().id("reject").rxy(0.5, 0.5).anchor(0.5).rwh(1, 1);
    


    entityData.setString("inUI", "door");
    player.openUI(ui);
//    player.playSound("mp.sounds:trs.interact.note_inspect", pos.x, pos.y, pos.z, 1.0, mappet.random(1, 1.2));
}

function handler(c) {
    let player = c.getSubject();
    let pos = player.getPosition();
    let uiContext = player.getUIContext();
    let entityData = player.getEntityData();
    

    if (uiContext.isClosed()) {
        entityData.remove("inUI")
    }

    if (uiContext.getLast() == "accept") {
        player.closeUI();
        c.getWorld().setBlock(mappet.createBlockState("hw25:outdoorclosed", 5), -13, 23, 25)
        playSoundToPlayers(c, "mp.sounds:trs.items.hatchitem_pickup", mappet.vector(-13, 23, 25), "block", 0.5, mappet.random(1, 1.3))
        player.swingArm();
        player.moveTo("sine_inout", 20, -11, 22, 25.6, false);
        player.rotateTo("sine_inout", 20, 10, 100, 100)
        setInteractCooldown(c, player, 20);
        c.scheduleScript(20, function() {
            c.getWorld().setBlock(mappet.createBlockState("hw25:outdooropen", 5), -13, 23, 25)
            playSoundToPlayers(c, "mp.sounds:hw.door_open", mappet.vector(-13, 23, 25), "block", 0.5, mappet.random(1, 1.3))
            player.swingArm();
            player.playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z, 0.5, 1.2);
            player.playSound("mp.sounds:trs.items.isotape_drop", pos.x, pos.y, pos.z, 1.0, 1.5);
        })
    }
    if (uiContext.getLast() == "reject") {
        c.getWorld().setBlock(mappet.createBlockState("hw25:outdoorclosed", 5), -13, 23, 25)
        playSoundToPlayers(c, "mp.sounds:trs.items.hatchitem_pickup", mappet.vector(-13, 23, 25), "block", 0.5, mappet.random(1, 1.2))
        player.swingArm();
        player.closeUI();
        player.playSound("minecraft:ui.button.click", pos.x, pos.y, pos.z, 0.5, 1.2);
        player.playSound("mp.sounds:trs.items.isotape_drop", pos.x, pos.y, pos.z, 1.0, 1.5);
        setInteractCooldown(c, player, 20);
        c.scheduleScript(30, function() {
            let gameData = getStateSilently(c.getServer(), "gameData");
            if (gameData.stage == "night" && gameData.time > 0) {
                gameData.time = 1 
                c.getServer().getStates().setString("gameData", JSON.stringify(gameData));
            } 
        })
        
    }
}