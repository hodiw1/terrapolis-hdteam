"Я это даже не занесу в комментарий ведь нехуй смотреть в чужой код";

let Structure = (function() {
    function Structure(world) {
        this.world = world;
        this.tileEntities = [];
    }
    Structure.prototype.loadFromWorld = function(x, y, z, x2, y2, z2) {
        let minX = Math.min(x, x2);
        let minY = Math.min(y, y2);
        let minZ = Math.min(z, z2);
        let maxX = Math.max(x, x2);
        let maxY = Math.max(y, y2);
        let maxZ = Math.max(z, z2);

        this.width = maxX - minX + 1;
        this.height = maxY - minY + 1;
        this.length = maxZ - minZ + 1;

        let array = new Array(this.width);

        for (let i = 0; i <= this.width; i++) {
            array[i] = new Array(this.height);

            for (let j = 0; j <= this.height; j++) {
                array[i][j] = new Array(this.length);
                for (let k = 0; k <= this.length; k++) {
                    array[i][j][k] = null;
                }
            }
        }

        this.blockstates = array;
        this.copyBlocks(minX, minY, minZ);
        return this;
    };
    Structure.prototype.copyBlocks = function(x, y, z) {
        for (let localX = 0; localX <= this.width; localX++) {
            for (let localY = 0; localY <= this.height; localY++) {
                for (let localZ = 0; localZ <= this.length; localZ++) {
                    let pos = mappet.vector(x + localX, y + localY, z + localZ);
                    let success = this.setBlockState(mappet.vector(localX, localY, localZ), this.world.getBlock(pos));

                    if (success && this.world.hasTileEntity(pos.x, pos.y, pos.z)) {
                        this.copyTileEntity(pos, mappet.vector(localX, localY, localZ));
                    }
                }
            }
        }
    };
    Structure.prototype.copyTileEntity = function(pos, localPos) {
        let tileEntity = this.world.getTileEntity(pos.x, pos.y, pos.z);

        if (tileEntity == null) return;
        try {
            this.setTileEntity(localPos, tileEntity);
        } catch (e) {
            this.setBlockState(localPos, mappet.createBlockState("minecraft:air"));
        }
    };
    Structure.prototype.place = function(x, y, z) {
        for (let localX = 0; localX < this.width; localX++) {
            for (let localY = 0; localY < this.height; localY++) {
                for (let localZ = 0; localZ < this.length; localZ++) {
                    let blockState = this.getBlockState(mappet.vector(localX, localY, localZ));
                    
                    this.world.setBlock(blockState, x + localX, y + localY, z + localZ);
                    if (this.world.hasTileEntity(x + localX, y + localY, z + localZ)) {
                        let data = this.getTileEntity(mappet.vector(localX, localY, localZ));
                        
                        if (data == null) continue;
                        data.setInt("x", x + localX);
                        data.setInt("y", y + localY);
                        data.setInt("z", z + localZ);
                        this.world.getTileEntity(x + localX, y + localY, z + localZ).setData(data);
                    }
                }
            }
        }
    };
    Structure.prototype.saveToFile = function(name) {
        let file = mappet.getWorldDir().resolve("huntSchemas/" + name + ".json");
        let array = new Array(this.width);
        let object = {
            width: this.width,
            height: this.height,
            length: this.length,
            tileEntities: [],
            blockStates: []
        };

        this.tileEntities.forEach(function(tileEntity) {
            object.tileEntities.push(tileEntity.stringify());
        });
        for (let i = 0; i <= this.width; i++) {
            array[i] = new Array(this.height);

            for (let j = 0; j <= this.height; j++) {
                array[i][j] = new Array(this.length);
                for (let k = 0; k <= this.length; k++) {
                    array[i][j][k] = 0;
                }
            }
        }
        object.blockStates = array;
        for (let localX = 0; localX < this.width; localX++) {
            for (let localY = 0; localY < this.height; localY++) {
                for (let localZ = 0; localZ < this.length; localZ++) {
                    let blockState = this.getBlockState(mappet.vector(localX, localY, localZ));

                    if (blockState.getBlockId() == "minecraft:air") continue;
                    if (blockState.getBlockId() == "littletiles:blocklittletiles") {
                        object.blockStates[localX][localY][localZ] = 1;
                        continue;
                    };
                    if (blockState.getBlockId() == "hnt:grass") {
                        object.blockStates[localX][localY][localZ] = 2;
                        continue;
                    };
                    object.blockStates[localX][localY][localZ] = {
                        id: blockState.getBlockId()
                    };
                    if (blockState.getMeta() != 0) {
                        object.blockStates[localX][localY][localZ] = {
                            id: blockState.getBlockId(),
                            meta: blockState.getMeta()
                        };
                    }
                }
            }
        }
        try {
            file.createFile();
            file.write(JSON.stringify(object));
        } catch (e) {
            file.write(JSON.stringify(object));
        }
    };
    Structure.prototype.loadFromFile = function(name) {
        let file = JSON.parse(mappet.getWorldDir().resolve("huntSchemas/" + name + ".json").read());
        let penis = [];

        this.width = file.width;
        this.height = file.height;
        this.length = file.length;
        for each(let string in file.tileEntities) {
            this.tileEntities.push(mappet.createCompound(string));
        }
        let array = new Array(this.width);

        for (let i = 0; i <= this.width; i++) {
            array[i] = new Array(this.height);

            for (let j = 0; j <= this.height; j++) {
                array[i][j] = new Array(this.length);
                for (let k = 0; k <= this.length; k++) {
                    if (file.blockStates[i][j][k] == 0) {
                        array[i][j][k] = mappet.createBlockState("minecraft:air");
                        continue;
                    } else if (file.blockStates[i][j][k] == 1) {
                        array[i][j][k] = mappet.createBlockState("littletiles:blocklittletiles");
                        continue;
                    } else if (file.blockStates[i][j][k] == 2) {
                        array[i][j][k] = mappet.createBlockState("hnt:grass");
                        continue;
                    }
                    array[i][j][k] = mappet.createBlockState(file.blockStates[i][j][k].id, file.blockStates[i][j][k].meta == undefined ? 0 : file.blockStates[i][j][k].meta);
                }
            }
        }
        this.blockstates = array;
        return this;
    };
    Structure.prototype.setBlockState = function(pos, blockState) {
        if (this.isInvalid(pos)) return false;

        this.blockstates[pos.x][pos.y][pos.z] = blockState;
        return true;
    };
    Structure.prototype.getBlockState = function(pos) {
        if (this.isInvalid(pos)) return mappet.createBlockState("minecraft:air");

        return this.blockstates[pos.x][pos.y][pos.z];
    };
    Structure.prototype.setTileEntity = function(pos, tileEntity) {
        if (this.isInvalid(pos)) return;
        this.removeTileEntity(pos);
        if (tileEntity != null) {
            let data = tileEntity.getData();

            data.setInt("x", pos.x);
            data.setInt("y", pos.y);
            data.setInt("z", pos.z);
            this.tileEntities.push(data);
        }
    };
    Structure.prototype.getTileEntity = function(pos) {
        for each(let tileEntity in this.tileEntities) {
            if (tileEntity.getInt("x") == pos.x && tileEntity.getInt("y") == pos.y && tileEntity.getInt("z") == pos.z) {
                return tileEntity;
            }
        }
        return null;
    };
    Structure.prototype.removeTileEntity = function(pos) {
        this.tileEntities.forEach(function(tileEntity, index) {
            if (tileEntity.getInt("x") == pos.x && tileEntity.getInt("y") == pos.y && tileEntity.getInt("z") == pos.z) {
                this.tileEntities.splice(index, 1);
            }
        });
    };
    Structure.prototype.isInvalid = function(pos) {
        return pos.x < 0 || pos.y < 0 || pos.z < 0 || pos.x >= this.width || pos.y >= this.height || pos.z >= this.length;
    };
    Structure.prototype.toString = function() {
        return "Горшочек новый, воды немного, и лучик солнца ещё подарит друга, а солнце светит, как прежде светит, ты дал нам жизнь, теперь мы за твою в ответе";
    };
    return Structure;
}());

function main(c) {
    //new Structure(c.getWorld()).loadFromWorld(-65, 3, 82, -50, 13, 97).saveToFile("buildingRight");
    new Structure(c.getWorld()).loadFromFile("buildingRight").place(-95, 3, 128);
}