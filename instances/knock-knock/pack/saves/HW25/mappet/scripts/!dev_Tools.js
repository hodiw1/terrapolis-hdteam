function blockBroken(c) {
    var s = c.getSubject(),
        block = c.getValue("block"),
        forbiddenBlocks = ["blockbuster:model", "mappet:region"],
        isForbidden = forbiddenBlocks.indexOf(block) > -1;

    if (isForbidden || s.getStates().getString("canDestroyBlocks") != "true") {
        c.cancel();
        s.sendActionBar(isForbidden ? "§4Этот блок нельзя разрушать!" : "§cРазрушение отключено");
    }
}