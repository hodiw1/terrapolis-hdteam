const houseBoxs = [
    mappet.box(-12.8, 20.5, 29.8, 1.8, 26, 17.2), 
    mappet.box(-8.5, 20.5, 18.5, -4.5, 26, 13.5)
]

const spawnBoxs = [
    mappet.box(11, 21, 32, -20, 21, 51),
    mappet.box(-21, 21, 36, -28, 21, 51),
    mappet.box(-11, 21, 0, -44, 21, 12),
    mappet.box(-23, 21, 13, -44, 21, 23),
    mappet.box(-34, 21, 38, -44, 21, 24)
]

const morphSettings = [
"{Skin:\"b.a:empty/skins/texture.png\",Scale:0.75f,CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{P:[0.0f,5.25f,-5.8f],R:[60.0f,0.0f,0.0f]}}},BodyParts:[{Limb:\"cube\",Morph:{Hitbox:{Eye:0.9f,Sneak:1.65f,Enabled:1b,Height:0.2f},List:[{Random:0.0f,SetDuration:0b,Morph:{Pose:{Pose:{bone:{},glow:{C:-16732160,G:1.0f}}},Transition:{Interp:18,Animates:1b},Skin:\"c.s:hw_doska/skins/doska_geo.png\",Name:\"chameleon.hw_doska\",ForcedSettings:0b},Duration:60.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{Pose:{bone:{},glow:{}}},Transition:{Interp:21,Animates:1b},Skin:\"c.s:hw_doska/skins/doska_geo.png\",Name:\"chameleon.hw_doska\",ForcedSettings:0b},Duration:20.0f,EndPoint:1b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}},{R:[100.0f,0.0f,0.0f],S:[0.75f,0.75f,0.75f],T:[0.0f,-0.2f,0.0f],Limb:\"cube\",Morph:{Lighting:0b,Color:4521780,Label:\"Настройки\",Name:\"label\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b}", 
"{Skin:\"b.a:empty/skins/texture.png\",Scale:0.75f,CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{P:[0.0f,5.25f,-5.8f],R:[60.0f,0.0f,0.0f]}}},BodyParts:[{Limb:\"cube\",Morph:{Hitbox:{Eye:0.9f,Sneak:1.65f,Enabled:1b,Height:0.2f},List:[{Random:0.0f,SetDuration:0b,Morph:{Pose:{Pose:{bone:{},glow:{C:-9753856,G:1.0f}}},Transition:{Interp:18,Animates:1b},Skin:\"c.s:hw_doska/skins/doska_geo.png\",Name:\"chameleon.hw_doska\",ForcedSettings:0b},Duration:60.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Pose:{Pose:{bone:{},glow:{}}},Transition:{Interp:21,Animates:1b},Skin:\"c.s:hw_doska/skins/doska_geo.png\",Name:\"chameleon.hw_doska\",ForcedSettings:0b},Duration:20.0f,EndPoint:1b}],Name:\"sequencer\",ForcedSettings:0b,Offset:[0.0f,0.0f,0.0f]}},{R:[100.0f,0.0f,0.0f],S:[0.75f,0.75f,0.75f],T:[0.0f,-0.2f,0.0f],Limb:\"cube\",Morph:{Lighting:0b,Color:5197647,Label:\"Занято\",Name:\"label\",ForcedSettings:0b}}],Name:\"blockbuster.empty\",ForcedSettings:0b}"]

const difficultyCustomSetting = {
    "dayCount":           [1, [1, 14], "дн.", "Количество дней#Сколько всего дней будет в игре"],
    "dayTime":            [15, [60, 600], "мин.", "Время (День)#Продолжительность дня в минутах"],
    "nigthTime":          [15, [60, 600], "мин.", "Время (Вечер)#Продолжительность вечера в минутах"],
    "doomsdayTime":       [5, [10, 60], "сек.", "Время (Ночь)#Продолжительность ночи в секунах"],
    "guestsCount":        [1, [1, 6], "чел.", "Гостей за вечер#Сколько новых гостей сможет прийти за один вечер"],
    "guestsNeed":         [1, [1, 6], "чел.", "Требуется гостей#Сколько гостей должно находиться в доме к концу игры, чтобы одержать победу"],
    "maxMonsters":        [1, [1, 6], "чел.", "Всего нечисти#Максимальное количество нечисти, которое может находится в доме [7(Смерть нечисти отнимает общее количество на 1 единицу)"],
    "freezingSpeed":      [0.1, [0.1, 3], "x", "Скорость обморожения#Как быстро будут замерзать игроки на улице во время плохой погоды"],
    "weatherChance":      [10, [0, 100], "%", "Плохая погода#С каким шансом на утро будет плохая погода"],
    "scrapChance":        [5, [0, 50], "%", "Металлолом#Вероятность вытащить металлолом из коробок"],
    "boxItemChance":      [5, [0, 50], "%", "Предметы#Вероятность вытащить случайный предмет из коробок"],
    "doorStartHp":        [5, [1, 100], "%", "Cостояние двери#Сколько процентов прочности будет у двери в начале игры"],
    "doorBreak":          [5, [0, 100], "%", "Разрушение двери#Сколько процентов прочности будет тратить дверь каждый день"],
    "doorHurt":           [5, [0, 100], "%", "Урон по двери#Сколько процентов урона двери сможет нанести нечисть во время ночи"],
    "doorRepair":         [5, [0, 100], "%", "Починка двери#Сколько процентов прочности восполнит дверь при починке"],
    "starvation":         [1, [1, 7], "дн.", "Голод нечисти#Сколько дней нечисть сможет прожить без убийств"],
    "damageOwner":        [1, [1, 10], "♥", "Урон хозяину#Сколько единиц урона нанесёт нечисть хозяину во время ночи"],
    "ownerHp":            [1, [1, 10], "♥", "Здоровье хозяина#Сколько всего единиц здоровья у хозяина"],
    "healOwner":          [1, [1, 10], "♥", "Лечение хозяина#Сколько единиц здоровья восполнит хозяин при помощи [2мед. набора"]
};

