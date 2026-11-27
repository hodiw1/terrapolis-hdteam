function oneSecond(c) {
    let players = Java.from(c.getServer().getAllPlayers());
    let world = c.getServer().getWorld(0)
    let customGameSetting = getStateSilently(c.getServer(), "customGameSetting");

    players.forEach(function (player) {
        let entityData = player.getEntityData();
        let pos = player.getPosition()
        let guests = JSON.parse(c.getServer().getStates().getString("guests"))
        let gameData = JSON.parse(c.getServer().getStates().getString("gameData"))

        let isALivePlayer = (guests.indexOf(player.getName()) !== -1 || getPlayerData(player).role == "owner")
        let isInHouse = inBoxs(player.getPosition(), houseBoxs)

        if (!entityData.has("frostbite")) entityData.setFloat("frostbite", 0.0)
        if (!entityData.has("condensation")) entityData.setInt("condensation", 0)

        if (player.getGameMode() != 3 && !isInHouse) {
            entityData.setInt("condensation", entityData.getInt("condensation") + Math.floor(mappet.random(1, 3)))
            if (entityData.getInt("condensation") >= 5 && !entityData.getBoolean("stunned")) {
                player.displayMorph(mappet.createMorph("{Skin:\"b.a:empty/skins/texture.png\",BodyParts:[{Target:1b,T:[0.0f,-0.09f,-0.28f],Limb:\"head\",Morph:{Scheme:\"hw_mouthSteam\",Name:\"snowstorm\",ForcedSettings:0b}}],Settings:{ShadowOption:1},Name:\"blockbuster.fred\",ForcedSettings:1b}"), 10, 0, 0, 0);
                entityData.setInt("condensation", 0)
            } 
        } else {
            entityData.setInt("condensation", 0)
        }

        if (isALivePlayer && !isInHouse && world.isRaining() && gameData.stage == "day") {
            entityData.setFloat("frostbite", entityData.getFloat("frostbite") + customGameSetting.freezingSpeed)

            if (entityData.getFloat("frostbite") >= 25) {
                player.setupHUD("stun")
                entityData.setFloat("frostbite", 0)
                let npc = player.getWorld().spawnNpc("corpse", pos.x, pos.y, pos.z);
                let deathMorph = mappet.createCompound(JSON.parse(player.getStates().getString("skin")).morph);
            
                deathMorph.setCompound("Hitbox", mappet.createCompound('{Eye:0.9f,Sneak:0.5f,Enabled:1b,Height:0.5f}'));
                deathMorph.setCompound("Actions", mappet.createCompound('{running:"stun1_idle",falling:"stun1_idle",sprinting:"stun1_idle",crouching:"stun1_idle",riding_idle:"lying_idle",dying:"stun1_idle",idle:{Speed:0f,Name:"stun1_idle"},flying:"stun1_idle",land:"lying_idle",crouching_idle:"stun1_idle",hurt:"stun1_idle"}'));
            
                npc.setMorph(mappet.createMorph(deathMorph));
                npc.setRotations(0, player.getYaw(), player.getYawHead());
                npc.playAnimation("stun1");
                npc.getStates().setString("name", player.getName());
                npc.getStates().setString("dead", "true")
                npc.getStates().setString("basedPlayerMorph", JSON.stringify(JSON.parse(player.getStates().getString("skin")).morph))
                npc.getWorld().playSound("mp.sounds:trs.entity.player_bodyfall", pos.x, pos.y, pos.z);
                if (getPlayerData(player).role == "owner") {
                    player.setGameMode(3)
                    // c.send("завершение игры")
                    c.getServer().getStates().setString("!gameStatus", "lose")
                    c.getServer().executeScript("game.js", "end")
                } else {
                    rejectPlayer(c, player)
                }
                
            }
        } else {
            entityData.setFloat("frostbite", Math.max(0, entityData.getFloat("frostbite") - (2 * customGameSetting.freezingSpeed)))
        }
        
        if (entityData.getFloat("frostbite") != -1) {
            if (!player.getDisplayedHUDs().has("freeze")) 
                player.setupHUD("freeze")
            player.changeHUDMorph("freeze", 0, mappet.createMorph("{Lighting:0b,Color:"+ (((255 / 25 * entityData.getFloat("frostbite")) << 24) | (218 << 16) | (255 << 8) | 255) +",Animation:{Interp:21,Animates:1b,Duration:20},Texture:\"b.a:trs/ui/white_square.png\",Shaded:0b,Name:\"blockbuster.image\",ForcedSettings:0b}"))
        } else if (player.getDisplayedHUDs().has("freeze")) {
            player.closeHUD("freeze")
        }
//       player.send(entityData.getInt("frostbite"))
    });
    
}

function ambientSounds(c) {
    let states = c.getServer().getStates();
    let world = c.getServer().getWorld(0);
    let players = c.getServer().getAllPlayers();

    players.forEach(function (player) {
        let pos = player.getPosition()
        let isInHouse = inBoxs(player.getPosition(), houseBoxs)
        player.playSound("mp.sounds:hw.weather_"+ (world.isRaining() ? "blizzard" : "calm") +"_"+ (isInHouse ? "inside" : "outside") + Math.floor(mappet.random(1, 6)), "weather", player.getPosition().x, player.getPosition().y + 10, player.getPosition().z, 15, 1);
    });
    
}

function ambientSnowParticle(c) {
    let players = Java.from(c.getServer().getAllPlayers());
    if (!c.getServer().getWorld(0).isRaining()) return
    for (let i in players) {
        let player = players[i]
        let settings = JSON.parse(player.getStates().getString("settings"));
        if (settings.ambientSnow) {
            player.displayMorph(mappet.createMorph("{Scheme:\"hw_snow\",Name:\"snowstorm\",ForcedSettings:0b}"), 100, 0, 0, 0, 0, 0, false, player)
        }

    }
}