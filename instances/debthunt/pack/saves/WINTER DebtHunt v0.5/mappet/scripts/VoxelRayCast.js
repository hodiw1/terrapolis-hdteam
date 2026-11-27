let VoxelRayCast = (function() {
    function VoxelRayCast(minecraftResult) {
        this.minecraftResult = minecraftResult.getMinecraftRayTraceResult();
    }
    VoxelRayCast.prototype.getRawHitVec = function() {
        let hitVec = JSON.parse(String(this.minecraftResult.field_72307_f).replace("(", "[").replace(")", "]"));

        return mappet.vector(hitVec[0], hitVec[1], hitVec[2]);
    };
    VoxelRayCast.prototype.getDirection = function() {
        return String(this.minecraftResult.field_178784_b);
    };
    VoxelRayCast.prototype.toString = function() {
        return "VoxelRayCast(RawHitVec=" + this.getRawHitVec() + ",Direction=" + this.getDirection() + ",VoxelHitVec=" + this.getVoxelHitVec() + ",BlockPos=" + this.getBlockPos() + ")";
    };
    VoxelRayCast.prototype.getBlockPos = function() {
        let blockPos = JSON.parse(this.minecraftResult.func_178782_a().toString().slice(8).replaceAll("=", ":").replace("x", "\"x\"").replace("y", "\"y\"").replace("z", "\"z\""));

        return mappet.vector(blockPos.x, blockPos.y, blockPos.z);
    };
    VoxelRayCast.prototype.getVoxelHitVec = function() {
        let block = this.getRawHitVec().subtract(this.getBlockPos());

        return mappet.vector(Math.floor(block.x * 16), Math.floor(block.y * 16), Math.floor(block.z * 16));
    };
    return VoxelRayCast;
}());