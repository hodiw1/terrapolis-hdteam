const SPacketSetSlot = Java.type("net.minecraft.network.play.server.SPacketSetSlot");
const SPacketHeldItemChange = Java.type("net.minecraft.network.play.server.SPacketHeldItemChange");
const DataSender = Java.type("nzteam.theuran.huntclient.content.DataSender");
const Hdsflsld = Java.type("java.util.Base64");
const logger = mappet.getLogger();

function statisticAdd(world, name, value) {
    let server = mappet.getMappetServer(world.getMinecraftWorld().func_73046_m());
    let states = JSON.parse(server.getStates().getString("currentStatistics"));
    if (!(name in states)) {
        states[name] = 0;
    }
    states[name] += value
    server.getStates().setString("currentStatistics", JSON.stringify(states));
}

function sendScreenshotAllPlayer(world) {
    let server = mappet.getMappetServer(world.getMinecraftWorld().func_73046_m());
    let players = server.getAllPlayers();
    for (let i in players) {
        try {
            var photosToUpload = JSON.parse(players[i].getStates().getString("photoToUpload"));
        } catch (e) {
            var photosToUpload = [];
        }

        for (let j = 0; j < photosToUpload.length; j++) {
            try {
                DataSender.sendScreenshot(photosToUpload[j], players[i].getMinecraftPlayer());
            }catch(e) {return}
        }
        players[i].getStates().reset("photoToUpload")
    }
}

function calculateDayResults(world) {
    let server = getServerFromWorld(world);
    let gameData = JSON.parse(server.getStates().getString("gameData"));
    let saleBox = JSON.parse(server.getStates().getString("saleBox"));
    let dayResultData = JSON.parse(server.getStates().getString("dayResultData"));
    let total = 0;
    let items = mergeItems(saleBox);

    for (let i = 0; i < items.length; i++) {
        let index = findIndexById(saleableItems, items[i].id);
        let eventCoef = setGameEventParam(saleableItems[index].tag, gameData.gameEvent);
        let cost = Math.round(items[i].cost * eventCoef);
        total += cost
    }
    let totalCost = 0;
    let camEventCoef = setGameEventParam("Photo", gameData.gameEvent);
    let photos = removeDuplicates(dayResultData.photosPosted)
    if (camEventCoef == -1) {
        camEventCoef = 1
    };
    for (var j = 0; j < photos.length; j++) {
        var objects = photos[j].objects;
        var totalPhoto = 0
        for (var g = 0; g < objects.length; g++) {
            totalPhoto += objects[g].cost || 0;
        }
        totalCost += totalPhoto * camEventCoef;
    }
    total += totalCost;

    if (gameData.deerKills > 0) {
        total += gameData.deerKills * -300;
    }
    return total
}

function mergeItems(items) {
    var result = [];

    items.forEach(function(item) {
        var itemTag = JSON.parse(item.tag);
        var ids = ["hnt:gascan", "hnt:goldduck", "hnt:silverbunny", "hnt:pickaxe"]
        if (itemTag.Norm !== undefined || ids.indexOf(item.id) !== -1) {
            result.push(item);
            return;
        }

        var existing = null;
        for (var i = 0; i < result.length; i++) {
            var el = result[i];
            var tag = JSON.parse(el.tag)
            if ((el.id === item.id || (el.id.startsWith("hnt:scrap") && item.id.startsWith("hnt:scrap")) || (el.id.startsWith("hnt:mineral") && item.id.startsWith("hnt:mineral"))) && !itemTag.Norm) {
                existing = el;
                break;
            }
        }

        if (existing) {
            existing.count += item.count;
            existing.cost += item.cost;
            let existingTag = JSON.parse(existing.tag);
            if (existingTag.Meters !== undefined) {
                existingTag.Meters += itemTag.Meters
                existing.tag = "{\"Meters\":" + existingTag.Meters + "}"
            }
            if (existingTag.Weight !== undefined && existing.id.startsWith("hnt:scrap")) {
                existingTag.Weight += itemTag.Weight
                existing.tag = "{\"Weight\":" + existingTag.Weight.toFixed(2) + "}"
            }

        } else {
            result.push(assign({}, item));
        }
    });

    return result;
}

function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

function changeSlot(player, slot) {
    var inv = player.getInventory().getMinecraftInventory();
    var connection = player.getMinecraftEntity().field_71135_a;

    inv.field_70461_c = slot;

    connection.func_147359_a(new SPacketHeldItemChange(slot));
}

function findIndexById(arr, id) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

