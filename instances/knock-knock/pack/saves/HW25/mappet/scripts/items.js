
function main(c) {try{
    let player = c.getPlayer();
    let playerData = getPlayerData(player);
    let look = player.getLook();
    let pos = player.getPosition();
    let item = c.getValue("entityItem").getItem();
    if (playerData.role != "") {
        player.setMainItem(item)
    } else {
        let droppedItem = spawnItem(item.getItem().getId(), mappet.vector(pos.x, pos.y + 1, pos.z), c.getWorld(), item.getData(), item.getCount(), null, 1, "owner");
        droppedItem.setMotion(look.x * 0.25, look.y * 0.5, look.z * 0.25);
        droppedItem.setRotations(player.getPitch(), player.getYawHead(), player.getYawHead());
        player.swingArm();
        playSoundToPlayers(c, "mp.sounds:trs.items.item_throw", pos, "block", 0.25, mappet.random(1.0, 1.2))
    }
    c.cancel(); 
    
}catch(e){
    // c.send(e)
}
}

function interact(c) {
    let npc = c.getNPC();
    let player = c.getPlayer();
    let playerData = getPlayerData(player);
    let pos = player.getPosition();
    let itemName = npc.getEntityData().getString("id");
    if (npc.getEntityData().has("intId")) return;
    if (!canPickup(player, npc.getEntityData()) || pos.distance(npc.getPosition()) > 2 ) return;
    if (playerData.role != "owner" && npc.getEntityData().getString("access") != "any") return;
    if (npc.getEntityData().getString("access") == "noone") return;

    if (player.getMainItem().getItem().getId() == "minecraft:air") {
        player.giveItem(mappet.createItemNBT(npc.getEntityData().stringify()), true, false);
    } else {
        return
    }
//    else if (player.getMainItem().getItem().getId() == itemName) {
//        player.getMainItem().setCount(player.getMainItem().getCount() + mappet.createItemNBT(npc.getEntityData().stringify()).getCount())
//    }
    playSoundToPlayers(c, "mp.sounds:trs.items." + itemName.split(":")[1] + "_pickup", pos, "block", 0.5, mappet.random(0.95, 1.1))
    player.swingArm();
    npc.getEntityData().setString("intId", mappet.createUniqueId().substring(0, 8))
    npc.remove();
}

