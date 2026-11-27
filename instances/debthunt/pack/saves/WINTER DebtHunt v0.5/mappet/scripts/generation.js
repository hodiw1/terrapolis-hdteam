const structuresPoses = [
    [0x50, 0x14, 0x0, 'Up'],
    [0x50, 0x14, -0x30, 'Left'],
    [0x20, 0x14, -0x30, 'Right'],
    [0x0, 0x14, -0x20, 'Right'],
    [0x10, 0x14, -0x50, 'Right'],
    [0x40, 0x14, -0x60, 'Left']
];
let blockPoses = [],
    statePoses = [],
    supplyCrates = [],
    evidences = [];

function main(_0x3dbb3c) {
    let _0x389f10 = _0x3dbb3c['getServer']()['getWorld'](0x0);
    klekoshnik(_0x389f10), mushroom(_0x389f10), rock(_0x389f10), structure(_0x389f10), loot(_0x389f10), otherLoot(_0x389f10), supplycrate(_0x389f10), trove(_0x389f10), evidence(_0x389f10), hevidence(_0x389f10), scrathes(_0x389f10);
}

function klekoshnik(_0x4af146) {
    let _0x3dc056 = mappet['box'](0x5f, 0x15, -0x60, 0x0, 0x18, 0x9),
        _0x5cd2bc = _0x3dc056['getBlocksPositions'](_0x4af146, mappet['createBlockState']('minecraft:air')),
        _0x31bf2a, _0x5951db = 0x32;
    _0x3dc056['getBlocksPositions'](_0x4af146, mappet['createBlockState']('hnt:klekoshnik', 0x2))['forEach'](function(_0x468e8d) {
        _0x4af146['removeBlock'](_0x468e8d['x'], _0x468e8d['y'], _0x468e8d['z']);
    }), _0x3dc056['getBlocksPositions'](_0x4af146, mappet['createBlockState']('hnt:klekoshnikempty', 0x2))['forEach'](function(_0x42da7f) {
        _0x4af146['removeBlock'](_0x42da7f['x'], _0x42da7f['y'], _0x42da7f['z']);
    });
    for (let _0x47d212 = 0x0; _0x47d212 < _0x5951db; _0x47d212++) {
        _0x31bf2a = _0x5cd2bc[Math['floor'](mappet['random'](_0x5cd2bc['length']))];
        while (_0x4af146['getBlock'](mappet['vector'](_0x31bf2a['x'], _0x31bf2a['y'] - 0x1, _0x31bf2a['z']))['getBlockId']() != 'hnt:grass') {
            _0x31bf2a = _0x5cd2bc[Math['floor'](mappet['random'](_0x5cd2bc['length']))];
        }
        _0x4af146['setBlock'](mappet['createBlockState']('hnt:klekoshnik', 0x2), _0x31bf2a['x'], _0x31bf2a['y'], _0x31bf2a['z']);
    }
}

function rock(_0xafd9e7) {
    let _0x5e93ad = mappet['box'](0x5f, 0x15, -0x60, 0x0, 0x18, 0x9),
        _0xeef91a = [
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock1', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock1', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock1', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock1', 0x5))],
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock2', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock2', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock2', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock2', 0x5))],
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock3', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock3', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock3', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock3', 0x5))],
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock4', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock4', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock4', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:rock4', 0x5))],
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock1', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock1', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock1', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock1', 0x5))],
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock2', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock2', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock2', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock2', 0x5))],
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock3', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock3', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock3', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock3', 0x5))],
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock4', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock4', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock4', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralrock4', 0x5))],
            [_0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralcrumbs', 0x2)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralcrumbs', 0x3)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralcrumbs', 0x4)), _0x5e93ad['getBlocksPositions'](_0xafd9e7, mappet['createBlockState']('hnt:mineralcrumbs', 0x5))]
        ];
    _0xeef91a['forEach'](function(_0x8ea978) {
        _0x8ea978['forEach'](function(_0x1c3b96, _0x1545a7) {
            _0x1c3b96['forEach'](function(_0x56efc7) {
                _0xafd9e7['setBlock'](mappet['createBlockState']('hnt:rock' + Math['floor'](mappet['random'](0x1, 0x5)), Math['floor'](mappet['random'](0x2, 0x6))), _0x56efc7['x'], _0x56efc7['y'], _0x56efc7['z']);
            });
        });
    });
}

