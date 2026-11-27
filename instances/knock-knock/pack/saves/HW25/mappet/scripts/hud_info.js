function main(c) {try{
    let player = c.getSubject();
    let playerData = getPlayerData(player);

    if (playerData.role != "stranger" && playerData.role != "monster") {
        player.closeHUD("CharacterInfo");
        return;
    }
    
    if (!player.getDisplayedHUDs().has("CharacterInfo") || player.getStates().has("updateHudInfo")) {
        player.getStates().reset("updateHudInfo")
        player.setupHUD("CharacterInfo");
        player.changeHUDMorph("CharacterInfo", 0, mappet.createMorph("{Color:10289049,Label:\""+ playerData.name +"\",Shadow:1b,AnchorX:0.0f,Name:\"label\",ForcedSettings:0b}"));
        player.changeHUDMorph("CharacterInfo", 1, mappet.createMorph("{Color:"+ (playerData.role == "stranger" ? 16646143 : 16723756) +",Label:\""+ (playerData.role == "stranger" ? "Странник" : "Нечисть") +"\",Shadow:1b,AnchorX:0.0f,Name:\"label\",ForcedSettings:0b}"));
        player.changeHUDMorph("CharacterInfo", 2, mappet.createMorph("{Label:\""+ playerData.character +"\",Shadow:1b,AnchorX:0.0f,Name:\"label\",ForcedSettings:0b}"));
        player.changeHUDMorph("CharacterInfo", 3, mappet.createMorph("{Background:1426063360,Max:210,Color:15000804,Label:\""+ findInfo(strangerCharacter, playerData.character) +"\",AnchorY:0.0f,AnchorX:0.0f,Name:\"label\",ForcedSettings:0b}"));
        player.changeHUDMorph("CharacterInfo", 4, mappet.createMorph("{Label:\""+ playerData.behaviour +"\",Shadow:1b,AnchorX:0.0f,Name:\"label\",ForcedSettings:0b}"));
        player.changeHUDMorph("CharacterInfo", 5, mappet.createMorph("{Background:1426063360,Max:210,Color:15000804,Label:\""+ findInfo(strangerBehaviour, playerData.behaviour) +"\",AnchorY:0.0f,AnchorX:0.0f,Name:\"label\",ForcedSettings:0b}"));
    } else {
        player.closeHUD("CharacterInfo")
    }
}catch(e){
    // c.send(e)
}
}

function findInfo(data, name) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][0] === name) {
            return data[i][1];
        }
    }
    return "";
}