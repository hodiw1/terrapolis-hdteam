const saleableItems = [{
        id: "hnt:scrap1",
        name: "Металлолом",
        cost: 8,
        sentence: "кг.",
        tag: "Item,Metal",
    },
    {
        id: "hnt:scrap2",
        name: "Металлолом",
        cost: 8,
        sentence: "кг.",
        tag: "Item,Metal",
    },
    {
        id: "hnt:scrap3",
        name: "Металлолом",
        cost: 8,
        sentence: "кг.",
        tag: "Item,Metal",
    },
    {
        id: "hnt:wireroll",
        name: "Моток проводов",
        cost: 5,
        sentence: "м.",
        tag: "Item,Metal",
    },
    {
        id: "hnt:spray",
        name: "Спрей-краска",
        cost: 8,
        sentence: "шт.",
        tag: "Item,Paint",
    },
    {
        id: "hnt:paintcan",
        name: "Банка с краской",
        cost: 18,
        sentence: "шт.",
        tag: "Item,Paint",
    },
    {
        id: "hnt:pliers",
        name: "Плоскогубцы",
        cost: 15,
        sentence: "шт.",
        tag: "Item,Tool",
    },
    {
        id: "hnt:hammer",
        name: "Молоток",
        cost: 12,
        sentence: "шт.",
        tag: "Item,Tool",
    },
    {
        id: "hnt:crowbar",
        name: "Лом",
        cost: 19,
        sentence: "шт.",
        tag: "Item,Tool",
    },
    {
        id: "hnt:pickaxe",
        name: "Кирка",
        cost: 35,
        sentence: "%",
        tag: "Item,Tool",
    },
    {
        id: "hnt:shovel",
        name: "Лопата",
        cost: 23,
        sentence: "шт.",
        tag: "Item,Tool",
    },
    {
        id: "hnt:radio",
        name: "Радио",
        cost: 38,
        sentence: "шт.",
        tag: "Item,Item",
    },
    {
        id: "hnt:wallet",
        name: "Кошелёк",
        cost: 10,
        sentence: "шт.",
        tag: "Item,Item",
    },
    {
        id: "hnt:cellphone",
        name: "Сотовый телефон",
        cost: [18, 58],
        sentence: ["Неисправный", "Исправный"],
        tag: "Item,Item",
    },
    {
        id: "hnt:lighter",
        name: "Зажигалка",
        cost: [14, 45],
        sentence: ["Обычная", "Брендовая"],
        tag: "Item,Item",
    },
    {
        id: "hnt:battery",
        name: "Аккумулятор",
        cost: 79,
        sentence: "шт.",
        tag: "Item,Item",
    },
    {
        id: "hnt:drivlic",
        name: "Водительские права",
        cost: [20, 55],
        sentence: ["Просроченные", "Действующие"],
        tag: "Item,Item,Rights",
    },
    {
        id: "hnt:gascan",
        name: "Канистра топлива",
        cost: 30,
        sentence: "л.",
        tag: "Item,Fuel",
    },
    {
        id: "hnt:silverbunny",
        name: "Серебряный зайчик",
        cost: 130,
        sentence: "кг.",
        tag: "Item,Artefact",
    },
    {
        id: "hunt:katana",
        name: "Обломок [cКатаны...",
        cost: 90,
        sentence: "шт.",
        tag: "Item,Artefact",
    },
    {
        id: "hunt:demonbook",
        name: "Книга 'Мифы о Демонах'",
        cost: 130,
        sentence: "шт.",
        tag: "Item,Artefact",
    },
    {
        id: "hnt:medkit",
        name: "Мед. набор",
        cost: 55,
        sentence: "шт.",
        tag: "Item,Medicine",
    },
    {
        id: "hnt:beartrapitem",
        name: "Капкан",
        cost: 28,
        sentence: "шт.",
        tag: "Item,Defence,Trap",
    },
    {
        id: "hnt:ammo",
        name: "Коробка патронов",
        cost: 24,
        sentence: "шт.",
        tag: "Item,Defence",
    },
    {
        id: "hnt:airhornitem",
        name: "Гудок",
        cost: 36,
        sentence: "шт.",
        tag: "Item,Defence",
    },
    {
        id: "hnt:chuvirla",
        name: "Игрушка-чувырла",
        cost: 44,
        sentence: "шт.",
        tag: "Item,Artefact",
    },
    {
        id: "hnt:goldduck",
        name: "Золотая утка",
        cost: 200,
        sentence: "кг.",
        tag: "Item,Artefact",
    },
    {
        id: "hnt:mushroom3",
        name: "Подарок (Фиолетовый)",
        cost: 16,
        sentence: "шт.",
        tag: "Item,Mushroom",
    },
    {
        id: "hnt:mushroom2",
        name: "Подарок (Красный)",
        cost: 6,
        sentence: "шт.",
        tag: "Item,Mushroom",
    },
    {
        id: "hnt:mushroom1",
        name: "Подарок (Синий)",
        cost: 4,
        sentence: "шт.",
        tag: "Item,Mushroom",
    },
    {
        id: "hnt:mineral1",
        name: "Минерал",
        cost: 25,
        sentence: "шт.",
        tag: "Item,Mineral",
    },
    {
        id: "hnt:mineral2",
        name: "Минерал",
        cost: 8,
        sentence: "шт.",
        tag: "Item,Mineral",
    },
    {
        id: "hnt:mineral3",
        name: "Минерал",
        cost: 15,
        sentence: "шт.",
        tag: "Item,Mineral",
    },
    {
        id: "hnt:mineral4",
        name: "Минерал",
        cost: 5,
        sentence: "шт.",
        tag: "Item,Mineral",
    },
    {
        id: "hnt:klekoshnikberry",
        name: "Клекошник",
        cost: 3,
        sentence: "шт.",
        tag: "Item,Berry",
    },
    {
        id: "hunt:robot",
        name: "Игрушка-робот",
        cost: 56,
        sentence: "шт.",
        tag: "Item,Artefact",
    },
];
const photoObjectsList = [{
        id: "wolf",
        type: "entity",
        description: "Монстр",
        cost: 19,
    },
    {
        id: "deer",
        type: "entity",
        description: ["Олень", "Труп оленя"],
        cost: [19, 25],
    },
    {
        id: "hnt:step2",
        type: "block",
        description: "След",
        cost: 24,
    },
    {
        id: "hnt:step1",
        type: "block",
        description: "След",
        cost: 24,
    },
    {
        id: "hnt:bones1",
        type: "block",
        description: "Кости",
        cost: 29,
    },
    {
        id: "hnt:scratches1",
        type: "block",
        description: "Царапины",
        cost: 27,
    },
    {
        id: "hnt:clothes1",
        type: "block",
        description: "Останки",
        cost: 23,
    },
    {
        id: "hnt:clothes2",
        type: "block",
        description: "Останки",
        cost: 23,
    },
    {
        id: "hnt:blood1",
        type: "block",
        description: "Кровь",
        cost: 29,
    },
    {
        id: "hnt:scratchestree",
        type: "block",
        description: "Следы когтей",
        cost: 36,
    }
];