function mineralRock(_0x48c17a) {
    let _0xdaac48 = [0x3, 0x8, 0x5, 0xa],
        _0x182c95 = mappet['box'](0x5f, 0x15, -0x60, 0x0, 0x18, 0x9),
        _0x19a88a = [
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock1', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock1', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock1', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock1', 0x5))],
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock2', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock2', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock2', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock2', 0x5))],
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock3', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock3', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock3', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock3', 0x5))],
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock4', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock4', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock4', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:rock4', 0x5))],
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock1', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock1', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock1', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock1', 0x5))],
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock2', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock2', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock2', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock2', 0x5))],
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock3', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock3', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock3', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock3', 0x5))],
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock4', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock4', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock4', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralrock4', 0x5))],
            [_0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralcrumbs', 0x2)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralcrumbs', 0x3)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralcrumbs', 0x4)), _0x182c95['getBlocksPositions'](_0x48c17a, mappet['createBlockState']('hnt:mineralcrumbs', 0x5))]
        ];
    _0xdaac48['forEach'](function(_0x5e7cdc, _0x1d6023) {
        for (let _0x1185f2 = 0x0; _0x1185f2 < _0x5e7cdc; _0x1185f2++) {
            let _0x587aeb = Math['floor'](mappet['random'](_0x19a88a['length'])),
                _0x6e8f15 = Math['floor'](mappet['random'](_0x19a88a[_0x587aeb]['length'])),
                _0x208dd0;
            while (!_0x19a88a[_0x587aeb][_0x6e8f15]['length']) {
                _0x587aeb = Math['floor'](mappet['random'](_0x19a88a['length'])), _0x6e8f15 = Math['floor'](mappet['random'](_0x19a88a[_0x587aeb]['length']));
            }
            _0x208dd0 = _0x19a88a[_0x587aeb][_0x6e8f15][Math['floor'](mappet['random'](_0x19a88a[_0x587aeb][_0x6e8f15]['length']))], _0x48c17a['setBlock'](mappet['createBlockState']('hnt:mineralrock' + (_0x1d6023 + 0x1), Math['floor'](mappet['random'](0x2, 0x6))), _0x208dd0['x'], _0x208dd0['y'], _0x208dd0['z']);
        }
    });
}

function mushroom(_0x31277c) {
    let _0x246b94 = mappet['box'](0x5f, 0x15, -0x60, 0x0, 0x18, 0x9),
        _0x1df865 = _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('minecraft:air')),
        _0x27d0f7 = [
            [_0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom1', 0x2)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom1', 0x3)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom1', 0x4)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom1', 0x5))],
            [_0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom2', 0x2)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom2', 0x3)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom2', 0x4)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom2', 0x5))],
            [_0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom3', 0x2)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom3', 0x3)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom3', 0x4)), _0x246b94['getBlocksPositions'](_0x31277c, mappet['createBlockState']('hnt:mushroom3', 0x5))]
        ],
        _0x16bf17, _0x4d90e8 = [0xf, 0x14, 0xa];
    _0x27d0f7['forEach'](function(_0x511d68) {
        _0x511d68['forEach'](function(_0x192043) {
            _0x192043['forEach'](function(_0x510352) {
                _0x31277c['removeBlock'](_0x510352['x'], _0x510352['y'], _0x510352['z']);
            });
        });
    }), _0x4d90e8['forEach'](function(_0x3371dd, _0x4cb439) {
        for (let _0x2bf07c = 0x0; _0x2bf07c < _0x3371dd; _0x2bf07c++) {
            _0x16bf17 = _0x1df865[Math['floor'](mappet['random'](_0x1df865['length']))];
            while (_0x31277c['getBlock'](mappet['vector'](_0x16bf17['x'], _0x16bf17['y'] - 0x1, _0x16bf17['z']))['getBlockId']() != 'hnt:grass') {
                _0x16bf17 = _0x1df865[Math['floor'](mappet['random'](_0x1df865['length']))];
            }
            _0x31277c['setBlock'](mappet['createBlockState']('hnt:mushroom' + (_0x4cb439 + 0x1), Math['floor'](mappet['random'](0x2, 0x6))), _0x16bf17['x'], _0x16bf17['y'], _0x16bf17['z']);
        }
    });
}

