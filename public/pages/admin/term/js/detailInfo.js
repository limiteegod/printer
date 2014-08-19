KISSY.use("io,node,json,vs-game,vs-round-input,vs-panel", function(S, Io, Node, Json, VsGame, VsRoundInput, VsPanel){

    var detailPanel = new VsPanel("#detail", {width:400});
    var refundDetailPanel = new VsPanel("#refundDetail", {width:580});
    var printDetailPanel = new VsPanel("#printDetail", {width:980});
    var hitDetailPanel = new VsPanel("#hitDetail", {width:980});
    var hitOrderDetailPanel = new VsPanel("#hitOrderDetail", {width:980});

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

    //点击查询
    var searchButton = Node.one("#search");
    searchButton.on("click", function(){
        var url = CurSite.getAbsolutePath("pages/admin/term/detailInfo.htm") + "?frameId=" + frameId + "&gameCode=" + gameCodeNode.val() + "&termCode=" + termCodeInput.getData();
        CurSite.redirectTo(frameId, url);
    });

    var body = {gameCode:gameCodeFromServer, termCode:termCodeFromServer, uniqueId:CurSite.createUUID()};
    var listTable;
    Io({url:CurSite.interPath, data:{cmd:"AD04", body:Json.stringify(body)}, success:function(data){
        var body = data;
        for(var i = 0; i < body.rst.length; i++)
        {
            body.rst[i]["gameCodeName"] = vsGame.getNameByCode(body.rst[i]["gameCode"]);
            body.rst[i]["openTimeFormat"] = CurSite.getShortDateStr(body.rst[i]["openTime"]);
            body.rst[i]["endTimeFormat"] = CurSite.getShortDateStr(body.rst[i]["endTime"]);
        }
        if(body.repCode == "0000")
        {

        }
        else
        {
            alert(body.description);
        }
    }});

});