const heavyItems = ["hnt:gascan", "hnt:battery", "hnt:wireroll", "hnt:paintcan"];

const generationItems = [
    ["hnt:scrap1", "hnt:scrap2", "hnt:scrap3", "hnt:spray", "hnt:paintcan", "hnt:wireroll", "hnt:pliers", "hnt:hammer", "hnt:lighter", "hnt:note"],
    ["hnt:chuvirla", "hnt:beartrapitem", "hnt:crowbar", "hnt:battery", "hnt:drivlic", "hnt:wireroll", "hnt:gascan", "hnt:silverbunny", "hnt:lighter", "hnt:radio"],
    ["hnt:wallet", "hnt:pickaxe", "hnt:shovel", "hnt:medkit", "hnt:ammo", "hnt:airhornitem", "hnt:gascan", "hnt:cellphone", "hnt:goldduck", "hunt:katana", "hunt:robot"]
];

const boxItems = [{
        id: "hnt:beartrapitem",
        rarity: "high"
    },
    {
        id: "hnt:medkit",
        rarity: "high"
    },
    {
        id: "hnt:ammo",
        rarity: "high"
    },
    {
        id: "hnt:airhornitem",
        rarity: "medium"
    },
    {
        id: "hnt:pickaxe",
        rarity: "medium"
    },
    {
        id: "hnt:shovel",
        rarity: "medium"
    },
    {
        id: "hnt:crowbar",
        rarity: "low"
    },
    {
        id: "hnt:hammer",
        rarity: "low"
    },
    {
        id: "hnt:pliers",
        rarity: "low"
    }
];
const useableBlocks = {
    "camera": "Камера",
    "cameraupgraded": "Камера",
    "laptop_on": "Ноутбук",
    "laptop": "Ноутбук",
    "pickaxe": "Кирка",
    "shovel": "Лопата",
    "radio": "Радио",
    "pliers": "Плоскогубцы",
    "silverbunny": "Серебряный зайчик",
    "wallet": "Кошелёк",
    "wireroll": "Моток проводов",
    "goldduck": "Золотая утка",
    "hammer": "Молоток",
    "gascan": "Канистра топлива",
    "drivlic": "Водительские права",
    "crowbar": "Лом",
    "battery": "Аккумулятор",
    "beartrap": "Капкан",
    "beartraparmed": "Капкан",
    "beartrapitem": "Капкан",
    "cellphone": "Сотовый телефон",
    "spray": "Спрей - краска",
    "airhorn": "Гудок",
    "mineralrock1": "Минеральный камень",
    "mineralrock2": "Минеральный камень",
    "mineralrock3": "Минеральный камень",
    "mineralrock4": "Минеральный камень",
    "sellbox": "Ящик для продажи",
    "sellbox_open": "Ящик для продажи",
    "generator": "Генератор",
    "generator_on": "Генератор",
    "generator_input": ["Топливный бак", "Тумблер"],
    "supplycrate": "Ящик с припасами",
    "supplycrate_open": "Ящик с припасами",
    //"tourboard": "Продам гараж",
    "klekoshnik": "Клекошник",
    "katana": "Обломок [cкатаны",
    "demonbook": "Книга ''[dМифы о Демонах[f''",
    "klekoshnikempty": "Клекошник",
    "klekoshnikberry": "Клекошник",
    "chuvirla": "Странная игрушка",
    "mushroom1": "Подарок",
    "mushroom2": "Подарок",
    "mushroom3": "Подарок",
    "lighter": "Зажигалка",
    "scrap1": "Металлолом",
    "scrap2": "Металлолом",
    "scrap3": "Металлолом",
    "ammo": "Патроны",
    "medkit": "Мед. Набор",
    "shotgun": "Дробовик",
    "cameralens": "Объектив",
    "mineral1": "Минерал",
    "mineral2": "Минерал",
    "mineral3": "Минерал",
    "mineral4": "Минерал",
    "paintcan": "Банка с краской",
    "airhornitem": "Гудок",
    "note": "Записка",
    "laptopbattery": "Аккумулятор для ноутбука",
    "sdcard": "SD-Карта",
    "robot": "Игрушка",
};