function structure(_0x4b7084) {
    let _0x43e936 = [
            ['house', 'houseLeft', 'houseRight', 'houseUp'],
            ['building', 'buildingUp', 'buildingLeft', 'buildingRight'],
            ['camp'],
            ['mine'],
            ['tower'],
            ['shelter', 'shelterUp']
        ],
        _0x5ee303, _0x671f44 = [],
        _0x49edc5 = [];
    structuresPoses['forEach'](function(_0x49bb1c) {
        let _0x45a981 = Math['floor'](mappet['random'](_0x43e936['length'])),
            _0x214f63 = _0x43e936[_0x45a981]['indexOf'](_0x43e936[_0x45a981][0x0] + _0x49bb1c[0x3]) != -0x1 ? _0x43e936[_0x45a981][0x0] + _0x49bb1c[0x3] : _0x43e936[_0x45a981][0x0];
        new Structure(_0x4b7084)['loadFromFile'](_0x214f63)['place'](_0x49bb1c[0x0], _0x49bb1c[0x1], _0x49bb1c[0x2]), _0x5ee303 = mappet['box'](_0x49bb1c[0x0], _0x49bb1c[0x1], _0x49bb1c[0x2], _0x49bb1c[0x0] + 0xf, _0x49bb1c[0x1] + 0xb, _0x49bb1c[0x2] + 0xf), blockPoses['push']([_0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('minecraft:wool', 0x5)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('minecraft:wool', 0x1)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('minecraft:wool', 0xe))]);
        if (_0x214f63 == 'tower' || _0x214f63 == 'camp') supplyCrates['push']([_0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:supplycrate_open', 0x2)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:supplycrate_open', 0x4))]);
        else(_0x214f63['startsWith']('house') || _0x214f63['startsWith']('building')) && (evidences['push']([_0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:blood1', 0x2)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:blood1', 0x3)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:blood1', 0x4)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:blood1', 0x5))]), evidences['push']([_0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:scratches1', 0x2)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:scratches1', 0x3)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:scratches1', 0x4)), _0x5ee303['getBlocksPositions'](_0x4b7084, mappet['createBlockState']('hnt:scratches1', 0x5))]));
        _0x43e936['splice'](_0x45a981, 0x1);
    }), blockPoses['forEach'](function(_0x438f39) {
        let _0x2d6b14 = [];
        _0x438f39['forEach'](function(_0x53f6d4) {
            let _0x474fc6 = [];
            _0x53f6d4['forEach'](function(_0x31bf01) {
                _0x474fc6['push'](JSON['parse'](_0x31bf01['toArrayString']()));
            }), _0x2d6b14['push'](_0x474fc6);
        }), _0x671f44['push'](_0x2d6b14);
    }), evidences['forEach'](function(_0x41191f) {
        let _0x1418b0 = [];
        _0x41191f['forEach'](function(_0x26dd49) {
            let _0x4059d2 = [];
            _0x26dd49['forEach'](function(_0x13d8d7) {
                _0x4059d2['push'](JSON['parse'](_0x13d8d7['toArrayString']())), _0x4059d2['push'](_0x4b7084['getBlock'](_0x13d8d7)['getBlockId']()), _0x4059d2['push'](_0x4b7084['getBlock'](_0x13d8d7)['getMeta']());
            }), _0x1418b0['push'](_0x4059d2);
        }), _0x49edc5['push'](_0x1418b0);
    }), getServerFromWorld(_0x4b7084)['getStates']()['setString']('blockPoses', JSON['stringify'](_0x671f44)), getServerFromWorld(_0x4b7084)['getStates']()['setString']('evidencesPoses', JSON['stringify'](_0x49edc5));
}

function loot(_0x54dfb0) {
    let _0x292468 = getServerFromWorld(_0x54dfb0);
    blockPoses['length'] == 0x0 && JSON['parse'](_0x292468['getStates']()['getString']('blockPoses'))['forEach'](function(_0x19a5b8) {
        let _0x5e6289 = [];
        _0x19a5b8['forEach'](function(_0x217dff) {
            let _0x4962cb = [];
            _0x217dff['forEach'](function(_0xadb9ff) {
                _0x4962cb['push'](mappet['vector'](_0xadb9ff[0x0], _0xadb9ff[0x1], _0xadb9ff[0x2]));
            }), _0x5e6289['push'](_0x4962cb);
        }), blockPoses['push'](_0x5e6289);
    }), blockPoses['forEach'](function(_0x1e0caf) {
        let _0x358eb2 = [0x5, 0xa, 0x23],
            _0x5487f3;
        Math['random']() < 0.8 ? _0x5487f3 = Math['floor'](mappet['random'](0x1, 0x5)) : _0x5487f3 = Math['floor'](mappet['random'](0x1, 0x9)), _0x1e0caf['forEach'](function(_0x2eb7bb, _0x3b82c3) {
            _0x2eb7bb['forEach'](function(_0x4f3968) {
                if (Math['random']() > _0x358eb2[_0x3b82c3] / 0xa) {
                    let _0x40e6de = generationItems[_0x3b82c3][Math['floor'](mappet['random'](generationItems[_0x3b82c3]['length']))],
                        _0x19c9dc = summonItem(_0x40e6de, 0x1, mappet['vector'](_0x4f3968['x'] + 0.5, _0x4f3968['y'], _0x4f3968['z'] + 0.5), _0x54dfb0, null);
                    _0x19c9dc['setRotations'](0x0, 0x0, mappet['random'](0xb4)), writeData(_0x19c9dc, _0x3b82c3, _0x40e6de);
                }
                _0x54dfb0['removeBlock'](_0x4f3968['x'], _0x4f3968['y'], _0x4f3968['z']);
            });
        });
    }), blockPoses = [];
}

