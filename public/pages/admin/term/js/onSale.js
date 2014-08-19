KISSY.use("io,node,json,vs-round-input,vs-table,vs-game", function(S, Io, Node, Json, VsRoundInput, VsTable, VsGame){

    var vsGame = new VsGame("#vsgame", {});
    var gameType = parseInt(Node.one("#gameType").val());
    var body = {gameType:gameType, uniqueId:CurSite.createUUID(), exStatusList:[1901]};
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
            listTable = new VsTable("#termTable", {
                head:["游戏", "期号", "开售时间", "停售时间", "状态"],
                colName:["gameCodeName", "code", "openTimeFormat", "endTimeFormat", "status"],
                data:body.rst,
                row:body.rst.length + 1,
                col:5,
                width:1000,
                selectEvent:function(data)
                {
                    //testPanel.setHtml(data.description);
                }
            });
        }
        else
        {
            alert(body.description);
        }
    }});

});