const boxText = [
    'Кому это читать - не знаю, но пароль\nот ящика с припасами в лесу - [e{code}[f.\nНадеюсь, это поможет в нужный момент.',
    'Для тех, кто знает цену припасам: \nпароль от ящика в лесу - [e{code}[f. \nПомогайте друг другу!',
    'Часто спрятанные сокровища остаются \nнезамеченными. \nПароль от ящика с припасами - [e{code}[f. \nПусть они вам пригодятся.',
    'Потерялся в лесу? Не отчаивайся! \nПароль от ящика с припасами - [e{code}[f. \nНадеюсь, это поможет тебе выжить.',
    'Путнику, остановившемуся на отдых! \nПароль от ящика с припасами - [e{code}[f. \nПомните об уходе за природой!',
    'Внимание, посетителям леса! \nПароль от ящика с припасами - [e{code}[f. \nПользуйтесь с умом!'
];

const gameEvents = [
    "Metal+",
    "Mineral-",
    "Artefact+",
    "Item+",
    "Photo+",
    "Defence+",
    "Rights+",
    "Trap+",
    "Fuel+",
    "Mushroom-",
    "Artefact+Berry+",
    "Artefact-",
    "Paint+",
    "Medicine+",
    "Mushroom+",
    "Metal-",
    "Tool+"
];