function otherLoot(_0xd5a93d) {
    let _0x288a05 = [mappet['vector'](0x49, 0x16, 0x13), mappet['vector'](0x28, 0x16, -0x62), mappet['vector'](0x29, 0x12, -0x55)],
        _0x2cf8f9 = [mappet['vector'](0x2b, 0x13, -0x54), mappet['vector'](0x2a, 0x13, -0x58), mappet['vector'](0x15, 0x15, -0x5c), mappet['vector'](0x1, 0x15, -0x34), mappet['vector'](0x8, 0x16, 0x7), mappet['vector'](0x4a, 0x16, 0x13), mappet['vector'](0x5c, 0x15, -0x44)],
        _0x403b23 = [mappet['vector'](0x5d, 0x15, -0x42), mappet['vector'](0x1d, 0x15, -0x23), mappet['vector'](0x7, 0x16, 0x7), mappet['vector'](0xe, 0x15, 0x4), mappet['vector'](1, 21.5, -95)],
        _0x54368e;
    _0x403b23['forEach'](function(_0x57d44c) {
        if (Math['random']() < 0.6) {
            let _0x49a7d3 = Math['floor'](mappet['random'](generationItems[0x0]['length'])),
                _0x3b2c84 = summonItem('' + generationItems[0x0][_0x49a7d3], 0x1, mappet['vector'](_0x57d44c['x'] + 0.5, _0x57d44c['y'], _0x57d44c['z'] + 0.5), _0xd5a93d, null);
            writeData(_0x3b2c84, 0x0, generationItems[0x0][_0x49a7d3]), _0x3b2c84['setRotations'](0x0, 0x0, mappet['random'](0xb4)), generationItems[0x0][_0x49a7d3] == 'note' && _0x3b2c84['remove']();
        }
    }), _0x2cf8f9['forEach'](function(_0x1e6fb9) {
        if (Math['random']() < 0.5) {
            let _0x38dc60 = Math['floor'](mappet['random'](generationItems[0x1]['length'])),
                _0x20b50c = summonItem('' + generationItems[0x1][_0x38dc60], 0x1, mappet['vector'](_0x1e6fb9['x'] + 0.5, _0x1e6fb9['y'], _0x1e6fb9['z'] + 0.5), _0xd5a93d, null);
            writeData(_0x20b50c, 0x1, generationItems[0x1][_0x38dc60]), _0x20b50c['setRotations'](0x0, 0x0, mappet['random'](0xb4)), generationItems[0x1][_0x38dc60] == 'note' && _0x20b50c['remove']();
        }
    }), _0x288a05['forEach'](function(_0x2a6dcb) {
        if (Math['random']() < 0.4) {
            let _0x144143 = Math['floor'](mappet['random'](generationItems[0x2]['length'])),
                _0x4abb4e = summonItem('' + generationItems[0x2][_0x144143], 0x1, mappet['vector'](_0x2a6dcb['x'] + 0.5, _0x2a6dcb['y'], _0x2a6dcb['z'] + 0.5), _0xd5a93d, null);
            writeData(_0x4abb4e, 0x2, generationItems[0x2][_0x144143]), _0x4abb4e['setRotations'](0x0, 0x0, mappet['random'](0xb4));
        }
    });
}