function equipmentChange(c) {
    try {
        let player = c.getPlayer();
        setInteractCooldown(c, player, 1);
        if (player.getEntityData().getBoolean("stunned") || player.getStates().has("roped") || player.getMorph() == null) return;
        let mainItem = player.getMainItem();
        let baseMorph = mappet.createCompound(JSON.parse(player.getStates().getString("skin")).morph);
        let pos = player.getPosition();
        let entityData = player.getEntityData();
        let morphes = [
            '{}',
            '{right_arm:{RX:0.4363323f,F:0b,RY:0.08726647f,RZ:0.1745329f,Y:-0.65625f},right_elbow:{RX:0.2617994f,F:0b}}#{R:[0f,0f,10f],T:[-0.1875f,0.03125f,-0.34375f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,tag:{},Damage:0s}}}',
            '{right_arm:{RX:1.047198f,F:0b,RY:0.2792527f,RZ:0.1919862f,Y:-0.84375f,Z:-0.84375f},right_elbow:{RX:0.08726647f,F:0b}}#{R:[75f,180f,0f],S:[0.5f,0.5f,0.5f],T:[0f,-0.29f,-0.366196f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}',
            '{right_arm:{RX:0.2617995f,F:0b,RY:0.2792527f,RZ:0.1919862f,Y:-0.65625f},right_elbow:{RX:0.2617994f,F:0b}}#{R:[180f,217f,90f],S:[0.6f,0.6f,0.6f],T:[0.15625f,-0.415f,-0.272446f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}',
            '{torso:{F:0b},right_arm:{RX:1.134464f,F:0b,RZ:0.1396263f,Y:-0.5f,Z:-1.03125f},right_elbow:{RX:0.4363323f,F:0b},left_elbow:{RX:0.2617994f},left_arm:{RX:-0.2268928f,RZ:-0.2443461f}}#{R:[90f,180f,180f],S:[0.7f,0.7f,0.7f],T:[-0.0625f,-0.54f,-0.459946f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}',
            '{right_arm:{RX:1.047198f,F:0b,RY:0.2792527f,RZ:0.1919862f,Y:-0.84375f,Z:-0.84375f},right_elbow:{RX:0.08726647f,F:0b}}#{R:[75f,180f,0f],S:[0.25f,0.25f,0.25f],T:[0f,-0.32125f,-0.334946f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}',
            '{right_arm:{RX:0.2617994f,F:0b,RZ:0.1396263f,Y:-0.65625f},right_elbow:{RX:0.2617994f,F:0b}}#{R:[0f,90f,0f],T:[-0.125f,0.03125f,-0.3125f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,tag:{},Damage:0s}}}',
            '{right_arm:{RX:1.047198f,F:0b,RY:0.2792527f,RZ:0.1919862f,Y:-0.84375f,Z:-0.84375f},right_elbow:{RX:0.08726647f,F:0b}}#{R:[0f,180f,0f],T:[-0.0625f,0.05375f,-0.209946f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,tag:{},Damage:0s}}}',
            '{right_arm:{RX:0.1047203f,F:0b,RY:-0.3665191f,RZ:0.3490658f,Y:-0.34375f,Z:-0.84375f},left_arm:{RZ:-0.122173f},right_elbow:{RX:0.3839724f,F:0b},model:{}}#{R:[0f,-180f,90f],T:[-0.48f,-0.3125f,-0.40625f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}',
            '{right_arm:{RX:0.5235988f,F:0b,RZ:0.1745329f},right_elbow:{RX:0.08726647f,F:0b},model:{}}#{R:[-25f,0f,0f],T:[0f,0.0625f,-0.5625f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}',
            '{right_arm:{RX:0.5235988f,F:0b,RZ:0.1745329f},right_elbow:{RX:0.08726647f,F:0b},model:{}}#{R:[15f,191f,0f],S:[0.6f,0.6f,0.6f],T:[-0.1525f,-0.12f,-0.45f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}',
            '{right_arm:{RX:0.5235988f,RZ:0.1745329f},right_elbow:{RX:0.08726647f,F:0b},model:{}}#{R:[0f,155f,90f],T:[-0.46875f,-0.34375f,-0.25f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}',
            '{head:{RY:0.2617994f},right_arm:{RX:1.134464f,F:0b,RY:-0.9075713f,RZ:0.3490659f,Y:-0.34375f,Z:-0.84375f},left_arm:{RX:0.6108652f,F:0b,RZ:-0.5235988f},torso:{RY:-0.2617994f},right_elbow:{RX:0.8726646f,F:0b},model:{},left_elbow:{RX:0.3839724f,F:0b}}#{R:[0f,-180f,90f],T:[-0.48f,-0.375f,-0.21875f],Limb:"right_elbow",Morph:{Transform:"",Name:"item",ForcedSettings:0b,Stack:{id:"",Count:1b,Damage:0s}}}'
        ];
        let items = [
            ["minecraft:air"],
            ["hnt:medkit"],
            ["hw25:magnifier"],
            ["hw25:rope"],
            ["hw25:shotgun"],
            ["hw25:thermometer"],
            ["hnt:ammo"],
            ["hnt:mineral3"],
            ["hw25:vetka"],
            ["hnt:scrap1", "hnt:scrap2", "hnt:scrap3"],
            ["hw25:doska"],
            ["hnt:hammer"],
            ["hw25:snowball"]
        ];

        if (mappet.toNBT(player.getMorph()).getString("Name").startsWith("chameleon.pl_")) {
            items.forEach(function(array, index) {
                if (contains(array, mainItem.getItem().getId())) {
                    let list;
                    let itemIndex = 0
                    if (baseMorph.has("BodyParts")) {
                        list = baseMorph.getList("BodyParts")
                        itemIndex = baseMorph.get("BodyParts").size()
                        list.addCompound(mappet.createCompound(morphes[index].split("#")[1]))                        
                    } else {
                        list = mappet.createList("["+ morphes[index].split("#")[1] +"]");
                    }
            
                    list.getCompound(itemIndex).getCompound("Morph").getCompound("Stack").setString("id", mainItem.getItem().getId());
                    if (baseMorph.has("Pose")) {
                        baseMorph.addCompound("Pose")
                        baseMorph.getCompound("Pose").addCompound("Pose")
                    }
                    baseMorph.getCompound("Pose").setCompound("Pose", mappet.createCompound(morphes[index].split("#")[0]))
                    
                    if (player.getStates().has("sits")) {
                        baseMorph.getCompound("Pose").getCompound("Pose").combine(mappet.createCompound("{right_knee:{RX:-0.6981317f},left_leg:{RX:0.9599311f},right_leg:{RX:0.9599311f},model:{Y:-1.5f,Z:1f},left_knee:{RX:-0.6981317f}}"));
                        baseMorph.setCompound("Settings", mappet.createCompound('{Hands:0b,Speed:0f,Action:"null",ShadowOption:0,Abilities:[],Updates:1b,HP:20,Attack:"null",BetterLightsShadow:1b,Hostile:1b}'));
                    }
                    // baseMorph.getCompound("Pose").getCompound("Pose").combine(mappet.createCompound(morphes[index].split("#")[0]));
                    baseMorph.setList("BodyParts", list);
                    player.setMorph(mappet.createMorph(baseMorph));
                    playSoundToPlayers(c, "mp.sounds:trs.items.item_throw", pos, "block", 0.25, mappet.random(1.5, 1.8))
                }
            });
        }

        player.getEntityData().setInt("hotbarIndex", c.getValue("slot"));
        playSoundToPlayers(c, "minecraft:ui.button.click", pos, "player", 0.1, 2)
        
        if (mainItem.getItem().getId() == "hw25:shotgun") {
            playSoundToPlayers(c, "mp.sounds:hw.gun_raise"+Math.floor(mappet.random(1,5)), pos, "block", 0.5, mappet.random(1, 1.3));
            entityData.setString("shotgunInArms", "");
        }
        if (mainItem.getItem().getId() != "hw25:shotgun" && entityData.has("shotgunInArms")) {
            playSoundToPlayers(c, "mp.sounds:hw.gun_lower", pos, "block", 0.5, mappet.random(0.9, 1.2));
            entityData.remove("shotgunInArms");
        }
        
    } catch (e) {
        // c.send(e)
    }
}


function landing(c) {
    if (c.getNPC() == null || (c.getNPC().getNpcId() != "item" && c.getNPC().getNpcId() != "corpse")) return;
    
    let item = c.getNPC();
    let pos = item.getPosition();
    let itemName = item.getEntityData().getString("id").split(":")[1];
    let distance = c.getValue("distance");

    playSoundToPlayers(c, "minecraft:block.stone.hit", pos, "block", 0.3, mappet.random(0.95, 1.1))
    
    if (distance < 0.5) return;
    playSoundToPlayers(c, "minecraft:block.stone.hit", pos, "block", 1, mappet.random(0.95, 1.1))
    playSoundToPlayers(c, "mp.sounds:trs.items."+ itemName +"_drop", pos, "block", 0.5, mappet.random(0.95, 1.1))
    // c.getWorld().displayMorph(mappet.createMorph("{Scheme:\"trs_dust\",Name:\"snowstorm\",ForcedSettings:0b}"), 1, pos.x, pos.y, pos.z);
}