const newsText = [
    '[bИнвесторы радуются[f: \nМеталл значительно подорожал за последние сутки. \nКак это повлияет на строительство и промышленность?',
    '[bЭкологическая тревога[f: Учёные предупреждают: из-за загрязнения воздуха наблюдается всплеск популяции редких минералов! Сегодня продажа минералов значительно обесценилась.',
    '[bПовышенный спрос на артефакты[f: Коллекционеры готовы платить огромные деньги за старинные артефакты и необычные находки! Сегодня редкие предметы можно продать по завышенной цене.',
    '[bЭкономический подъём[f: На фоне экономического роста цены на все товары поднялись. Сегодня покупки в интернет-магазине будут дороже на 30%.',
    '[bРост интереса к фотографиям[f: Коллекционеры и учёные проявляют повышенный интерес к фотографиям редких объектов! Стоимость уникальных снимков сегодня выросла на 50%.',
    '[bУвеличение спроса на оружие[f: Из-за роста преступности в мире вырос спрос на оружие. \nЦены на боеприпасы и защитное оборудование в интернет-магазине значительно возросли.',
    '[bПропажа личных данных[f: В новостях сообщают о массовой краже водительских прав. Будьте осторожны – их цена на чёрном рынке подскочила.',
    '[bОпасные ловушки[f: Охотники массово закупают капканы! Стоимость медвежьих капканов на рынке выросла на 50%. Найти их сейчас можно с огромной прибылью.',
    '[bРост спроса на топливо[f: Из-за перебоев с поставками, стоимость канистр с топливом на чёрном рынке резко возросла. Теперь найти и продать топливо стало ещё выгоднее!',
    '[bНовогодний Кризис[f: В связи с окончанием 2024 года из-за недостатка продаж, Новогодние Подарки обесценились на 35%',
    '[bНеобычные находки[f: Коллекционеры начали скупать странные игрушки и редкие ягоды вроде клекошника. Их цена на рынке подскочила вдвое!',
    '[bУпадок спроса на артефакты[f: Коллекционеры потеряли интерес к старинным находкам. Серебряный зайчик и золотая утка подешевели на 30%.',
    '[bБорьба с вандализмом[f: Сообщается о резком росте случаев вандализма, и поэтому цена на банки с краской и красящие спреи выросла на 50%.',
    '[bРост цен на медикаменты[f: Таблетки и медицинские принадлежности резко подорожали на 40%. Достаём подорожники?',
    '[bПраздничный Бум![f: В связи с окончанием 2024 года Цены на Новогодние Подарки значительно возросли на 50% Теперь будем закупаться по полной?',
    '[bСезонное понижение цен на металлолом[f: Цены на металлолом упали на 25%. Сегодня продажа металла принесёт меньше дохода.',
    '[bДефицит инструментов[f: Из-за проблем с поставками инструменты в магазинах подскочили в цене. Чем теперь нам забивать гвозди?'
];

