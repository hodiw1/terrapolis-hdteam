let soundStatus = 'mp.sounds:hnt.ui.ui_drstatus1';
let soundPlayer = 'mp.sounds:hnt.ui.ui_drstatus2';
let soundSelled = 'mp.sounds:hnt.ui.ui_drselled1';
let soundItem = 'mp.sounds:hnt.ui.ui_drselled2';
let soundFinal = 'mp.sounds:hnt.ui.ui_drselled3';
let soundCoin = 'mp.sounds:hnt.ui.ui_drcoin';
let statuses = ['[4Тяжело\x20ранен', '[4Ранен', '[aВ\x20порядке'];

function main(_0x57cde7) {
    try {
        let _0x36f59b = JSON['parse'](_0x57cde7['getServer']()['getStates']()['getString']('laptop'));
        let _0x19d1ac = JSON['parse'](_0x57cde7['getServer']()['getStates']()['getString']('gameData'));
        let _0x453fb4 = JSON['parse'](_0x57cde7['getServer']()['getStates']()['getString']('timeData'));
        let _0x22bfb1 = JSON['parse'](_0x57cde7['getServer']()['getStates']()['getString']('saleBox'));
        let _0x5daaf5 = JSON['parse'](_0x57cde7['getServer']()['getStates']()['getString']('dayResultData'));
        var _0x39ddec = _0x57cde7['getSubject']();
        let _0x3b470f = 0x0;
        let _0x2a4db2 = _0x36f59b['balance'];
        let _0x30b280 = _0x19d1ac['debtCount'];
        let _0x3a3129 = mergeItems(_0x22bfb1);
        _0x453fb4['freezed'] = 0x1;
        _0x57cde7['getServer']()['getStates']()['setString']('timeData', JSON['stringify'](_0x453fb4));
        let _0x52e09e = mappet['createUI'](_0x57cde7, 'handler')['closable'](![]);
        let _0x147786 = _0x52e09e['graphics']()['rxy'](0x0, 0x0)['rwh'](0x1, 0x1);
        _0x147786['rect'](0x0, 0x0, 0x1, 0x1, 0xff000000)['rwh'](0x1, 0x1);
        _0x52e09e['current']['keybind'](0x39, 'space', 'Нажмите\x20SPACE\x20для\x20продолжения...');
        let _0x34e687 = _0x52e09e['layout']();
        _0x34e687['current']['id']('main')['rxy'](0.5, 0.4)['wh'](0xfa, 0xc8)['anchor'](0.5)['visible'](!![]);
        _0x34e687['label']('ИТОГИ\x20ДНЯ')['id']('lblResults')['rx'](0.5)['ry'](0x0, -0x2)['w'](0x19)['h'](0xa)['anchor'](0.5, 0x1)['labelAnchor'](0.5, 0x1);
        let _0x35d4e2 = _0x34e687['column'](0x3);
        _0x35d4e2['current']['scroll']()['id']('column')['rxy'](0x0, 0x0)['rw'](0x1, 0xa)['rh'](0x1)['anchor'](0x0);
        _0x34e687['morph'](mappet['createMorph'](''))['id']('unScrollMorph')['visible'](!![])['enabled'](!![])['rxy'](0x0, 0x0)['rw'](0x1, 0xa)['rh'](0x1)['anchor'](0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
        _0x34e687['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + (0x32 + 0x9 + 0xa * 0x3) + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morphItem')['w'](0x7)['rh'](0x1)['enabled'](![])['rx'](0x1, 0xa)['ry'](0x0)['anchor'](0x1, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
        let _0x81b0a3 = _0x35d4e2['layout']();
        _0x81b0a3['current']['id']('lytGroupStatus')['rxy'](0x0, 0x0)['rw'](0x1)['h'](0xa);
        _0x81b0a3['graphics']()['rxy'](0x0, 0x0)['rw'](0x1, -0x7)['rh'](0x1)['rect'](0x0, 0x0, 0x1, 0x1, 0xffffffff)['rwh'](0x1, 0x1);
        _0x81b0a3['label']('Состояние\x20группы:')['id']('lblGroupStatus')['x'](0x1)['y'](0x1)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0)['color'](0x0, ![]);
        _0x81b0a3['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + 0xa + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morphGroupStatus')['rw'](0x1, -0x7)['rh'](0x1)['enabled'](![])['rx'](0x0)['ry'](0x0)['anchor'](0x0, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
        _0x39ddec['playSound']('mp.sounds:hnt.ui.ui_dayresultsting', 0x0, 0x2710, 0x0, 0x2710, 0x1);
        _0x57cde7['scheduleScript'](0xa, function() {
            _0x39ddec['playSound'](soundStatus, 0x0, 0x2710, 0x0, 0x2710, 0x1);
        });
        let _0x1d47c8 = _0x57cde7['getServer']()['getAllPlayers']();
        for (let _0x215476 = 0x0; _0x215476 < Math['min'](_0x1d47c8['length'], 0x3); _0x215476++) {
            let _0x24f351 = _0x1d47c8[_0x215476];
            let _0x3a789b = _0x35d4e2['layout']();
            _0x3a789b['current']['id']('lytPlayer')['rxy'](0x0, 0x0)['rw'](0x1)['h'](0xa);
            _0x3a789b['label'](_0x24f351['getName']() + ':\x20' + statuses[JSON['parse'](_0x24f351['getStates']()['getString']('gameStats'))['hp']])['id']('lblPlayer' + _0x215476)['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            _0x3a789b['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + (0x14 + _0x215476 * 0x3) + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morph' + _0x215476)['rwh'](0x1, 0x1)['enabled'](![])['rx'](0x0)['ry'](0x0)['anchor'](0x0, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
            _0x57cde7['scheduleScript'](0x14 + _0x215476 * 0x3, function() {
                _0x39ddec['playSound'](soundPlayer, 0x0, 0x2710, 0x0, 0x2710, 0x1);
            });
        }
        let _0x524063 = _0x35d4e2['layout']();
        _0x524063['current']['id']('lytSold')['rxy'](0x0, 0x0)['rw'](0x1)['h'](0xa);
        _0x524063['graphics']()['rxy'](0x0, 0x0)['rw'](0x1, -0x7)['rh'](0x1)['rect'](0x0, 0x0, 0x1, 0x1, 0xffffffff)['rwh'](0x1, 0x1);
        _0x524063['label']('Продано:')['id']('lblSold')['x'](0x1)['y'](0x1)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0)['color'](0x0, ![]);
        _0x524063['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + (0x1e + 0x9) + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morphSold')['rw'](0x1, -0x7)['rh'](0x1)['enabled'](![])['rx'](0x0)['ry'](0x0)['anchor'](0x0, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
        _0x57cde7['scheduleScript'](0x1e + 0x3 * 0x2, function() {
            _0x39ddec['playSound'](soundSelled, 0x0, 0x2710, 0x0, 0x2710, 0x1);
        });
        var _0x5a6a8d = 0x0;
        for (let _0x339f77 = 0x0; _0x339f77 < _0x3a3129['length']; _0x339f77++) {
            let _0x19ab3e = _0x35d4e2['layout']();
            _0x19ab3e['current']['id']('lytItem')['rxy'](0x0, 0x0)['rw'](0x1)['h'](0xa);
            _0x5a6a8d += 0x1;
            let _0x3ae8b4 = findIndexById(saleableItems, _0x3a3129[_0x339f77]['id']);
            let _0x381e42 = setGameEventParam(saleableItems[_0x3ae8b4]['tag'], _0x19d1ac['gameEvent']);
            let _0x444848 = Math['round'](_0x3a3129[_0x339f77]['cost'] * _0x381e42);
            _0x3b470f += _0x444848;
            if (saleableItems[_0x3ae8b4]['id'] == 'hnt:cellphone' || saleableItems[_0x3ae8b4]['id'] == 'hnt:lighter' || saleableItems[_0x3ae8b4]['id'] == 'hnt:drivlic') {
                _0x19ab3e['label']('-\x20' + saleableItems[_0x3ae8b4]['name'] + ':\x20[7' + saleableItems[_0x3ae8b4]['sentence'][JSON['parse'](_0x3a3129[_0x339f77]['tag'])['Norm']] + '[r' + '\x20\x5c[\x20[a' + _0x444848 + '[r$\x20]')['id']('lblItem' + _0x339f77)['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            } else if (saleableItems[_0x3ae8b4]['id']['startsWith']('hnt:scrap')) {
                _0x19ab3e['label']('-\x20' + saleableItems[_0x3ae8b4]['name'] + ':\x20[7' + JSON['parse'](_0x3a3129[_0x339f77]['tag'])['Weight'] + '\x20' + saleableItems[_0x3ae8b4]['sentence'] + '[r' + '\x20\x5c[\x20[a' + _0x444848 + '[r$\x20]')['id']('lblItem' + _0x339f77)['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            } else if (saleableItems[_0x3ae8b4]['id'] == 'hnt:gascan') {
                let _0x114332 = JSON['parse'](_0x3a3129[_0x339f77]['tag'])['Fuel'] % 0x1 === 0x0 ? JSON['parse'](_0x3a3129[_0x339f77]['tag'])['Fuel'] : JSON['parse'](_0x3a3129[_0x339f77]['tag'])['Fuel']['toFixed'](0x1);
                _0x19ab3e['label']('-\x20' + saleableItems[_0x3ae8b4]['name'] + ':\x20[7' + _0x114332 + '\x20' + saleableItems[_0x3ae8b4]['sentence'] + '[r' + '\x20\x5c[\x20[a' + _0x444848 + '[r$\x20]')['id']('lblItem' + _0x339f77)['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            } else if (saleableItems[_0x3ae8b4]['id'] == 'hnt:silverbunny' || saleableItems[_0x3ae8b4]['id'] == 'hnt:goldduck') {
                _0x19ab3e['label']('-\x20' + saleableItems[_0x3ae8b4]['name'] + ':\x20[7' + JSON['parse'](_0x3a3129[_0x339f77]['tag'])['Weight'] + '\x20' + saleableItems[_0x3ae8b4]['sentence'] + '[r' + '\x20\x5c[\x20[a' + _0x444848 + '[r$\x20]')['id']('lblItem' + _0x339f77)['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            } else if (saleableItems[_0x3ae8b4]['id'] == 'hnt:pickaxe') {
                _0x19ab3e['label']('-\x20' + saleableItems[_0x3ae8b4]['name'] + ':\x20[7' + JSON['parse'](_0x3a3129[_0x339f77]['tag'])['Repair'] + '\x20' + saleableItems[_0x3ae8b4]['sentence'] + '[r' + '\x20\x5c[\x20[a' + _0x444848 + '[r$\x20]')['id']('lblItem' + _0x339f77)['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            } else {
                _0x19ab3e['label']('-\x20' + saleableItems[_0x3ae8b4]['name'] + ':\x20[7' + _0x3a3129[_0x339f77]['count'] + '\x20' + saleableItems[_0x3ae8b4]['sentence'] + '[r' + '\x20\x5c[\x20[a' + _0x444848 + '[r$\x20]')['id']('lblItem' + _0x339f77)['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            }
            _0x19ab3e['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + (0x28 + 0x9 + _0x339f77 * 0x3) + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morphItem')['rwh'](0x1, 0x1)['enabled'](![])['rx'](0x0)['ry'](0x0)['anchor'](0x0, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
            _0x57cde7['scheduleScript'](0x28 + 0x9 + _0x339f77 * 0x3, function() {
                _0x39ddec['playSound'](soundItem, 0x0, 0x2710, 0x0, 0x2710, 0x1);
            });
        }
        let _0x16f2e8 = 0x0;
        let _0x52a381 = setGameEventParam('Photo', _0x19d1ac['gameEvent']);
        let _0x37da19 = removeDuplicates(_0x5daaf5['photosPosted']);
        for (var _0x135b6e = 0x0; _0x135b6e < _0x37da19['length']; _0x135b6e++) {
            var _0x4764a1 = _0x37da19[_0x135b6e]['objects'];
            var _0x791b2d = 0x0;
            for (var _0x43c698 = 0x0; _0x43c698 < _0x4764a1['length']; _0x43c698++) {
                _0x791b2d += _0x4764a1[_0x43c698]['cost'] || 0x0;
            }
            _0x16f2e8 += _0x791b2d * _0x52a381;
        }
        if (_0x5daaf5['photosPosted']['length'] > 0x0) {
            let _0x513cc9 = _0x35d4e2['layout']();
            _0x513cc9['current']['id']('lytItem')['rxy'](0x0, 0x0)['rw'](0x1)['h'](0xa);
            _0x513cc9['label']('-\x20Фотографии:\x20[7' + _0x5daaf5['photosPosted']['length'] + '\x20шт.[r' + '\x20\x5c[\x20[a' + _0x16f2e8 + '[r$\x20]')['id']('lblItem')['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            _0x513cc9['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + (0x28 + 0x9 + _0x5a6a8d * 0x3) + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morphItem')['rwh'](0x1, 0x1)['enabled'](![])['rx'](0x0)['ry'](0x0)['anchor'](0x0, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
            _0x57cde7['scheduleScript'](0x28 + 0x9 + _0x5a6a8d * 0x3, function() {
                _0x39ddec['playSound'](soundItem, 0x0, 0x2710, 0x0, 0x2710, 0x1);
            });
            _0x5a6a8d++;
        }
        _0x3b470f += _0x16f2e8;
        if (_0x19d1ac['deerKills'] == 0x1) {
            var _0x52e194 = '-\x20[4Убийство\x20оленя\x20[r';
        } else if (_0x19d1ac['deerKills'] > 0x1) {
            var _0x52e194 = '-\x20[4Убийство\x20оленей\x20[r';
        }
        if (_0x19d1ac['deerKills'] > 0x0) {
            let _0x30b674 = _0x35d4e2['layout']();
            _0x30b674['current']['id']('lytItem')['rxy'](0x0, 0x0)['rw'](0x1)['h'](0xa);
            _0x30b674['label'](_0x52e194 + '\x20\x5c[\x20[4' + _0x19d1ac['deerKills'] * -0x12c + '[r$\x20]')['id']('lblItem3512')['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            _0x30b674['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + (0x28 + 0x9 + (_0x5a6a8d + 0x1) * 0x3) + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morphItem')['rwh'](0x1, 0x1)['enabled'](![])['rx'](0x0)['ry'](0x0)['anchor'](0x0, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
            _0x57cde7['scheduleScript'](0x28 + 0x9 + _0x5a6a8d * 0x3, function() {
                _0x39ddec['playSound']('mp.sounds:hnt.ui.ui_drstatus2', 0x0, 0x2710, 0x0, 0x2710, 0.5);
            });
            _0x5a6a8d++;
            _0x3b470f += _0x19d1ac['deerKills'] * -0x12c;
        }
        if (_0x2a4db2 + Math['round'](_0x3b470f) >= _0x19d1ac['debtCount'] && _0x19d1ac['gameStage'] == 'debt') {
            var _0x3cf001 = !![];
            _0x3b470f = Math['round'](_0x3b470f) - _0x19d1ac['debtCount'];
            let _0x1cae32 = _0x35d4e2['layout']();
            _0x1cae32['current']['id']('lytItem')['rxy'](0x0, 0x0)['rw'](0x1)['h'](0xa);
            _0x1cae32['label']('-\x20[eОплата\x20долгов\x20[r\x20\x5c[\x20[4-' + _0x19d1ac['debtCount'] + '[r$\x20]')['id']('lblItem')['x'](0x1)['y'](0x1)['h'](0x8)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
            _0x1cae32['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + (0x28 + 0x9 + _0x5a6a8d * 0x3) + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morphItem')['rwh'](0x1, 0x1)['enabled'](![])['rx'](0x0)['ry'](0x0)['anchor'](0x0, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
            _0x57cde7['scheduleScript'](0x28 + 0x9 + _0x5a6a8d * 0x3, function() {
                _0x39ddec['playSound']('mp.sounds:hnt.ui.ui_itembuy', 0x0, 0x2710, 0x0, 0x2710, 0.9);
            });
            _0x5a6a8d++;
        }
        _0x34e687['label']('Итого:\x20[a' + _0x3b470f + '[r$')['id']('lblTotal')['rx'](0x0, 0x1)['ry'](0x1, 0x2)['anchor'](0x0, 0x0)['labelAnchor'](0x0, 0x0);
        _0x34e687['graphics']()['rx'](0x0)['ry'](0x1, 0xe)['rw'](0x1)['h'](0x1)['rect'](0x0, 0x0, 0x1, 0x1, 0xffffffff)['rwh'](0x1, 0x1);
        _0x34e687['graphics']()['rx'](0.5)['ry'](0x1, 0x14)['anchor'](0.5, 0x0)['w'](0x3c)['h'](0xa)['rect'](0x0, 0x0, 0x1, 0x1, 0xffffffff)['rwh'](0x1, 0x1);
        _0x34e687['label']('БАЛАНС')['rx'](0.5, 0x0)['ry'](0x1, 0x16)['anchor'](0.5, 0x0)['labelAnchor'](0.5, 0x0)['color'](0x0, ![]);
        let _0x59b3c7;
        _0x19d1ac['gameStage'] == 'debt' && !_0x3cf001 ? _0x59b3c7 = _0x2a4db2 + _0x3b470f + '/[e' + _0x30b280 + '[r$' : _0x59b3c7 = _0x2a4db2 + _0x3b470f + '[r$';
        _0x34e687['label'](_0x59b3c7)['id']('lblTotal')['rx'](0.5, 0x0)['ry'](0x1, 0x20)['anchor'](0.5, 0x0)['labelAnchor'](0.5, 0x0);
        let _0x54396d = _0x19d1ac['daysLeft'] == 0x1 ? 'ДЕНЬ!' : _0x19d1ac['daysLeft'] > 0x1 && _0x19d1ac['daysLeft'] < 0x5 ? 'ДНЯ!' : 'ДНЕЙ!';
        let _0x461c12 = _0x19d1ac['gameStage'] == 'debt' ? '[cДО\x20ПОГАШЕНИЯ\x20ЗАДОЛЖЕННОСТИ\x20' : '[cДО\x20УСТРАНЕНИЯ\x20МОНСТРА\x20';
        let _0x112f86 = _0x19d1ac['daysLeft'] == 0x1 ? 'ОСТАЛСЯ\x20' : 'ОСТАЛОСЬ\x20';
        let _0xfdb90c;
        _0xfdb90c = _0x461c12 + _0x112f86 + _0x19d1ac['daysLeft'] + '\x20' + _0x54396d;
        if (_0x3cf001) {
            _0xfdb90c = '[2ДОЛГ\x20ОПЛАЧЕН';
        }
        if (_0x19d1ac['daysLeft'] == 0x0 && _0x19d1ac['gameStage'] == 'debt') {
            _0xfdb90c = '[cКРАЙНИЙ\x20СРОК\x20ОПЛАТЫ\x20ЗАДОЛЖЕННОСТИ\x20ИСТЁК';
        }
        if (_0x19d1ac['daysLeft'] == 0x0 && _0x19d1ac['gameStage'] == 'killWolf') {
            _0xfdb90c = '[cКРАЙНИЙ\x20СРОК\x20УСТРАНЕНИЯ\x20МОНСТРА\x20ИСТЁК';
        }
        _0x34e687['label'](_0xfdb90c)['rx'](0.5, 0x0)['ry'](0x1, 0x2e)['anchor'](0.5, 0x0)['labelAnchor'](0.5, 0x0);
        _0x34e687['label']('[7Нажмите\x20SPACE\x20для\x20продолжения...')['id']('exitLabel')['rx'](0.5, 0x0)['ry'](0x1, 0x5a)['anchor'](0.5, 0x0)['labelAnchor'](0.5, 0x0);
        _0x34e687['morph'](mappet['createMorph']('{Loop:1,List:[{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:-16777216,Animation:{Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:' + (0x32 + 0x9 + _0x5a6a8d * 0x3) + '.0f,EndPoint:0b},{Random:0.0f,SetDuration:0b,Morph:{Lighting:0b,Color:0,Animation:{Interp:23,Animates:1b},Texture:\x22blockbuster:textures/gui/icon.png\x22,Shaded:0b,Name:\x22blockbuster.image\x22},Duration:10.0f,EndPoint:0b}],Name:\x22sequencer\x22,Offset:[0.0f,0.0f,0.0f]}'))['id']('morphMain')['rw'](0x1)['h'](0x64)['enabled'](![])['rx'](0x0)['ry'](0x1)['anchor'](0x0, 0x0)['position'](-0.082, 0.035, -0.052)['distance'](0.35)['fov'](0x1);
        _0x57cde7['scheduleScript'](0x32 + 0x9 + _0x5a6a8d * 0x3, function() {
            _0x39ddec['playSound'](soundFinal, 0x0, 0x2710, 0x0, 0x2710, 0x1);
        });
        _0x57cde7['getSubject']()['openUI'](_0x52e09e);
        let _0x2d7832 = 0xa;
        let _0x56deca = 0x1;
        let _0x54e92d = 0x0;
        let _0x2374b0 = _0x39ddec['getUIContext']();
        _0x57cde7['scheduleScript'](0x28 + 0x9 + _0x5a6a8d * 0x3, function() {
            _0x2374b0['get']('unScrollMorph')['visible'](![]);
            _0x2374b0['sendToPlayer']();
        });
        if (_0x2a4db2 + _0x3b470f < 0x0) {
            let _0xf03a4d = _0x39ddec['getUIContext']();
            _0x2a4db2 = 0x0;
            _0x30b280 += Math['abs'](_0x2a4db2 + _0x3b470f);
            _0xf03a4d['get']('lblTotal')['label'](_0x2a4db2 + '/[e' + _0x30b280 + '[r$');
            _0x39ddec['playSound'](soundCoin, 0x0, 0x2710, 0x0, 0x2710, 0x1);
            _0xf03a4d['sendToPlayer']();
        } else {
            for (let _0x370ce8 = 0x0, _0x4300d4 = _0x2a4db2; _0x370ce8 < Math['floor'](_0x3b470f / _0x2d7832); _0x370ce8++) {
                _0x54e92d += _0x56deca;
                _0x4300d4 += _0x2d7832;
                _0x57cde7['scheduleScript'](0x37 + 0x9 + _0x5a6a8d * 0x3 + _0x54e92d, function() {
                    if (_0x4300d4 + _0x2d7832 < _0x2a4db2 + _0x3b470f) {
                        _0x19d1ac['gameStage'] == 'debt' ? _0x2374b0['get']('lblTotal')['label'](_0x4300d4 + '/[e' + _0x30b280 + '[r$') : _0x2374b0['get']('lblTotal')['label'](_0x4300d4 + '[r$');
                        _0x39ddec['playSound'](soundCoin, 0x0, 0x2710, 0x0, 0x2710, 0x1);
                        _0x2374b0['sendToPlayer']();
                    } else {
                        _0x19d1ac['gameStage'] == 'debt' ? _0x2374b0['get']('lblTotal')['label'](_0x2a4db2 + _0x3b470f + '/[e' + _0x30b280 + '[r$') : _0x2374b0['get']('lblTotal')['label'](_0x2a4db2 + _0x3b470f + '[r$');
                        _0x39ddec['playSound'](soundCoin, 0x0, 0x2710, 0x0, 0x2710, 0x1);
                        _0x2374b0['sendToPlayer']();
                    }
                });
            }
            _0x36f59b['balance'] += Math['round'](_0x3b470f);
        }
    } catch (_0x432bbd) {
        _0x57cde7['send'](_0x432bbd);
    }
}

function handler(_0x4f8e86) {
    var _0x2e7cdc = _0x4f8e86['getSubject']();
    var _0x176463 = _0x2e7cdc['getPosition']();
    var _0x4a304f = _0x2e7cdc['getUIContext']();
    var _0x37bd81 = _0x4a304f['getHotkey']();
    let _0x20e67c = JSON['parse'](_0x4f8e86['getServer']()['getStates']()['getString']('timeData'));
    let _0x3ff7f0 = JSON['parse'](_0x4f8e86['getServer']()['getStates']()['getString']('gameData'));
    let _0x5d8724 = JSON['parse'](_0x4f8e86['getServer']()['getStates']()['getString']('dayResultData'));
    let _0x58dbce = JSON['parse'](_0x4f8e86['getServer']()['getStates']()['getString']('wolfData'));
    let _0x1d8940 = JSON['parse'](_0x2e7cdc['getStates']()['getString']('gameStats'));
    if (_0x4a304f['isClosed']()) {
        return;
    }
    if (_0x37bd81 == 'space' && _0x4a304f['get']('exitLabel')['label'] != '[7Ожидание\x20игроков...') {
        _0x4a304f['get']('exitLabel')['label']('[7Ожидание\x20игроков...');
        if (_0x1d8940['isReady'] == 0x0) {
            _0x2e7cdc['playSound']('mp.sounds:hnt.interact.laptop_key1', _0x176463['x'], _0x176463['y'], _0x176463['z']);
            _0x4f8e86['getServer']()['getStates']()['add']('playersReady', 0x1);
            _0x1d8940['isReady'] = 0x1;
            _0x2e7cdc['getStates']()['setString']('gameStats', JSON['stringify'](_0x1d8940));
            if (_0x4f8e86['getServer']()['getStates']()['getNumber']('playersReady') == _0x4f8e86['getServer']()['getAllPlayers']()['length']) {
                if (_0x58dbce['currentHP'] <= 0x0 && _0x3ff7f0['gameStage'] != 'debt') {
                    _0x4f8e86['getServer']()['getStates']()['setNumber']('win', 0x1);
                    _0x20e67c['freezed'] = 0x1;
                    _0x4f8e86['getServer']()['getStates']()['setString']('timeData', JSON['stringify'](_0x20e67c));
                    _0x4f8e86['getServer']()['executeScript']('game.js', 'end');
                    _0x4f8e86['getServer']()['getAllPlayers']()['forEach'](function(_0x56b190) {
                        _0x56b190['closeUI']();
                        _0x56b190['setupHUD']('game_end');
                        _0x56b190['changeHUDMorph']('game_end', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-16777216,Max:60,Color:786215,Label:\x22ПОБЕДА\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.375f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Max:115,Label:\x22Вы\x20погасили\x20долги\x20и\x20устранили\x20монстра!\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
                    });
                } else {
                    let _0x2360f4 = ![];
                    _0x4f8e86['getServer']()['getAllPlayers']()['forEach'](function(_0x330c03) {
                        let _0x206cb3 = JSON['parse'](_0x330c03['getStates']()['getString']('gameStats'));
                        _0x330c03['closeUI']();
                        if (_0x3ff7f0['daysLeft'] != 0x0) {
                            _0x330c03['setupHUD']('phase_change');
                            _0x330c03['playSound']('mp.sounds:hnt.ambience.phasechange_day', 0x0, 0x3e8, 0x0, 0x2710, 0x1);
                            if (_0x3ff7f0['gameStage'] == 'debt') {
                                _0x330c03['changeHUDMorph']('phase_change', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:40,Color:0,Label:\x22День\x20' + JSON['parse'](_0x4f8e86['getServer']()['getStates']()['getString']('timeData'))['day'] + '\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Утро\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.25f,0.25f,0.25f],T:[0.0f,1.17f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22[4' + (_0x3ff7f0['daysLeft'] == 0x1 ? 'СЕГОДНЯ\x20ПОСЛЕДНИЙ\x20ДЕНЬ\x20ПОГАШЕНИЯ\x20ЗАДОЛЖЕННОСТИ!' : 'До\x20погашения\x20задолженности\x20осталось\x20' + _0x3ff7f0['daysLeft'] + '\x20' + (_0x3ff7f0['daysLeft'] == 0x1 ? 'день' : _0x3ff7f0['daysLeft'] == 0x0 ? 'дней' : _0x3ff7f0['daysLeft'] < 0x5 ? 'дня' : 'дней')) + '\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.35f,0.35f,0.35f],T:[0.0f,1.0f,0.0f],Limb:\x22cube\x22,Morph:{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:60,Color:0,Label:\x22Баланс\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22' + JSON['parse'](_0x4f8e86['getServer']()['getStates']()['getString']('laptop'))['balance'] + '\x20/\x20[e' + _0x3ff7f0['debtCount'] + '[f$\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
                            } else if (_0x3ff7f0['gameStage'] == 'killWolf') {
                                _0x330c03['changeHUDMorph']('phase_change', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:40,Color:0,Label:\x22День\x20' + JSON['parse'](_0x4f8e86['getServer']()['getStates']()['getString']('timeData'))['day'] + '\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Утро\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.25f,0.25f,0.25f],T:[0.0f,1.17f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Max:300,Label:\x22[4' + (_0x3ff7f0['daysLeft'] == 0x1 ? 'СЕГОДНЯ\x20ПОСЛЕДНИЙ\x20ДЕНЬ\x20УБИЙСТВА\x20МОНСТРА!' : 'Осталось' + '\x20' + _0x3ff7f0['daysLeft'] + '\x20' + (_0x3ff7f0['daysLeft'] == 0x1 ? 'день' : _0x3ff7f0['daysLeft'] == 0x0 ? 'дней' : _0x3ff7f0['daysLeft'] < 0x5 ? 'дня' : 'дней')) + '\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.35f,0.35f,0.35f],T:[0.0f,1.0f,0.0f],Limb:\x22cube\x22,Morph:{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-1,Max:60,Color:0,Label:\x22ЗАДАЧА\x22,Name:\x22label\x22,Offset:0.75f}},{S:[0.8f,0.8f,0.8f],T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Убить\x20монстра\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
                            }
                        } else {
                            _0x330c03['setupHUD']('game_end');
                            _0x2360f4 = !![];
                            if (_0x3ff7f0['gameStage'] == 'killWolf') {
                                _0x330c03['changeHUDMorph']('game_end', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-16777216,Max:60,Color:16711719,Label:\x22НЕ\x20ПОВЕЗЛО\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.375f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Max:115,Label:\x22Время\x20на\x20убийство\x20монстра\x20вышло\x20☠\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
                            } else if (_0x3ff7f0['gameStage'] == 'debt') {
                                _0x330c03['changeHUDMorph']('game_end', 0x0, mappet['createMorph']('{Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{Limb:\x22cube\x22,Morph:{Background:-16777216,Max:60,Color:16711719,Label:\x22НЕ\x20ПОВЕЗЛО\x22,Name:\x22label\x22,Offset:0.75f}},{T:[0.0f,0.25f,0.0f],Limb:\x22cube\x22,Morph:{Background:16777215,Label:\x22Вам\x20не\x20удалось\x20избавиться\x20от\x20долгов\x22,Name:\x22label\x22,Offset:0.75f}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}'));
                            }
                        }
                        _0x206cb3['isReady'] = 0x0;
                        _0x330c03['getStates']()['setString']('gameStats', JSON['stringify'](_0x206cb3));
                    });
                    _0x2360f4 ? _0x4f8e86['getServer']()['executeScript']('game.js', 'end') : null;
                }
                _0x3ff7f0['daysLeft'] != 0x0 ? _0x20e67c['freezed'] = 0x0 : _0x20e67c['freezed'] = 0x1;
                _0x4f8e86['getServer']()['getStates']()['setString']('dayResultData', JSON['stringify'](_0x5d8724));
                _0x4f8e86['getServer']()['getStates']()['setString']('timeData', JSON['stringify'](_0x20e67c));
                _0x4f8e86['getServer']()['getStates']()['setNumber']('playersReady', 0x0);
            }
        }
    }
}