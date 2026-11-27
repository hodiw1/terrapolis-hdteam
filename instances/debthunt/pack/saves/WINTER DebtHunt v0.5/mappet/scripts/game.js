const Dispatcher = Java['type']('nzteam.theuran.huntclient.network.Dispatcher'),
    PacketReloadChunks = Java['type']('nzteam.theuran.huntclient.network.common.PacketReloadChunks');

function main(_0x43eadb) {
    end(_0x43eadb);
}

function start(_0x1df153) {
    _0x1df153['executeCommand']('/modelblock\x20property\x2032\x205\x20-16\x20enabled\x200'), _0x1df153['executeCommand']('/modelblock\x20property\x2041\x206\x20-19\x20enabled\x200'), _0x1df153['executeCommand']('/modelblock\x20property\x2041\x205\x20-23\x20enabled\x200'), _0x1df153['executeCommand']('/modelblock\x20property\x2035\x204\x20-20\x20enabled\x200');
    let _0x4a8ddb = {
            'hp': 0x2,
            'isReady': 0x0
        },
        _0x203e8a = Math['round'](mappet['random'](0x1, 0x5));
    _0x203e8a == 0x1 ? _0x1df153['server']['getStates']()['setNumber']('Ghost', 0x1) : _0x1df153['server']['getStates']()['setNumber']('Ghost', 0x0);
    let _0x21ed2d = Java['from'](_0x1df153['getServer']()['getAllPlayers']()),
        _0xd51bd0 = JSON['parse'](_0x1df153['getServer']()['getStates']()['getString']('gameData')),
        _0x47cdd8 = JSON['parse'](_0x1df153['getServer']()['getStates']()['getString']('laptop')),
        _0x45a888 = JSON['parse'](_0x1df153['getServer']()['getStates']()['getString']('camera')),
        _0x1f1ffe = JSON['parse'](_0x1df153['getServer']()['getStates']()['getString']('timeData')),
        _0x4f42d2 = JSON['parse'](_0x1df153['getServer']()['getStates']()['getString']('wolfData')),
        _0x201d86 = JSON['parse'](_0x1df153['getServer']()['getStates']()['getString']('startSettings')),
        _0x2e0500 = [{
            'x': 0x25,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x26,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x27,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x28,
            'y': 0x15,
            'z': 0x8
        }],
        _0x946280 = _0x1df153['getServer']()['getWorld'](0x0),
        _0x5d2c2a = mappet['toNBT'](_0x946280['getTileEntity'](0x2c, 0x17, 0xb)['getMorph']());
    for (var _0x56fefb in _0x21ed2d) {
        let _0x352462 = Math['floor'](mappet['random'](_0x2e0500['length'])),
            _0x51c953 = _0x2e0500[_0x352462];
        _0x21ed2d[_0x56fefb]['closeHUD']('hurt_loop'), _0x21ed2d[_0x56fefb]['closeHUD']('statistics'), _0x21ed2d[_0x56fefb]['setupHUD']('loading'), _0x21ed2d[_0x56fefb]['getStates']()['setString']('gameStats', JSON['stringify'](_0x4a8ddb)), _0x21ed2d[_0x56fefb]['applyPotion'](mappet['getPotion']('slowness'), 0xf423f, 0x0, ![]), _0x21ed2d[_0x56fefb]['applyPotion'](mappet['getPotion']('instant_health'), 0xf423f, 0x0, ![]), _0x21ed2d[_0x56fefb]['setGameMode'](0x2), _0x21ed2d[_0x56fefb]['closeUI'](), _0x21ed2d[_0x56fefb]['getInventory']()['clear'](), _0x21ed2d[_0x56fefb]['setMorph'](mappet['createMorph']('{Hitbox:{Eye:0.9f,Sneak:1.65f,Enabled:1b,Height:1.8f},Pose:{Pose:{head:{},right_knee:{},right_arm:{},left_leg:{},torso:{},left_arm:{},right_leg:{},model:{},right_elbow:{},left_knee:{},left_elbow:{}}},Transition:{Interp:21,Duration:5},Skin:\x22' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skin'))['link'] + '\x22,Scale:0.925f,BodyParts:[{R:[0.0f,180.0f,0.0f],S:[' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['scaleX'] + 'f,' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['scaleY'] + 'f,' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['scaleZ'] + 'f],T:[' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['posX'] + 'f,' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['posY'] + 'f,' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['posZ'] + 'f],Limb:\x22head\x22,Morph:{Materials:{' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['materials'] + ':\x22' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['texture'] + '\x22},Settings:{Hands:1b},Name:\x22' + JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skinhead'))['model'] + '\x22}}],Settings:{Hands:1b},Name:\x22chameleon.hnt_' + (JSON['parse'](_0x21ed2d[_0x56fefb]['getStates']()['getString']('skin'))['type'] == 'fred' ? 'male' : 'female') + '\x22}')), _0x21ed2d[_0x56fefb]['setPosition'](_0x51c953['x'], _0x51c953['y'], _0x51c953['z']), _0x2e0500['splice'](_0x352462, 0x1), _0x21ed2d[_0x56fefb]['getStates']()['reset']('photoToUpload');
    } ['item', 'deer', 'corpse', 'photoTraker']['forEach'](function(_0x1bc48d) {
        _0x1df153['getServer']()['getEntities']('@e[mpid=' + _0x1bc48d + ']')['forEach'](function(_0x14b7b9) {
            _0x14b7b9['remove']();
        });
    }), _0xd51bd0['boxCode'] = Math['floor'](mappet['random'](0x3e8, 0x270f)), _0xd51bd0['gameStage'] = _0x201d86['gameStage'], _0xd51bd0['debtCount'] = _0x201d86['debtCount'], _0xd51bd0['daysLeft'] = _0x201d86['daysLeft'], _0x4f42d2['baseHP'] = _0x201d86['baseHP'], _0xd51bd0['deerKills'] = 0x0, _0x47cdd8['balance'] = Math['floor'](mappet['random'](0x64)), _0x47cdd8['posting'] = 0x0, _0x47cdd8['battery'] = 0x0, _0x47cdd8['battery_pack'] = ![], _0x47cdd8['occupiedBy'] = '', _0xd51bd0['gameStage'] == 'debt' ? _0x47cdd8['lockedItems'] = ['huntclient:shotgun'] : _0x47cdd8['lockedItems'] = [], _0x45a888['lensUp'] = ![], _0x45a888['memory'] = 0x5, _0x45a888['photoCount'] = 0x0, _0x1f1ffe['time'] = 0x12c, _0x1f1ffe['day'] = 0x1, _0x1f1ffe['now'] = 'day', _0x1f1ffe['freezed'] = 0x0, _0x4f42d2['currentHP'] = _0x4f42d2['baseHP'], _0x1df153['getServer']()['getStates']()['setString']('gameData', JSON['stringify'](_0xd51bd0)), _0x1df153['getServer']()['getStates']()['setString']('laptop', JSON['stringify'](_0x47cdd8)), _0x1df153['getServer']()['getStates']()['setString']('camera', JSON['stringify'](_0x45a888)), _0x1df153['getServer']()['getStates']()['setString']('timeData', JSON['stringify'](_0x1f1ffe)), _0x1df153['getServer']()['getStates']()['setString']('wolfData', JSON['stringify'](_0x4f42d2)), _0x1df153['getServer']()['getStates']()['setString']('saleBox', '[]'), _0x1df153['getServer']()['getStates']()['setString']('photos', '[]'), _0x1df153['getServer']()['getStates']()['setString']('photosPosted', '[]'), _0x1df153['getServer']()['getStates']()['setString']('purchasedItems', '[]'), _0x1df153['getServer']()['getStates']()['setString']('currentStatistics', '{\x22moneyEarned\x22:0,\x22itemsSold\x22:0,\x22daysLived\x22:0,\x22photosUpload\x22:0,\x22medkitUses\x22:0,\x22itemsPurchased\x22:0,\x22boardsBreak\x22:0,\x22trovesDigged\x22:0,\x22stumbles\x22:0,\x22deersKilled\x22:0,\x22fueled\x22:0,\x22boxesOpen\x22:0,\x22minerals\x22:0,\x22shots\x22:0,\x22klekoshnik\x22:0,\x22deaths\x22:0}'), _0x1df153['getServer']()['getStates']()['setString']('dayResultData', JSON['stringify']({
        'photosPosted': []
    })), _0x1df153['getServer']()['getStates']()['setNumber']('fuel', 0x0), _0x1df153['getServer']()['getStates']()['setNumber']('noteIsSpawned', 0x0), _0x1df153['getServer']()['getStates']()['setNumber']('playersReady', 0x0), _0x1df153['getServer']()['executeScript']('generation.js'), _0x5d2c2a['getCompound']('Pose')['getCompound']('Pose')['getCompound']('switch')['remove']('RX'), _0x5d2c2a['getCompound']('Pose')['getCompound']('Pose')['getCompound']('indicator')['setFloat']('SY', 0x0), _0x946280['getTileEntity'](0x2c, 0x17, 0xb)['setMorph'](mappet['createMorph'](_0x5d2c2a)), _0x946280['getTileEntity'](0x2c, 0x17, 0xb)['sendToAll'](!![]), _0x946280['getTileEntity'](0x28, 0x6, -0x15)['setEnabled'](!![]), _0x946280['getTileEntity'](0x28, 0x6, -0x15)['sendToAll'](!![]), _0x946280['setBlock'](mappet['createBlockState']('hnt:generator', 0x5), 0x2c, 0x15, 0xb), _0x946280['setGameRule']('doDaylightCycle', !![]), _0x21ed2d['forEach'](function(_0x166aa1) {
        _0x166aa1['closeHUD']('loading'), _0x1df153['scheduleScript'](0x14, function() {
            Dispatcher['sendTo'](new PacketReloadChunks(), _0x166aa1['getMinecraftPlayer']());
        });
    }), day(_0x946280, !![]), summonItem('hnt:camera', 0x1, mappet['vector'](40.5, 0x17, 12.5), _0x946280, mappet['createCompound']('{onBase:1b}')), summonItem('hnt:medkit', 0x1, mappet['vector'](38.5, 0x17, 12.5), _0x946280, mappet['createCompound']('{onBase:1b}')), summonItem('hnt:ammo', 0x1, mappet['vector'](44.5, 0x16, 4.5), _0x946280, mappet['createCompound']('{onBase:1b}')), summonItem('hnt:gascan', 0x1, mappet['vector'](35.5, 0x16, 5.5), _0x946280, mappet['createCompound']('{Fuel:' + mappet['random'](0x3)['toFixed'](0x1) + ',onBase:1b}'));
}

function end(_0x148e7b) {
    _0x148e7b['executeCommand']('/modelblock\x20property\x2032\x205\x20-16\x20enabled\x201'), _0x148e7b['executeCommand']('/modelblock\x20property\x2041\x206\x20-19\x20enabled\x201'), _0x148e7b['executeCommand']('/modelblock\x20property\x2041\x205\x20-23\x20enabled\x201'), _0x148e7b['executeCommand']('/modelblock\x20property\x2035\x204\x20-20\x20enabled\x201');
    let _0xe73d00 = _0x148e7b['getServer']()['getWorld'](0x0),
        _0x4c38e4 = JSON['parse'](_0x148e7b['getServer']()['getStates']()['getString']('timeData')),
        _0x58a288 = JSON['parse'](_0x148e7b['getServer']()['getStates']()['getString']('currentStatistics')),
        _0x54fccd = JSON['parse'](_0x148e7b['getServer']()['getStates']()['getString']('globalStatistics'));
    _0x58a288['daysLived'] = _0x4c38e4['day'], _0x148e7b['server']['getStates']()['setString']('currentStatistics', JSON['stringify'](_0x58a288));
    let _0x31e010 = {};
    Object['keys'](_0x54fccd)['forEach'](function(_0x207d9e) {
        _0x31e010[_0x207d9e] = _0x54fccd[_0x207d9e];
    });
    for (let _0x3358ee in _0x58a288) {
        _0x31e010[_0x3358ee] !== undefined && (_0x31e010[_0x3358ee] += _0x58a288[_0x3358ee]);
    }
    _0x148e7b['getServer']()['getStates']()['setString']('globalStatistics', JSON['stringify'](_0x31e010)), _0x4c38e4['freezed'] = 0x1, _0x148e7b['scheduleScript'](0x0, function(_0x196954) {
        _0x196954['getServer']()['getStates']()['setString']('timeData', JSON['stringify'](_0x4c38e4));
    }), _0x54fccd = JSON['parse'](_0x148e7b['getServer']()['getStates']()['getString']('globalStatistics')), _0x148e7b['getServer']()['getStates']()['has']('win') ? _0x54fccd['wins']++ : _0x54fccd['defeats']++, _0x148e7b['getServer']()['getStates']()['setString']('globalStatistics', JSON['stringify'](_0x54fccd)), _0x148e7b['getServer']()['getAllPlayers']()['forEach'](function(_0x5845ba) {
        _0x148e7b['scheduleScript'](0x14, function(_0x2eb913) {
            _0x5845ba['setPosition'](0x27, 2.5, -0x19);
        }), _0x148e7b['scheduleScript'](0x64, function() {
            let _0x1a18af = JSON['parse'](_0x148e7b['getServer']()['getStates']()['getString']('currentStatistics')),
                _0x1414bc = mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b},Skin:\x22b.a:empty/skins/texture.png\x22,CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{S:[1.0f,0.0f,1.0f]}}},BodyParts:[{T:[0.0f,-0.2f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22' + (_0x148e7b['getServer']()['getStates']()['has']('win') ? '[aПОБЕДА' : '[4ПОРАЖЕНИЕ') + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Денег\x20заработано:\x20[f' + _0x1a18af['moneyEarned'] + '[7$\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,0.65f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Товаров\x20продано:\x20[f' + _0x1a18af['itemsSold'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,1.05f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Дней\x20прожито:\x20[f' + _0x1a18af['daysLived'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,1.45f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Фото\x20загружено:\x20[f' + _0x1a18af['photosUpload'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,1.85f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Аптечек\x20применено:\x20[f' + _0x1a18af['medkitUses'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,2.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Предметов\x20куплено:\x20[f' + _0x1a18af['itemsPurchased'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,2.65f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Досок\x20сломано:\x20[f' + _0x1a18af['boardsBreak'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,3.05f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Кладов\x20вырыто:\x20[f' + _0x1a18af['trovesDigged'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,3.45f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Спотыканий:\x20[f' + _0x1a18af['stumbles'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,3.85f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Оленей\x20убито:\x20[f' + _0x1a18af['deersKilled'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,4.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Топлива\x20залито:\x20[f' + _0x1a18af['fueled']['toFixed'](0x1) + '\x20[7л.\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,4.65f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Ящиков\x20открыто:\x20[f' + _0x1a18af['boxesOpen'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,5.05f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Минералов\x20добыто:\x20[f' + _0x1a18af['minerals'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,5.45f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Выстрелов:\x20[f' + _0x1a18af['shots'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,5.85f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Клекошника\x20собрано:\x20[f' + _0x1a18af['klekoshnik'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,6.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Смертей:\x20[f' + _0x1a18af['deaths'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,6.8f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:70,Label:\x22\x5c\x5c[[eF[f]\x20Закрыть\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:1.0f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22},Duration:0.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Animation:{Interp:21,Animates:1b},Skin:\x22b.a:empty/skins/texture.png\x22,CustomPose:{Size:[1.0f,1.0f,1.0f],Poses:{cube:{}}},BodyParts:[{T:[0.0f,-0.2f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22' + (_0x148e7b['getServer']()['getStates']()['has']('win') ? '[a\x20ПОБЕДА' : '[4ПОРАЖЕНИЕ') + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Денег\x20заработано:\x20[f' + _0x1a18af['moneyEarned'] + '[7$\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,0.65f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Товаров\x20продано:\x20[f' + _0x1a18af['itemsSold'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,1.05f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Дней\x20прожито:\x20[f' + _0x1a18af['daysLived'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,1.45f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Фото\x20загружено:\x20[f' + _0x1a18af['photosUpload'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,1.85f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Аптечек\x20применено:\x20[f' + _0x1a18af['medkitUses'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,2.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Предметов\x20куплено:\x20[f' + _0x1a18af['itemsPurchased'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,2.65f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Досок\x20сломано:\x20[f' + _0x1a18af['boardsBreak'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,3.05f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Кладов\x20вырыто:\x20[f' + _0x1a18af['trovesDigged'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,3.45f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Спотыканий:\x20[f' + _0x1a18af['stumbles'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,3.85f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Оленей\x20убито:\x20[f' + _0x1a18af['deersKilled'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,4.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Топлива\x20залито:\x20[f' + _0x1a18af['fueled']['toFixed'](0x1) + '\x20[7л.\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,4.65f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Ящиков\x20открыто:\x20[f' + _0x1a18af['boxesOpen'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,5.05f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Минералов\x20добыто:\x20[f' + _0x1a18af['minerals'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,5.45f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Выстрелов:\x20[f' + _0x1a18af['shots'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,5.85f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Клекошника\x20собрано:\x20[f' + _0x1a18af['klekoshnik'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,6.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:140,Label:\x22[7Смертей:\x20[f' + _0x1a18af['deaths'] + '\x22,ShadowX:-0.0f,Name:\x22label\x22,Offset:5.0f}},{S:[0.9f,0.9f,0.9f],T:[0.0f,6.8f,0.0f],Limb:\x22cube\x22,Morph:{Background:-1879048192,Max:70,Label:\x22\x5c\x5c[[eF[f]\x20Закрыть\x22,ShadowX:-0.0f,Name:\x22label\x22}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}');
            _0x5845ba['setupHUD']('statistics'), _0x5845ba['changeHUDMorph']('statistics', 0x0, _0x1414bc);
        }), _0x5845ba['setGameMode'](0x2), _0x5845ba['closeHUD']('hurt_loop'), _0x5845ba['getStates']()['reset']('photoToUpload'), _0x5845ba['getInventory']()['clear']();
    }), _0x148e7b['scheduleScript'](0x6e, function() {
        _0x148e7b['getServer']()['getStates']()['reset']('win');
    }), ['item', 'deer', 'corpse', 'photoTraker', 'wolf']['forEach'](function(_0x185d9c) {
        _0x148e7b['getServer']()['getEntities']('@e[mpid=' + _0x185d9c + ']')['forEach'](function(_0x390b56) {
            _0x390b56['remove']();
        });
    }), _0xe73d00['getTileEntity'](0x28, 0x6, -0x15)['setEnabled'](!![]), _0xe73d00['getTileEntity'](0x28, 0x6, -0x15)['sendToAll'](!![]), _0xe73d00['setGameRule']('doDaylightCycle', !![]), _0xe73d00['setTime'](0x3a98), _0xe73d00['setBlock'](mappet['createBlockState']('hnt:trove', 0x0), 0x20, 0x1, -0x20), summonItem('hnt:shovel', 0x1, mappet['vector'](0x30, 0x2, -0x10), _0x148e7b['getServer']()['getWorld'](0x0)), _0xe73d00['setBlock'](mappet['createBlockState']('hnt:ghost2', 0x8), 0x2f, 0x2, -0x10);
}

function timeUpdate(_0x62400e) {
    let _0x102b5a = JSON['parse'](_0x62400e['getServer']()['getStates']()['getString']('timeData')),
        _0x511c36 = JSON['parse'](_0x62400e['getServer']()['getStates']()['getString']('gameData')),
        _0x437b14 = JSON['parse'](_0x62400e['getServer']()['getStates']()['getString']('wolfData')),
        _0x5a2db4 = JSON['parse'](_0x62400e['getServer']()['getStates']()['getString']('laptop')),
        _0x40d6aa = Java['from'](_0x62400e['getServer']()['getAllPlayers']()),
        _0x12553d = ![],
        _0x31a693 = _0x62400e['getServer']()['getWorld'](0x0),
        _0x471780, _0x3a7b5b = _0x31a693['getTileEntity'](0x2c, 0x15, 0xb);
    for (i in _0x40d6aa) {
        let _0x10d81d = _0x40d6aa[i],
            _0xab445 = _0x10d81d['getUIContext']();
        if (_0xab445) _0x12553d = !![];
    }!_0x12553d && _0x5a2db4['occupiedBy'] != '' && (_0x5a2db4['occupiedBy'] = '', _0x62400e['getServer']()['getStates']()['setString']('laptop', JSON['stringify'](_0x5a2db4)));
    _0x3a7b5b['getTileData']()['getInt']('coolDown') > 0x0 && _0x3a7b5b['getTileData']()['setInt']('coolDown', _0x3a7b5b['getTileData']()['getInt']('coolDown') - 0x1);
    if (_0x31a693['getBlock'](0x2c, 0x15, 0xb)['getBlockId']() == 'hnt:generator_on') {
        let _0x10cd45 = mappet['toNBT'](_0x31a693['getTileEntity'](0x2c, 0x17, 0xb)['getMorph']());
        _0x62400e['getServer']()['getStates']()['getNumber']('fuel') > 0x0 ? (_0x62400e['getServer']()['getStates']()['add']('fuel', -0x1 / 0x3c), _0x3a7b5b['getTileData']()['setInt']('LoopSound', _0x3a7b5b['getTileData']()['getInt']('LoopSound') + 0x1), _0x3a7b5b['getTileData']()['getInt']('LoopSound') >= 0x2 && (_0x3a7b5b['getTileData']()['setInt']('LoopSound', 0x0), _0x31a693['playSound']('mp.sounds:hnt.interact.generator_loop', 0x2c, 21.5, 0xb, 0.5, 0x1)), _0x10cd45['getCompound']('Pose')['getCompound']('Pose')['getCompound']('indicator')['setFloat']('SY', _0x62400e['getServer']()['getStates']()['getNumber']('fuel') / 0xf)) : (_0x62400e['getServer']()['getStates']()['setNumber']('fuel', 0x0), _0x31a693['setBlock'](mappet['createBlockState']('hnt:generator', 0x5), 0x2c, 0x15, 0xb), _0x31a693['playSound']('mp.sounds:hnt.interact.generator_shutdown', 0x2c, 0x15, 0xb, 0.5, 0x1), _0x10cd45['getCompound']('Pose')['getCompound']('Pose')['getCompound']('switch')['remove']('RX'), _0x31a693['setBlock'](mappet['createBlockState']('hnt:laptop', 0x2), 0x2a, 0x17, 0xc), _0x31a693['replaceBlocks'](mappet['createBlockState']('hnt:fencelantern', 0x2), mappet['createBlockState']('hnt:fencelanternoff', 0x2), mappet['vector3'](0x2f, 0x16, 0xf), mappet['vector3'](0x21, 0x17, 0x1))), _0x31a693['getTileEntity'](0x2c, 0x17, 0xb)['setMorph'](mappet['createMorph'](_0x10cd45)), _0x31a693['getTileEntity'](0x2c, 0x17, 0xb)['sendToAll'](!![]), _0x5a2db4['battery'] < 0x64 && (_0x471780 = Number(_0x5a2db4['battery']) + 3.6, _0x471780 > 0x64 && (_0x471780 = 0x64), _0x5a2db4['battery'] = _0x471780['toFixed'](0x1), _0x62400e['getServer']()['getStates']()['setString']('laptop', JSON['stringify'](_0x5a2db4))), _0x31a693['getBlock'](0x2a, 0x17, 0xc)['getBlockId']() == 'hnt:laptop' && _0x31a693['setBlock'](mappet['createBlockState']('hnt:laptop_on', 0x2), 0x2a, 0x17, 0xc);
    } else {
        if (_0x31a693['getBlock'](0x2c, 0x15, 0xb)['getBlockId']() == 'hnt:generator' && _0x5a2db4['battery'] > 0x0 && !_0x102b5a['freezed'] && _0x5a2db4['battery_pack']) _0x471780 = Number(_0x5a2db4['battery']) - 0.8, _0x471780 < 0x0 && (_0x471780 = 0x0, _0x31a693['setBlock'](mappet['createBlockState']('hnt:laptop', 0x2), 0x2a, 0x17, 0xc)), _0x5a2db4['battery'] = _0x471780['toFixed'](0x1), _0x62400e['getServer']()['getStates']()['setString']('laptop', JSON['stringify'](_0x5a2db4));
        else {
            if (_0x5a2db4['battery'] <= 0x0 && !_0x102b5a['freezed']) _0x31a693['setBlock'](mappet['createBlockState']('hnt:laptop', 0x2), 0x2a, 0x17, 0xc);
            else _0x31a693['getBlock'](0x2a, 0x17, 0xc)['getBlockId']() == 'hnt:laptop_on' && !_0x5a2db4['battery_pack'] && _0x31a693['setBlock'](mappet['createBlockState']('hnt:laptop', 0x2), 0x2a, 0x17, 0xc);
        }
    }
    if (_0x102b5a['freezed']) return;
    if (_0x102b5a['now'] == 'day') _0x102b5a['time'] != 0x0 ? _0x102b5a['time']-- : (_0x102b5a['now'] = 'night', _0x102b5a['time'] = Math['min'](0x168 + _0x102b5a['day'] * 0x1e, 0x1e0), _0x62400e['getServer']()['getStates']()['setString']('timeData', JSON['stringify'](_0x102b5a)), night(_0x31a693));
    else _0x102b5a['now'] == 'night' && (_0x102b5a['time'] != 0x0 ? _0x102b5a['time']-- : (_0x102b5a['now'] = 'day', _0x102b5a['time'] = 0xf0, _0x102b5a['day']++, _0x511c36['daysLeft']--, _0x62400e['getServer']()['getStates']()['setString']('timeData', JSON['stringify'](_0x102b5a)), _0x62400e['getServer']()['getStates']()['setString']('gameData', JSON['stringify'](_0x511c36)), day(_0x31a693)));
    _0x62400e['getServer']()['getStates']()['setString']('timeData', JSON['stringify'](_0x102b5a));
}

function night(_0x547a2c) {
    let _0x1a9830 = getServerFromWorld(_0x547a2c),
        _0x1037f8 = Math['round'](mappet['random'](0x1, 0x3));
    if (_0x1037f8 == 0x1) _0x547a2c['setRaining'](!![]);
    else(_0x1037f8 == 0x2 || _0x1037f8 == 0x3) && _0x547a2c['setRaining'](![]);
    let _0x13dd66 = Math['round'](mappet['random'](0x1, 0x5));
    _0x13dd66 == 0x1 ? _0x1a9830['getStates']()['setNumber']('Ghost', 0x1) : _0x1a9830['getStates']()['setNumber']('Ghost', 0x0);
    let _0xde3e35 = JSON['parse'](_0x1a9830['getStates']()['getString']('wolfData')),
        _0x5dc5c1 = JSON['parse'](_0x1a9830['getStates']()['getString']('gameData')),
        _0x506e27 = JSON['parse'](_0x1a9830['getStates']()['getString']('timeData')),
        _0x4b1c0f = JSON['parse'](_0x1a9830['getStates']()['getString']('laptop')),
        _0x40ec04 = [{
            'x': 0x25,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x26,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x27,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x28,
            'y': 0x15,
            'z': 0x8
        }],
        _0x2d5e33 = mappet['toNBT'](_0x547a2c['getTileEntity'](0x2c, 0x17, 0xb)['getMorph']());
    _0x547a2c['setTime'](0x32c8), _0x2d5e33['getCompound']('Pose')['getCompound']('Pose')['getCompound']('switch')['remove']('RX'), _0x2d5e33['getCompound']('Pose')['getCompound']('Pose')['getCompound']('indicator')['setFloat']('SY', _0x1a9830['getStates']()['getNumber']('fuel') / 0xf), _0x547a2c['getTileEntity'](0x2c, 0x17, 0xb)['setMorph'](mappet['createMorph'](_0x2d5e33)), _0x547a2c['getTileEntity'](0x2c, 0x17, 0xb)['sendToAll'](!![]), _0x547a2c['setBlock'](mappet['createBlockState']('hnt:generator', 0x5), 0x2c, 0x15, 0xb), _0x547a2c['replaceBlocks'](mappet['createBlockState']('hnt:fencelantern', 0x2), mappet['createBlockState']('hnt:fencelanternoff', 0x2), mappet['vector3'](0x2f, 0x16, 0xf), mappet['vector3'](0x21, 0x17, 0x1)), _0xde3e35['cooldownTick'] = 0x12c + JSON['parse'](_0x1a9830['getStates']()['getString']('timeData'))['day'] * 0xa * 0x14, _0xde3e35['radius'] = 0xf + JSON['parse'](_0x1a9830['getStates']()['getString']('timeData'))['day'] * 0x2, logger['debug'](_0xde3e35['radius']), _0x1a9830['getStates']()['setString']('wolfData', JSON['stringify'](_0xde3e35)), _0x1a9830['getAllPlayers']()['forEach'](function(_0x4f01f6) {
        let _0x14c342 = Math['floor'](mappet['random'](_0x40ec04['length'])),
            _0x14012c = _0x40ec04[_0x14c342];
        JSON['parse'](_0x4f01f6['getStates']()['getString']('gameStats'))['hp'] > 0x0 && (_0x4f01f6['setPosition'](_0x14012c['x'], _0x14012c['y'], _0x14012c['z']), _0x40ec04['splice'](_0x14c342, 0x1), _0x4f01f6['setGameMode'](0x2));
        _0x4f01f6['closeUI'](), _0x4f01f6['setupHUD']('phase_change'), _0x4f01f6['playSound']('mp.sounds:hnt.ambience.phasechange_night', 0x0, 0x3e8, 0x0, 0x2710, 0x1);
        if (_0x5dc5c1['gameStage'] == 'debt') _0x4f01f6['changeHUDMorph']('phase_change', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:40,Color:0,Label:\x22День\x20' + _0x506e27['day'] + '\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Ночь\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.25f,0.25f,0.25f],T:[0.0f,1.17f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22[4' + (_0x5dc5c1['daysLeft'] == 0x1 ? 'СЕГОДНЯ\x20ПОСЛЕДНИЙ\x20ДЕНЬ\x20ПОГАШЕНИЯ\x20ЗАДОЛЖЕННОСТИ!' : 'До\x20погашения\x20задолженности\x20осталось\x20' + _0x5dc5c1['daysLeft'] + '\x20' + (_0x5dc5c1['daysLeft'] == 0x1 ? 'день' : _0x5dc5c1['daysLeft'] == 0x0 ? 'дней' : _0x5dc5c1['daysLeft'] < 0x5 ? 'дня' : 'дней')) + '\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.35f,0.35f,0.35f],T:[0.0f,1.0f,0.0f],Limb:\x22cube\x22,Morph:{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:60,Color:0,Label:\x22Баланс\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22' + _0x4b1c0f['balance'] + '\x20/\x20[e' + _0x5dc5c1['debtCount'] + '[f$\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
        else _0x5dc5c1['gameStage'] == 'killWolf' && _0x4f01f6['changeHUDMorph']('phase_change', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:40,Color:0,Label:\x22День\x20' + _0x506e27['day'] + '\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Ночь\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.25f,0.25f,0.25f],T:[0.0f,1.17f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Max:300,Label:\x22[4' + (_0x5dc5c1['daysLeft'] == 0x1 ? 'СЕГОДНЯ\x20ПОСЛЕДНИЙ\x20ДЕНЬ\x20УБИЙСТВА\x20МОНСТРА!' : 'Осталось\x20' + _0x5dc5c1['daysLeft'] + '\x20' + (_0x5dc5c1['daysLeft'] == 0x1 ? 'день' : _0x5dc5c1['daysLeft'] == 0x0 ? 'дней' : _0x5dc5c1['daysLeft'] < 0x5 ? 'дня' : 'дней')) + '\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.35f,0.35f,0.35f],T:[0.0f,1.0f,0.0f],Limb:\x22cube\x22,Morph:{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:60,Color:0,Label:\x22ЗАДАЧА\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.8f,0.8f,0.8f],T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Убить\x20монстра\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
    }), _0x1a9830['executeScript']('generation.js', 'otherLoot', _0x547a2c), 
    _0x1a9830['getEntities']('@e[mpid=deer,mpe=hp==0]')['forEach'](function(_0x2a51b4) {
        _0x2a51b4['remove']();
    }), _0x1a9830['getEntities']('@e[mpid=wolf,mpe=hp==0]')['forEach'](function(_0x1b9413) {
        _0x1b9413['remove']();
    }), _0x1a9830['getEntities']('@e[mpid=corpse]')['forEach'](function(_0x11c014) {
        _0x11c014['remove']();
    }), _0x1a9830['executeScript']('generation.js', 'mineralRock', _0x547a2c), 
    _0x547a2c['spawnNpc']('wolf', 0x2e, 0x15, -0x62);
}

function day(_0x494d50, _0x48cf68) {
    let _0x4b7fcc = getServerFromWorld(_0x494d50),
        _0xed4c11 = Math['round'](mappet['random'](0x1, 0x3));
    if (_0xed4c11 == 0x1) _0x494d50['setRaining'](!![]);
    else(_0xed4c11 == 0x2 || _0xed4c11 == 0x3) && _0x494d50['setRaining'](![]);
    let _0x23cd0b = Math['round'](mappet['random'](0x1, 0x5));
    _0x23cd0b == 0x1 ? _0x4b7fcc['getStates']()['setNumber']('Ghost', 0x1) : _0x4b7fcc['getStates']()['setNumber']('Ghost', 0x0);
    let _0x2ced79 = JSON['parse'](_0x4b7fcc['getStates']()['getString']('gameData')),
        _0x10b0be = JSON['parse'](_0x4b7fcc['getStates']()['getString']('dayResultData')),
        _0x547b5b = JSON['parse'](_0x4b7fcc['getStates']()['getString']('timeData')),
        _0x3bc193 = JSON['parse'](_0x4b7fcc['getStates']()['getString']('laptop')),
        _0x250bf6 = JSON['parse'](_0x4b7fcc['getStates']()['getString']('saleBox')),
        _0x564767 = JSON['parse'](_0x4b7fcc['getStates']()['getString']('startSettings')),
        _0x167a52 = [{
            'x': 0x25,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x26,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x27,
            'y': 0x15,
            'z': 0x8
        }, {
            'x': 0x28,
            'y': 0x15,
            'z': 0x8
        }],
        _0x45d546 = [mappet['vector'](0x4, 0x15, -0x36), mappet['vector'](0x57, 0x17, -0x55), mappet['vector'](0x58, 0x17, -0x10)];
    _0x494d50['setTime'](0x3e8);
    if (!_0x48cf68) {
        let _0x19a850 = mappet['toNBT'](_0x494d50['getTileEntity'](0x2c, 0x17, 0xb)['getMorph']());
        _0x19a850['getCompound']('Pose')['getCompound']('Pose')['getCompound']('switch')['remove']('RX'), _0x19a850['getCompound']('Pose')['getCompound']('Pose')['getCompound']('indicator')['setFloat']('SY', _0x4b7fcc['getStates']()['getNumber']('fuel') / 0xf), _0x494d50['getTileEntity'](0x2c, 0x17, 0xb)['setMorph'](mappet['createMorph'](_0x19a850)), _0x494d50['getTileEntity'](0x2c, 0x17, 0xb)['sendToAll'](!![]), _0x494d50['setBlock'](mappet['createBlockState']('hnt:generator', 0x5), 0x2c, 0x15, 0xb), _0x494d50['replaceBlocks'](mappet['createBlockState']('hnt:fencelantern', 0x2), mappet['createBlockState']('hnt:fencelanternoff', 0x2), mappet['vector3'](0x2f, 0x16, 0xf), mappet['vector3'](0x21, 0x17, 0x1)), _0x4b7fcc['getEntities']('@e[mpid=item]')['forEach'](function(_0x25b640) {
            !_0x25b640['getEntityData']()['getBoolean']('onBase') && _0x25b640['getNpcState']() == 'default' && mappet['toNBT'](_0x25b640['getMorph']())['getList']('BodyParts')['getCompound'](0x0)['getCompound']('Morph')['getCompound']('Stack')['getString']('id') != 'hnt:note' && _0x25b640['remove']();
        }), _0x4b7fcc['getEntities']('@e[mpid=wolf]')['forEach'](function(_0x1fd2aa) {
            _0x1fd2aa['remove']();
        }), _0x4b7fcc['getEntities']('@e[mpid=photoTraker]')['forEach'](function(_0x23aaf0) {
            _0x23aaf0['remove']();
        }), _0x4b7fcc['getAllPlayers']()['forEach'](function(_0x27ac50) {
            let _0x49a30b = Math['floor'](mappet['random'](_0x167a52['length'])),
                _0x96e547 = _0x167a52[_0x49a30b];
            _0x27ac50['executeScript']('ui_dayResults.js'), sendScreenshotAllPlayer(_0x494d50), JSON['parse'](_0x27ac50['getStates']()['getString']('gameStats'))['hp'] > 0x0 && (_0x27ac50['setPosition'](_0x96e547['x'], _0x96e547['y'], _0x96e547['z']), _0x167a52['splice'](_0x49a30b, 0x1), _0x27ac50['setGameMode'](0x2));
        });
        calculateDayResults(_0x494d50) > 0x0 ? (statisticAdd(_0x494d50, 'moneyEarned', calculateDayResults(_0x494d50)), _0x3bc193['balance'] += calculateDayResults(_0x494d50)) : (_0x3bc193['balance'] = 0x0, _0x2ced79['debtCount'] += Math['abs'](_0x3bc193['balance'] + calculateDayResults(_0x494d50)));
        statisticAdd(_0x494d50, 'itemsSold', mergeItems(_0x250bf6)['length']);
        if (_0x2ced79['gameStage'] == 'debt') {
            if (_0x3bc193['balance'] < _0x2ced79['debtCount'] && _0x2ced79['daysLeft'] == 0x0) return;
            else _0x3bc193['balance'] >= _0x2ced79['debtCount'] && (_0x2ced79['gameStage'] = 'killWolf', _0x2ced79['daysLeft'] = _0x564767['daysLeft'], _0x3bc193['balance'] -= _0x2ced79['debtCount'], _0x3bc193['lockedItems']['splice'](_0x3bc193['lockedItems']['indexOf']('huntclient:shotgun'), 0x1));
        }
        _0x4b7fcc['executeScript']('generation.js', 'rock', _0x494d50), _0x4b7fcc['executeScript']('generation.js', 'loot', _0x494d50), _0x4b7fcc['executeScript']('generation.js', 'otherLoot', _0x494d50), _0x4b7fcc['executeScript']('generation.js', 'hevidence', _0x494d50), _0x4b7fcc['executeScript']('generation.js', 'evidence', _0x494d50), JSON['parse'](_0x4b7fcc['getStates']()['getString']('purchasedItems'))['forEach'](function(_0x2398aa) {
            let _0x1a8534 = mappet['createCompound']();
            switch (_0x2398aa) {
                case 'hnt:gascan':
                    _0x1a8534 = mappet['createCompound']('{Fuel:5}');
                    break;
                case 'hnt:pickaxe':
                    _0x1a8534 = mappet['createCompound']('{Repair:100,HideFlags:24,CanDestroy:[\x22hnt:mineralrock1\x22,\x22hnt:mineralrock2\x22,\x22hnt:mineralrock3\x22,\x22hnt:mineralrock4\x22]}');
                    break;
                case 'hnt:crowbar':
                    _0x1a8534 = mappet['createCompound']('{Repair:100}');
                    break;
                case 'hnt:airhornitem':
                    _0x1a8534 = mappet['createCompound']('{Uses:3}');
                    break;
                case 'huntclient:shotgun':
                    _0x1a8534 = mappet['createCompound']('{haveAmmo:0b,cooldown:0b,animation:\x22\x22}');
                    break;
            }
            _0x2398aa = summonItem(_0x2398aa, 0x1, mappet['vector'](35.5, 0x16, 0x5), _0x494d50, _0x1a8534), _0x2398aa['setMotion'](0x0, 0x0, mappet['random'](-0.5, 0.5)), _0x2398aa['setRotations'](0x0, mappet['random'](0xb4), 0x0);
        }), _0x4b7fcc['getStates']()['setString']('purchasedItems', '[]'), _0x547b5b['freezed'] = 0x1;
    } else statisticAdd(_0x494d50, 'daysLived', 0x1), _0x4b7fcc['getAllPlayers']()['forEach'](function(_0x49abd2) {
        _0x49abd2['closeUI'](), _0x49abd2['setupHUD']('phase_change'), _0x49abd2['playSound']('mp.sounds:hnt.ambience.phasechange_day', 0x0, 0x3e8, 0x0, 0x2710, 0x1);
        if (_0x2ced79['gameStage'] == 'debt') _0x49abd2['changeHUDMorph']('phase_change', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:40,Color:0,Label:\x22День\x20' + _0x547b5b['day'] + '\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Утро\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.25f,0.25f,0.25f],T:[0.0f,1.17f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22[4' + (_0x2ced79['daysLeft'] == 0x1 ? 'СЕГОДНЯ\x20ПОСЛЕДНИЙ\x20ДЕНЬ\x20ПОГАШЕНИЯ\x20ЗАДОЛЖЕННОСТИ!' : 'До\x20погашения\x20задолженности\x20осталось\x20' + _0x2ced79['daysLeft'] + '\x20' + (_0x2ced79['daysLeft'] == 0x1 ? 'день' : _0x2ced79['daysLeft'] == 0x0 ? 'дней' : _0x2ced79['daysLeft'] < 0x5 ? 'дня' : 'дней')) + '\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.35f,0.35f,0.35f],T:[0.0f,1.0f,0.0f],Limb:\x22cube\x22,Morph:{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:60,Color:0,Label:\x22Баланс\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22' + _0x3bc193['balance'] + '\x20/\x20[e' + _0x2ced79['debtCount'] + '[f$\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
        else _0x2ced79['gameStage'] == 'killWolf' && _0x49abd2['changeHUDMorph']('phase_change', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:40,Color:0,Label:\x22День\x20' + _0x547b5b['day'] + '\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Утро\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.25f,0.25f,0.25f],T:[0.0f,1.17f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Max:300,Label:\x22[4' + (_0x2ced79['daysLeft'] == 0x1 ? 'СЕГОДНЯ\x20ПОСЛЕДНИЙ\x20ДЕНЬ\x20УБИЙСТВА\x20МОНСТРА!' : 'Осталось\x20' + _0x2ced79['daysLeft'] + '\x20' + (_0x2ced79['daysLeft'] == 0x1 ? 'день' : _0x2ced79['daysLeft'] == 0x0 ? 'дней' : _0x2ced79['daysLeft'] < 0x5 ? 'дня' : 'дней')) + '\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.35f,0.35f,0.35f],T:[0.0f,1.0f,0.0f],Limb:\x22cube\x22,Morph:{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:60,Color:0,Label:\x22ЗАДАЧА\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.8f,0.8f,0.8f],T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Убить\x20монстра\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
    });
    for (let _0x16f22d = 0x0; _0x16f22d < Math['abs'](_0x4b7fcc['getEntities']('@e[mpid=deer,mpe=hp>=1]')['length'] - 0x3); _0x16f22d++) {
        let _0x5d2606 = Math['floor'](mappet['random'](_0x45d546['length']));
        _0x494d50['spawnNpc']('deer', _0x45d546[_0x5d2606]['x'], _0x45d546[_0x5d2606]['y'], _0x45d546[_0x5d2606]['z']), _0x45d546['splice'](_0x5d2606, 0x1);
    }
    _0x2ced79['gameEvent'] = gameEvents[Math['floor'](mappet['random'](gameEvents['length']))], _0x2ced79['deerKills'] = 0x0, _0x10b0be['photosPosted'] = [], _0x10b0be['calculation'] = 0x0, _0x3bc193['occupiedBy'] = '', _0x4b7fcc['getStates']()['setString']('timeData', JSON['stringify'](_0x547b5b)), _0x4b7fcc['getStates']()['setString']('gameData', JSON['stringify'](_0x2ced79)), _0x4b7fcc['getStates']()['setString']('dayResultData', JSON['stringify'](_0x10b0be)), _0x4b7fcc['getStates']()['setString']('laptop', JSON['stringify'](_0x3bc193)), _0x4b7fcc['getStates']()['setString']('saleBox', '[]');
}