function setGameEventParam(tag, event) {
    switch (event) {
        case "Metal+":
            if (tag.indexOf("Metal") !== -1) {
                return 1.25;
            } else return 1;
        case "Metal-":
            if (tag.indexOf("Metal") !== -1) {
                return 0.75;
            } else return 1;
        case "Mineral-":
            if (tag.indexOf("Mineral") !== -1) {
                return 0.75;
            } else return 1;
        case "Artefact+":
            if (tag.indexOf("Artefact") !== -1) {
                return 1.25;
            } else return 1;
        case "Artefact-":
            if (tag.indexOf("Artefact") !== -1) {
                return 0.45;
            } else return 1;
        case "Item+":
            if (tag.indexOf("Item") !== -1) {
                return 1.5;
            } else return 1;
        case "Photo+":
            if (tag.indexOf("Photo") !== -1) {
                return 1.5;
            } else return 1;
        case "Defence+":
            if (tag.indexOf("Defence") !== -1) {
                return 2.4;
            } else return 1;
        case "Rights+":
            if (tag.indexOf("Rights") !== -1) {
                return 1.5;
            } else return 1;
        case "Trap+":
            if (tag.indexOf("Trap") !== -1) {
                return 2.2;
            } else return 1;
        case "Fuel+":
            if (tag.indexOf("Fuel") !== -1) {
                return 1.6;
            } else return 1;
        case "Mushroom+":
            if (tag.indexOf("Mushroom") !== -1) {
                return 2.5;
            } else return 1;
        case "Mushroom-":
            if (tag.indexOf("Mushroom") !== -1) {
                return 0.2;
            } else return 1;
        case "Artefact+Berry+":
            if (tag.indexOf("Artefact") !== -1 || tag.indexOf("Berry") !== -1) {
                return 1.5;
            } else return 1;
        case "Paint+":
            if (tag.indexOf("Paint") !== -1) {
                return 2.0;
            } else return 1;
        case "Medicine+":
            if (tag.indexOf("Medicine") !== -1) {
                return 1.5;
            } else return 1;
        case "Tool+":
            if (tag.indexOf("Tool") !== -1) {
                return 1.2;
            } else return 1;
        default:
            return 1;
    }
}

function formatPhoto(photo) {
    let message = "\n§6ID photo:§f " + photo.id + ", day " + photo.day + "§r\n";
    for (let i = 0; i < photo.objects.length; i++) {
        let obj = photo.objects[i];
        message += "\n§2Object§f: " + (i + 1) + "§r\n";
        message += "Type: " + obj.type + "§r\n";
        message += "ID object: §n" + obj.objectId + "§r\n";
        message += "Position: §cx=" + obj.objectsPos.x + "§r, §ay=" + obj.objectsPos.y + "§r, §9z=" + obj.objectsPos.z + "§r\n";
        message += "CostCoef: " + obj.distantCoef + "§r\n";
        message += "Cost:§e " + obj.cost + "§r\n";
    }
    return message;
}

function removeDuplicates(data) {
    var mapsByDay = {};

    data.forEach(function(entry) {
        var day = entry.day;

        if (!mapsByDay.hasOwnProperty(day)) {
            mapsByDay[day] = {};
        }

        var map = mapsByDay[day];

        entry.objects.forEach(function(obj) {
            if (obj.type === 'block') {
                var key = obj.objectId + "_" + obj.objectsPos.x + "_" + obj.objectsPos.y + "_" + obj.objectsPos.z;

                if (!map.hasOwnProperty(key) || (map[key].cost * map[key].distantCoef) < (obj.cost * obj.distantCoef)) {
                    map[key] = obj;
                }
            } else if (obj.objectId === 'deer') {
                var key
                obj.description == "Олень" ? key = obj.objectId + "_1" : key = obj.objectId + "_2"
                if (!map.hasOwnProperty(key) || (map[key].cost * map[key].distantCoef) < (obj.cost * obj.distantCoef)) {
                    map[key] = obj;
                }
            }
        });
    });

    var result = [];

    data.forEach(function(entry) {
        var day = entry.day;
        var map = mapsByDay[day];

        var filteredObjects = entry.objects.filter(function(obj) {
            if (obj.type === 'block') {
                var key = obj.objectId + "_" + obj.objectsPos.x + "_" + obj.objectsPos.y + "_" + obj.objectsPos.z;
                return map.hasOwnProperty(key) && map[key] === obj;
            } else if (obj.objectId === 'deer') {
                var key
                obj.description == "Олень" ? key = obj.objectId + "_1" : key = obj.objectId + "_2"
                return map.hasOwnProperty(key) && map[key] === obj;
            }
            return true;
        });

        var newEntry = assignGG({}, entry);
        newEntry.objects = filteredObjects;

        result.push(newEntry);
    });

    return result;
}

function assignGG(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

function canPickup(player, compound) {
    let fulledStacks = 0;
    
    for (let i = 0; i < 9; i++) {
        let stack = player.getInventory().getStack(i);

        if (!stack.isEmpty()) {
            fulledStacks++;
        }
        if (compound.getString("id") == stack.getItem().getId()) {
            if (compound.getByte("Count") <= stack.getMaxCount() - stack.getCount()) {
                fulledStacks--;
            }
        }
    }
    if (fulledStacks != 9) return true;
    return false;
}