function supplycrate(_0xf9cf98) {
    let _0x508706 = [mappet['vector'](0x4f, 0x15, -0xb), mappet['vector'](0x43, 0x15, -0x18), mappet['vector'](0x37, 0x15, -0x43), mappet['vector'](0x29, 0x15, -0x62)],
        _0x205af0 = [0x4, 0x5, 0x4, 0x5];
    supplyCrates['forEach'](function(_0x2f5fe0) {
        _0x2f5fe0['forEach'](function(_0x378a1f) {
            _0x378a1f['forEach'](function(_0xfe34b7) {
                _0x508706['push'](_0xfe34b7), _0x205af0['push'](_0xf9cf98['getBlock'](_0xfe34b7)['getMeta']());
            });
        });
    }), supplyCrates = [], _0x508706['forEach'](function(_0x5c65bc) {
        _0xf9cf98['removeBlock'](_0x5c65bc['x'], _0x5c65bc['y'], _0x5c65bc['z']);
    });
    for (let _0x346eb9 = 0x0; _0x346eb9 < 0x2; _0x346eb9++) {
        let _0x2a8879 = Math['floor'](mappet['random'](_0x508706['length']));
        _0xf9cf98['setBlock'](mappet['createBlockState']('hnt:supplycrate', _0x205af0[_0x2a8879]), _0x508706[_0x2a8879]['x'], _0x508706[_0x2a8879]['y'], _0x508706[_0x2a8879]['z']), _0x508706['splice'](_0x2a8879, 0x1), _0x205af0['splice'](_0x2a8879, 0x1);
    }
}

function trove(_0x18c4e7) {
    let _0x43c5c7 = mappet['box'](0x5f, 0x15, -0x60, 0x0, 0x18, 0x9),
        _0x319f9e = _0x43c5c7['getBlocksPositions'](_0x18c4e7, mappet['createBlockState']('hnt:grass')),
        _0x560c0f, _0x1d88c9 = Math['floor'](mappet['random'](0x2, 0x5));
    _0x43c5c7['getBlocksPositions'](_0x18c4e7, mappet['createBlockState']('hnt:trove', 0x2))['forEach'](function(_0x559018) {
        _0x18c4e7['setBlock'](mappet['createBlockState']('hnt:grass'), _0x559018['x'], _0x559018['y'], _0x559018['z']);
    }), _0x43c5c7['getBlocksPositions'](_0x18c4e7, mappet['createBlockState']('hnt:trovedigged', 0x2))['forEach'](function(_0x38f26b) {
        _0x18c4e7['setBlock'](mappet['createBlockState']('hnt:grass'), _0x38f26b['x'], _0x38f26b['y'], _0x38f26b['z']);
    });
    for (let _0x539228 = 0x0; _0x539228 < _0x1d88c9; _0x539228++) {
        _0x560c0f = _0x319f9e[Math['floor'](mappet['random'](_0x319f9e['length']))];
        while (_0x18c4e7['getBlock'](mappet['vector'](_0x560c0f['x'], _0x560c0f['y'] + 0x1, _0x560c0f['z']))['getBlockId']() != 'minecraft:air') {
            _0x560c0f = _0x319f9e[Math['floor'](mappet['random'](_0x319f9e['length']))];
        }
        _0x18c4e7['setBlock'](mappet['createBlockState']('hnt:trove', 0x2), _0x560c0f['x'], _0x560c0f['y'], _0x560c0f['z']);
    }
}

function evidence(_0xa8a4ac) {
    let _0x2cc51d = [],
        _0x26b597 = [],
        _0x5c61c3 = [],
        _0x4f4b9d;
    evidences['length'] != 0x0 ? evidences['forEach'](function(_0x1247a5) {
        _0x1247a5['forEach'](function(_0x45f889) {
            _0x45f889['forEach'](function(_0x3e19ba) {
                _0x26b597['push'](_0x3e19ba), _0x2cc51d['push'](_0xa8a4ac['getBlock'](_0x3e19ba)['getBlockId']()), _0x5c61c3['push'](_0xa8a4ac['getBlock'](_0x3e19ba)['getMeta']()), _0xa8a4ac['removeBlock'](_0x3e19ba['x'], _0x3e19ba['y'], _0x3e19ba['z']);
            });
        });
    }) : JSON['parse'](getServerFromWorld(_0xa8a4ac)['getStates']()['getString']('evidencesPoses'))['forEach'](function(_0x2cf574) {
        _0x2cf574['forEach'](function(_0x31c65c) {
            _0x31c65c['length'] != 0x0 && (_0x26b597['push'](mappet['vector'](_0x31c65c[0x0][0x0], _0x31c65c[0x0][0x1], _0x31c65c[0x0][0x2])), _0x2cc51d['push'](_0x31c65c[0x1]), _0x5c61c3['push'](_0x31c65c[0x2]), _0xa8a4ac['removeBlock'](_0x31c65c[0x0][0x0], _0x31c65c[0x0][0x1], _0x31c65c[0x0][0x2]));
        });
    });
    _0x2cc51d['push']('hnt:blood1'), _0x5c61c3['push'](0x2), _0x26b597['push'](mappet['vector'](0x2b, 0x14, -0x54)), _0xa8a4ac['removeBlock'](0x2b, 0x14, -0x54), _0x2cc51d['push']('hnt:scratches1'), _0x5c61c3['push'](0x4), _0x26b597['push'](mappet['vector'](0x2e, 0x14, -0x59)), _0xa8a4ac['removeBlock'](0x2e, 0x14, -0x59), evidences = [];
    for (let _0x5ea2dc = 0x0; _0x5ea2dc < 0x2; _0x5ea2dc++) {
        _0x4f4b9d = Math['floor'](mappet['random'](_0x26b597['length'])), _0xa8a4ac['setBlock'](mappet['createBlockState'](_0x2cc51d[_0x4f4b9d], _0x5c61c3[_0x4f4b9d]), _0x26b597[_0x4f4b9d]['x'], _0x26b597[_0x4f4b9d]['y'], _0x26b597[_0x4f4b9d]['z']), _0xa8a4ac['spawnNpc']('photoTraker', _0x26b597[_0x4f4b9d]['x'] + 0.5, _0x26b597[_0x4f4b9d]['y'], _0x26b597[_0x4f4b9d]['z'] + 0.5);
    }
}