const difficultySettings = {
    "startAmmo": 1,
    "owner": "Случайно",
    "monstersKill": 1,
    "dayCount": 7,
    "dayTime": 240,            
    "nigthTime": 180,          
    "doomsdayTime": 20,       
    "guestsCount": 2,  
    "guestsNeed": 2,
    "maxMonsters": 2,       
    "freezingSpeed": 1.0,      
    "weatherChance": 70,      
    "scrapChance": 35,        
    "boxItemChance": 10,  
    "doorStartHp": 70,     
    "doorBreak": 10,  
    "doorHurt": 25,        
    "doorRepair": 10,         
    "starvation": 2,        
    "damageOwner": 1,  
    "ownerHp": 3,
    "healOwner": 1
}

const itemsName = {
    "hnt:medkit": "Аптечка",
    "hnt:scrap1": "Детали",
    "hnt:scrap2": "Детали",
    "hnt:scrap3": "Детали",
    "hnt:hammer": "Молоток",
    "hnt:ammo": "Патроны",
    "hnt:mineral3": "Камень изгнания",
    "hw25:magnifier": "Необычная лупа",
    "hw25:rope": "Верёвка",
    "hw25:shotgun": "Дробовик",
    "hw25:thermometer": "Градусник",
    "hw25:vetka": "Плотная ветка",
    "hw25:doska": "Доска нечисти",
    "hw25:snowball": "Снежок"
}

const useableBlocks = [
    "hw25:note",
    "hnt:cardboard",
    "hw25:outdoorclosed",
    "hw25:outdooropen",
    "hw25:intdoorclosed",
    "hw25:intdooropen",
    "hw25:curtainssingle",
    "hw25:curtainssingleopen",
    "hw25:curtainsdouble_l",
    "hw25:curtainsdouble_lopen",
    "hw25:curtainsdouble_r",
    "hw25:curtainsdouble_ropen",
    "hw25:snowdrift"
]

const itemsSpawnChances = {
    "": 26,
    "hw25:thermometer": 15,
    "hw25:magnifier": 15,
    "hnt:medkit": 12,
    "hw25:rope": 12,
    "hnt:ammo": 14,
    "hnt:mineral3": 16,
    "hw25:doska": 10
}


//список характеров странников
const strangerCharacter = [
    ["Добрый", "Не проявляй агрессию ни при каких обстоятельствах"],
    ["Молчаливый", "Говори только тогда, когда к тебе обращаются"],
    ["Грубый", "Веди себя агрессивно по отношению ко всем игрокам"],
    ["Глупый", "Веди себя так, будто тебе провели лоботомию"],
    ["Немой", "Ты не можешь использовать голосовой чат, общайся только жестами"],
    ["Стеснительный", "Тебе нужно заикаться и всего стесняться"],
    ["Безумный", "Тебе нужно постоянно хихикать и просто быть безумцем"],
    ["Уверенный", "Ты должен верить в свои слова до последнего, даже если это не правда"],
    ["Трусливый", "Ты должен бояться всего и постоянно вздрагивать от страха"],
    ["Любопытный", "Ты должен везде совать свой нос и задавать много вопросов"],
    ["Ворчливый", "Ты должен постоянно жаловаться на всё подряд"],
    ["Загадочный", "Говори загадками и намёками, никогда не говори прямо"],
    ["Драматичный", "Преувеличивай любую ситуацию и веди себя как в театре"],
    ["Сонный", "Ты должен постоянно зевать и говорить уставшим голосом"],
    ["Самовлюблённый", "Ты должен постоянно говорить о своей красоте и величии"],
    ["Грустный", "Ты должен во всём видеть только плохое и предрекать неудачу"]
];

