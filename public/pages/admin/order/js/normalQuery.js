KISSY.use("io,node,json,vs-grid-table,vs-game,vs-round-input", function(S, Io, Node, Json, VsGridTable, VsGame, VsRoundInput){

    var gridTable = new VsGridTable("#gridTable", {});

    var frameId = Node.one("#frameId").val();
    var gameCodeFromServer = Node.one("#gameCodeFromServer").val();
    if(gameCodeFromServer == null)
    {
        gameCodeFromServer = "T01";
    }
    var termCodeFromServer = Node.one("#termCodeFromServer").val();

    var gameCodeNode = Node.one("#gameCode");
    var vsGame = new VsGame();
    var games = vsGame.getAll();
    for(var i = 0; i < games.length; i++)
    {
        var html = '<option value="' + games[i].code + '" ';
        if(gameCodeFromServer == games[i].code)
        {
            html += 'selected="true"';
        }
        html += '>' + games[i].name + '</option>';
        gameCodeNode.append(html);
    }

    //期次输入框
    var termCodeInput = new VsRoundInput("#termCode", {width:180});
    termCodeInput.setData(termCodeFromServer);

    //方案id输入框
    var schemeIdInput = new VsRoundInput("#schemeId", {width:180});
    schemeIdInput.setData("");
});