function hevidence(_0x564189) {
    let _0x4893dc = [
            ['bones1'],
            ['step1', 'step2'],
            ['clothes1', 'clothes2']
        ],
        _0x2df996 = [
            ['grass'],
            ['grass', 'dirt', 'yellowgrass'],
            ['stone1', 'stone2', 'planks3h']
        ],
        _0x355255 = mappet['box'](0x5f, 0x11, -0x60, 0x0, 0x18, 0x9),
        _0x44fad7 = [
            [
                [_0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:bones1', 0x2)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:bones1', 0x3)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:bones1', 0x4)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:bones1', 0x5))]
            ],
            [
                [_0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:step1', 0x2)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:step1', 0x3)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:step1', 0x4)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:step1', 0x5))],
                [_0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:step2', 0x2)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:step2', 0x3)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:step2', 0x4)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:step2', 0x5))]
            ],
            [
                [_0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:clothes1', 0x2)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:clothes1', 0x3)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:clothes1', 0x4)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:clothes1', 0x5))],
                [_0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:clothes2', 0x2)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:clothes2', 0x3)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:clothes2', 0x4)), _0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('hnt:clothes2', 0x5))]
            ]
        ];
    _0x44fad7['forEach'](function(_0x338b64) {
        _0x338b64['forEach'](function(_0x2fc007) {
            _0x2fc007['forEach'](function(_0x37fe1e) {
                _0x37fe1e['forEach'](function(_0x1d182b) {
                    _0x564189['getBlock'](_0x1d182b)['getBlockId']() == 'hnt:bones1' && _0x564189['setBlock'](mappet['createBlockState']('hnt:grass'), _0x1d182b['x'], _0x1d182b['y'] - 0x1, _0x1d182b['z']), _0x564189['removeBlock'](_0x1d182b['x'], _0x1d182b['y'], _0x1d182b['z']);
                });
            });
        });
    }), _0x44fad7 = [], _0x4893dc['forEach'](function(_0xfd9af8, _0x552628) {
        _0xfd9af8['forEach'](function(_0x1b6e98) {
            let _0x5ad0ab;
            _0x44fad7 = Java['from'](_0x355255['getBlocksPositions'](_0x564189, mappet['createBlockState']('minecraft:air'))), _0x44fad7['forEach'](function(_0x279544, _0x5c7c8d) {
                (_0x2df996[_0x552628]['indexOf'](_0x564189['getBlock'](_0x279544['x'], _0x279544['y'] - 0x1, _0x279544['z'])['getBlockId']()['split'](':')['pop']()) == -0x1 || _0x564189['getBlock'](_0x279544['x'], _0x279544['y'] - 0x2, _0x279544['z'])['getBlockId']() == 'minecraft:air') && _0x44fad7['splice'](_0x5c7c8d, 0x1);
            }), _0x5ad0ab = _0x44fad7[Math['floor'](mappet['random'](_0x44fad7['length']))];
            while (_0x2df996[_0x552628]['indexOf'](_0x564189['getBlock'](_0x5ad0ab['x'], _0x5ad0ab['y'] - 0x2, _0x5ad0ab['z'])['getBlockId']()['split'](':')['pop']()) == -0x1 || _0x564189['getBlock'](_0x5ad0ab['x'], _0x5ad0ab['y'] - 0x1, _0x5ad0ab['z'])['getBlockId']() != 'minecraft:air') {
                _0x5ad0ab = _0x44fad7[Math['floor'](mappet['random'](_0x44fad7['length']))];
            }
            _0x564189['setBlock'](mappet['createBlockState']('hnt:' + _0x1b6e98, Math['floor'](mappet['random'](0x2, 0x6))), _0x5ad0ab['x'], _0x5ad0ab['y'] - 0x1, _0x5ad0ab['z']), _0x564189['spawnNpc']('photoTraker', _0x5ad0ab['x'] + 0.5, _0x5ad0ab['y'] - 0x1, _0x5ad0ab['z'] + 0.5), _0x1b6e98 == 'bones1' && _0x564189['setBlock'](mappet['createBlockState']('hnt:dirt'), _0x5ad0ab['x'], _0x5ad0ab['y'] - 0x2, _0x5ad0ab['z']);
        });
    });
}