//список поведения странников
const strangerBehaviour = [
    ["Одиночка", "Ты должен всегда находиться подальше от игроков", "держаться от всех в стороне"],
    ["Компаньон", "Ты должен всегда находиться рядом с игроками", "держаться рядом со всеми"],
    ["Честный", "Ты должен всегда говорить правду, даже если ты нечисть", "быть честной"],
    ["Лжец", "Ты всегда должен врать", "лгать"],
    ["Параноик", "Ты должен постоянно подозревать других путников", "быть параноидальной"],
    ["Паникёр", "Ты должен сеять панику при любой возможности", "паниковать"],
    ["Хозяинофоб", "Ты должен прятаться от хозяина в его доме", "прятаться от хозяина"],
    ["Подлиза", "Ты должен поддерживать любые решения хозяина дома", "подлизываться"],
    ["Ленивый", "Ты настолько ленив, что не хочешь даже передвигаться", "быть ленивой"],
    ["Жадный", "Ты ни за что не должен отдавать свои предметы", "быть жадной"],
    ["Мимик", "Ты должен копировать поведение и речь других игроков", "копировать повадки и речь людей"],
    ["Щедрый", "Ты должен всегда отдавать свои предметы", "быть щедрой"]
]

const stages = [
    "day",
    "night",
    "sleep"
];

const gameDataOrig = {
    stage: "day",
    cycle: 0,
    time: 120,
    isContinues: true,
    door: 70
};

const roles = [
    "stranger",
    "monster",
    "owner"
];

const maleNames = [
    "Артур",
    "Каспиан",
    "Сильвестр",
    "Лео",
    "Винсент",
    "Эдгар",
    "Орландо",
    "Люциус",
    "Грегор",
    "Дориан",
    "Майло",
    "Феликс",
    "Джек",
    "Себастьян",
    "Хьюго",
    "Освальд",
    "Сэм",
    "Морфеус",
    "Калеб",
    "Декстер",
    "Рассел",
    "Виктор",
    "Джаспер",
    "Роман",
    "Квентин",
    "Зефир",
    "Итан",
    "Нейтан",
    "Ларс",
    "Финн",
    "Гастон",
    "Рори",
    "Маркус",
    "Оливер",
    "Хавьер",
    "Джонатан",
    "Ян",
    "Теодор",
    "Реми",
    "Клаус",
    "Эмиль",
    "Рейнард",
    "Грегори",
    "Райан",
    "Леон",
    "Антон",
    "Без имени"
];

const femaleNames = [
    "Аврора",
    "Беатрис",
    "Селена",
    "Рита",
    "Луна",
    "Таби",
    "Элли",
    "Сири",
    "Кори",
    "Вивзи",
    "Хлоя",
    "Уилли",
    "Ингрид",
    "Марта",
    "Харпер",
    "Эмма",
    "Лори",
    "Джинкс",
    "Рейвен",
    "Бриджит",
    "Фрейя",
    "Скарлетт",
    "Лира",
    "Хейзи",
    "Мира",
    "Лина",
    "Амари",
    "Стелла",
    "Фиби",
    "Роуди",
    "Зара",
    "Люси",
    "Роуз",
    "Эйприл",
    "Джеки",
    "Клэр",
    "Астра",
    "Руби",
    "Лили",
    "Джесси",
    "Вай",
    "Викки",
    "Джилл",
    "Хельга",
    "Без имени"
];

const baseMorphCompound = mappet.createCompound("{Transition:{Interp:11,Animates:1b,Duration:8},Skin:\"c.s:pl_male/skins/nzch.png\",Scale:0.95f,Name:\"chameleon.pl_male\",ForcedSettings:0b}"); 

const bedsProp = [
    {
        "playerPos": mappet.vector(-2.5, 22, 24.5),
        "pos": mappet.vector(-3.5, 22.5, 24.3),
        "rot": 0
    },
    {
        "playerPos": mappet.vector(-0.5, 22, 24.5),
        "pos": mappet.vector(0.5, 22.5, 24.3),
        "rot": 0
    },
    {   
        "playerPos": mappet.vector(-0.5, 22, 20.5),
        "pos": mappet.vector(-0.3, 22.5, 21.5),
        "rot": 90
    },
    {
        "playerPos": mappet.vector(-0.5, 22, 19.5),
        "pos": mappet.vector(-0.3, 22.5, 18.5),
        "rot": 90
    },
    {
        "playerPos": mappet.vector(-10.5, 22, 19.5),
        "pos": mappet.vector(-10.7, 22.5, 18.5),
        "rot": 270
    },
    {
        "playerPos": mappet.vector(-10.5, 22, 21.5),
        "pos": mappet.vector(-10.7, 22.5, 22.5),
        "rot": 270
    }
]

const playerDataOrig = {
    "hp": 1,
    "role": "",
    "name": "",
    "character": "",
    "behaviour": "",
    "temperature": 36.6
}