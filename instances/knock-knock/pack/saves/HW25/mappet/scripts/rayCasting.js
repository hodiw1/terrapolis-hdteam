function main(c) {
    var player = c.getPlayer();
    var states = player.getStates();
    var lastRayObject = states.getString("lastRayObject") || "";
    let settings = getStateSilently(player, "settings")
    var rayTrace = player.rayTrace(player.getPitch() > 30 ? 2 : 1.7);
    
    try {
        if (rayTrace.isMissed() && lastRayObject) return reset();
    } catch(e) {
        return reset();
    }
    
    if (player.getGameMode() == 3 || player.getEntityData().has("inUI") || 
        player.getEntityData().has("textInfo") || player.getEntityData().has("interactCooldown") || player.getStates().has("roped") || !settings.interactTooltip) {
        return reset();
    }
    
    var mainItemId = player.getMainItem().getItem().getId();
    var playerData = getPlayerData(player);
    var gameData = getStateSilently(c.getServer(), "gameData");
    
    function reset() {
        states.setString("lastRayObject", "");
        player.closeHUD("interact");
    }
    
    function showInfo(text) {
        var targetId = rayTrace.isBlock() ? currentBlockId : rayTrace.getEntity().getName();
        states.setString("lastRayObject", targetId);
        player.setupHUD("interact");
        player.changeHUDMorph("interact", 1, mappet.createMorph(
            '{Color:12566463,Label:"' + text + '",Shadow:1b,AnchorX:0.0f,Name:"label",ForcedSettings:0b}'
        ));
    }
    
    if (rayTrace.isBlock()) {
        var currentBlockId = c.getWorld().getBlock(rayTrace.getBlock()).getBlockId();
        
        if (currentBlockId != lastRayObject || player.getEntityData().getInt("hotbarIndex") != states.getNumber("hotbarIndex")) {
            handleBlockInteraction();
            states.setNumber("hotbarIndex", player.getEntityData().getInt("hotbarIndex"));
        }
    } 
    
    else if (rayTrace.isEntity()) {
        var entity = rayTrace.getEntity();
        var name = entity.getName();
        
        if (name != lastRayObject) handleEntityInteraction();
    }
    
    function handleBlockInteraction() {
        switch (currentBlockId) {
            case "hnt:bed":
                if (gameData.stage == "day" && playerData.role == "owner") showInfo("Поспать");
                break;
            case "hw25:curtainssingle":
            case "hw25:curtainsdouble_r":
            case "hw25:curtainsdouble_l":
                if (gameData.stage != "sleep") showInfo("Открыть");
                break;
            case "hw25:intdoorclosed":
                showInfo("Открыть");
                break;
            case "hw25:curtainssingleopen":
            case "hw25:curtainsdouble_lopen":
            case "hw25:curtainsdouble_ropen":
                if (gameData.stage != "sleep") showInfo("Закрыть");
                break;
            case "hw25:intdooropen":
                showInfo("Закрыть");
                break;
            case "hnt:sofal":
            case "hnt:sofar":
            case "hw25:sofal":
            case "hw25:sofar":
            case "hnt:chair":
                if (!states.has("sits")) showInfo("Присесть");
                break;
            case "hw25:note":
                showInfo("Прочитать");
                break;
            case "hnt:cardboard":
                showInfo("Открыть");
                break;
            case "hw25:snowdrift":
                showInfo("Слепить снежок");
                break;
            case "hw25:outdoorclosed":
                handleOutdoorClosed();
                break;
            case "hw25:outdooropen":
                if ((playerData.role == "owner" && gameData.stage == "day") || 
                    c.getServer().getStates().getString("!gameStatus") == "end") {
                    showInfo("Закрыть");
                }
                break;
            case "hw25:outdoorhatch":
                if (playerData.role == "owner" && gameData.stage == "night") {
                    showInfo("Решить");
                }
                break;
            case "hnt:workbench":
                if (playerData.role == "owner" && 
                    (mainItemId == "hw25:magnifier" || mainItemId == "hw25:thermometer")) {
                    showInfo("Переработать");
                } else reset();
                break;
            default:
                reset();
        }
    }
    
    function handleOutdoorClosed() {
        var role = playerData.role;
        var isOwner = role == "owner";
        
        if (isOwner && mainItemId == "hnt:hammer") {
            var hasScrap = false;
            var inv = player.getInventory();
            for (var i = 0; i < inv.size(); i++) {
                if (inv.getStack(i).getItem().getId().startsWith("hnt:scrap")) {
                    hasScrap = true;
                    break;
                }
            }
            showInfo(hasScrap ? "Починить" : "Проверить");
        } else if (isOwner) {
            showInfo(gameData.stage == "day" ? "Открыть" : "Посмотреть");
        } else if (role == "monster" && gameData.stage == "sleep") {
            if (!states.has("voted")) {
                showInfo("Сломать");
            }
        } else if (gameData.stage != "sleep" && c.getServer().getStates().getString("!gameStatus") != "end") {
            showInfo("Постучать");
        } else {
            showInfo("Открыть");
        }
    }
    
    function handleEntityInteraction() {
        var entity = rayTrace.getEntity();
        var name = entity.getName();
        var role = playerData.role;
        var item = mainItemId;
        
        if (entity.isPlayer()) {
            var entityRole = getPlayerData(entity).role;
            if (entityRole == "owner" && item != "minecraft:air") {
                showInfo("Передать");
            } else if (role == "owner") {
                var actions = {
                    "hw25:thermometer": "Измерить",
                    "hw25:rope": "Связать",
                    "hw25:magnifier": "Осмотреть",
                    "hnt:mineral3": "Изгнать"
                };
                if (actions[item]) showInfo(actions[item]);
            }
        } else if (entity.isNPC()) {
            var npcId = entity.getNpcId();
            if (npcId == "item") {
                var access = entity.getEntityData().getString("access");
                if (access != "noone" && (access == "any" || role == "owner") && item == "minecraft:air") showInfo("Подобрать");
            } else if (npcId == "sleep" && role == "monster" && gameData.stage == "sleep" && !states.has("voted")) {
                showInfo("Убить");
            } else if (npcId == "start" && !c.getServer().getStates().has("!settingsOccupied")) {
                showInfo("Использовать");
            } else if (npcId == "donators" || npcId == "credits") {
                showInfo("Изучить");
            }
        }
    }
}