function scrathes(_0x5f3c03) {
    let _0x4b785f = mappet['box'](0x0, 0x16, 0x9, 0x5f, 0x19, -0x60),
        _0x281301 = [_0x4b785f['getBlocksPositions'](_0x5f3c03, mappet['createBlockState']('hnt:tree1trunk3', 0x2)), _0x4b785f['getBlocksPositions'](_0x5f3c03, mappet['createBlockState']('hnt:tree1trunk3', 0x3)), _0x4b785f['getBlocksPositions'](_0x5f3c03, mappet['createBlockState']('hnt:tree1trunk3', 0x4)), _0x4b785f['getBlocksPositions'](_0x5f3c03, mappet['createBlockState']('hnt:tree1trunk3', 0x5))],
        _0x1da514 = [],
        _0x27a1d6 = [];
    _0x281301['forEach'](function(_0x19bcb9) {
        _0x19bcb9['forEach'](function(_0x18035e) {
            _0x1da514['push'](_0x18035e);
        });
    }), _0x281301 = [_0x4b785f['getBlocksPositions'](_0x5f3c03, mappet['createBlockState']('hnt:scratchestree', 0x2)), _0x4b785f['getBlocksPositions'](_0x5f3c03, mappet['createBlockState']('hnt:scratchestree', 0x3)), _0x4b785f['getBlocksPositions'](_0x5f3c03, mappet['createBlockState']('hnt:scratchestree', 0x4)), _0x4b785f['getBlocksPositions'](_0x5f3c03, mappet['createBlockState']('hnt:scratchestree', 0x5))], _0x281301['forEach'](function(_0x2e3386) {
        _0x2e3386['forEach'](function(_0x3c490b) {
            _0x5f3c03['removeBlock'](_0x3c490b['x'], _0x3c490b['y'], _0x3c490b['z']);
        });
    }), delete _0x281301, _0x1da514['forEach'](function(_0x5d80c2, _0x5358c3) {
        !(_0x5f3c03['getBlock'](_0x5d80c2['x'] - 0x1, _0x5d80c2['y'], _0x5d80c2['z'])['getBlockId']() != 'minecraft:air' || _0x5f3c03['getBlock'](_0x5d80c2['x'], _0x5d80c2['y'], _0x5d80c2['z'] + 0x1)['getBlockId']() != 'minecraft:air' || _0x5f3c03['getBlock'](_0x5d80c2['x'] + 0x1, _0x5d80c2['y'], _0x5d80c2['z'])['getBlockId']() != 'minecraft:air' || _0x5f3c03['getBlock'](_0x5d80c2['x'], _0x5d80c2['y'], _0x5d80c2['z'] - 0x1)['getBlockId']() != 'minecraft:air') && _0x27a1d6['push'](_0x5d80c2);
    }), delete _0x1da514;
    for (let _0x2d0940 = 0x0; _0x2d0940 < 0x2; _0x2d0940++) {
        let _0xba3ce9 = Math['floor'](mappet['random'](0x2)) == 0x1,
            _0xac664 = Math['floor'](mappet['random'](0x2)) == 0x1 ? 0x1 : -0x1,
            _0x2ce1b2 = _0x27a1d6[Math['floor'](mappet['random'](_0x27a1d6['length']))],
            _0x1be477;
        _0xba3ce9 ? (_0x1be477 = _0xac664 == 0x1 ? 0x5 : 0x4, _0x5f3c03['setBlock'](mappet['createBlockState']('hnt:scratchestree', _0x1be477), _0x2ce1b2['x'] + _0xac664, _0x2ce1b2['y'], _0x2ce1b2['z']), _0x5f3c03['spawnNpc']('photoTraker', _0x2ce1b2['x'] + _0xac664 + 0.5, _0x2ce1b2['y'], _0x2ce1b2['z'] + 0.5)) : (_0x1be477 = _0xac664 == 0x1 ? 0x3 : 0x2, _0x5f3c03['setBlock'](mappet['createBlockState']('hnt:scratchestree', _0x1be477), _0x2ce1b2['x'], _0x2ce1b2['y'], _0x2ce1b2['z'] + _0xac664), _0x5f3c03['spawnNpc']('photoTraker', _0x2ce1b2['x'] + 0.5, _0x2ce1b2['y'], _0x2ce1b2['z'] + _0xac664 + 0.5));
    }
}