const magObjects = [{
        cost: 449,
        id: "huntclient:shotgun",
        name: "Дробовик",
        description: "Одноствольный дробовик .12 калибра [4Для покупки нужно погасить долг[f.",
        x: -0.09,
        y: 0.719,
        z: 0.106,
        yaw: -36,
        pitch: 15,
        distance: 4.6,
        fov: 10
    },
    {
        cost: 49,
        id: "hnt:ammo",
        name: "Патроны",
        description: "Подойдут для дробовика .12 калибра [3Продаются поштучно[f.",
        x: -0.001,
        y: 0.091,
        z: 0.008,
        yaw: 598,
        pitch: 26,
        distance: 2.2,
        fov: 10
    },
    {
        cost: 99,
        id: "hnt:beartrapitem",
        name: "Капкан",
        description: "Как бы самому не попасться... [3Позволяет ловить зверей[f.",
        x: -0.04,
        y: 0.154,
        z: 0.032,
        yaw: 223,
        pitch: 29,
        distance: 3.6,
        fov: 10
    },
    {
        cost: 144,
        id: "hnt:medkit",
        name: "Мед. Набор",
        description: "Обязателен для нашей деятельности. [3Восстанавливает здоровье[f.",
        x: -0.014,
        y: 0.075,
        z: 0.026,
        yaw: 132,
        pitch: 38,
        distance: 2.5,
        fov: 10
    },
    {
        cost: 106,
        id: "hnt:gascan",
        name: "Топливо",
        description: "Канистра бензина объёмом 5л. [3Позволяет заправлять генератор[f.",
        x: 0.0,
        y: 0.3,
        z: -0.01,
        yaw: 129,
        pitch: 17,
        distance: 4.1,
        fov: 10
    },
    {
        cost: 129,
        id: "hnt:airhornitem",
        name: "Гудок",
        description: "Громкий, шумный, НО ПОЛЕЗНЫЙ! [3Отпугивает агрессивных зверей[f.",
        x: 0.036,
        y: 0.22,
        z: 0.048,
        yaw: 134,
        pitch: 23,
        distance: 3.1,
        fov: 10
    },
    {
        cost: 312,
        id: "hnt:cameralens",
        name: "Объектив",
        description: "Для любителей поснимать всякое. [3Фотографии станут более качественными[f.",
        x: -0.016,
        y: 0.062,
        z: 0.002,
        yaw: 215,
        pitch: 20,
        distance: 2,
        fov: 10
    },
    {
        cost: 214,
        id: "hnt:crowbar",
        name: "Лом",
        description: "Против лома нет приёма.           [3Может разрушать заколоченные доски[f.",
        x: 0.006,
        y: 0.053,
        z: -0.019,
        yaw: 502,
        pitch: 35,
        distance: 2.9,
        fov: 10
    },
    {
        cost: 274,
        id: "hnt:pickaxe",
        name: "Кирка",
        description: "Кирка, просто кирка.          [3Позволяет добывать минералы из камней[f.",
        x: 0.015,
        y: 0.071,
        z: 0.021,
        yaw: 216,
        pitch: 37,
        distance: 3.6,
        fov: 10
    },
    {
        cost: 159,
        id: "hnt:laptopbattery",
        name: "Аккумулятор",
        description: "В нашем ноуте аккум сдох...               [3У ноутбука появится заряд батареи[f.",
        x: 0.027,
        y: 0.044,
        z: 0.005,
        yaw: 216,
        pitch: 37,
        distance: 2.2,
        fov: 10
    },
    {
        cost: 219,
        id: "hnt:sdcard",
        name: "SD - карта",
        description: "Фоток много не бывает...    ???      [3Увеличивает объём памяти камеры[f.",
        x: 0.022,
        y: 0.024,
        z: -0.017,
        yaw: 216,
        pitch: 37,
        distance: 0.85,
        fov: 10
    },
];

function getRandomRarity(rarityProb) {
    let random = Math.random() * 100;

    if (random < rarityProb.low) {
        return "low";
    } else if (random < rarityProb.low + rarityProb.medium) {
        return "medium";
    } else {
        return "high";
    }
}

function getRandomItemByRarity(items, rarityProb) {
    let rarity = getRandomRarity(rarityProb);
    let filteredItems = items.filter(function(item) {
        return item.rarity === rarity;
    });
    let randomIndex = Math.floor(Math.random() * filteredItems.length);
    return filteredItems[randomIndex];
}

function getServerFromWorld(world) {
    return mappet.getMappetServer(world.getMinecraftWorld().func_73046_m());
}