function writeData(_0x53923a, _0x2ab3f, _0x5551dc) {
    switch (_0x2ab3f) {
        case 0x0:
            switch (_0x5551dc) {
                case 'hnt:wireroll':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Meters:' + Math['floor'](mappet['random'](0x1, 0x6)) + '}'));
                    break;
                case 'hnt:scrap1':
                case 'hnt:scrap2':
                case 'hnt:scrap3':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Weight:' + mappet['random'](0.5, 0x2)['toFixed'](0x2) + '}'));
                    break;
                case 'hnt:lighter':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Norm:0}'));
                    break;
                case 'hnt:note':
                    getServerFromWorld(_0x53923a['getWorld']())['getStates']()['getNumber']('noteIsSpawned') ? _0x53923a['remove']() : (_0x53923a['getEntityData']()['setInt']('index', Math['floor'](mappet['random'](0x5))), _0x53923a['setMorph'](mappet['createMorph']('{Hitbox:{Eye:0.9f,Sneak:0.49f,Enabled:1b,Height:0.49f,Width:0.49f},Skin:\x22b.a:empty/skins/texture.png\x22,BodyParts:[{T:[0.0f,-0.5f,0.0f],Limb:\x22cube\x22,Morph:{Lighting:1b,Name:\x22item\x22,Stack:{id:\x22hnt:note\x22,Count:1b,Damage:0s}}}],Settings:{Hands:1b},Name:\x22blockbuster.empty\x22}')), getServerFromWorld(_0x53923a['getWorld']())['getStates']()['setNumber']('noteIsSpawned', 0x1));
                    break;
            }
            break;
        case 0x1:
            switch (_0x5551dc) {
                case 'hnt:drivlic':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Norm:' + Math['floor'](mappet['random'](0x2)) + '}'));
                    break;
                case 'hnt:lighter':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Norm:1}'));
                    break;
                case 'hnt:wireroll':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Meters:' + Math['floor'](mappet['random'](0x5, 0xb)) + '}'));
                    break;
                case 'hnt:silverbunny':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Weight:' + mappet['random'](0.2, 0.8)['toFixed'](0x2) + '}'));
                    break;
                case 'hnt:gascan':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Fuel:' + mappet['random'](0.5, 2.5)['toFixed'](0x2) + '}'));
                    break;
                case 'hnt:crowbar':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Repair:' + Math['floor'](mappet['random'](0x14, 0x3d)) + '}'));
                    break;
            }
            break;
        case 0x2:
            switch (_0x5551dc) {
                case 'hnt:wallet':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Money:' + Math['floor'](mappet['random'](0x3, 0x65)) + '}'));
                    break;
                case 'hnt:airhornitem':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Uses:' + Math['floor'](mappet['random'](0x4)) + '}'));
                    break;
                case 'hnt:gascan':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Fuel:' + mappet['random'](2.5, 0x5)['toFixed'](0x2) + '}'));
                    break;
                case 'hnt:cellphone':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Norm:' + Math['floor'](mappet['random'](0x2)) + '}'));
                    break;
                case 'hnt:goldduck':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Weight:' + mappet['random'](0.2, 0.8)['toFixed'](0x2) + '}'));
                    break;
                case 'hnt:pickaxe':
                    _0x53923a['getEntityData']()['setCompound']('tag', mappet['createCompound']('{Repair:' + Math['floor'](mappet['random'](0x14, 0x47)) + ',HideFlags:24,CanDestroy:[\x22hnt:mineralrock1\x22,\x22hnt:mineralrock2\x22,\x22hnt:mineralrock3\x22,\x22hnt:mineralrock4\x22]}'));
                    break;
            }
            break;
    }
}