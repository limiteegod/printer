KISSY.use("io,node,json,vs-table,vs-panel", function(S, Io, Node, Json, VsTable, VsPanel){
    var page = Node.one("#page").val();
    var size = Node.one("#size").val();

    var testPanel = new VsPanel("#testPanel", {
    });

    var body = {};
    var listTable;
    Io({url:CurSite.interPath, data:{cmd:"L02", body:Json.stringify(body)}, success:function(data){
        var body = Json.parse(data.body);

        if(body.repCode == "0000")
        {
            listTable = new VsTable("#testTable", {
                head:["联赛名称"],
                colName:["name"],
                data:body.rst,
                row:body.rst.length + 1,
                col:1,
                width:200,
                selectEvent:function(data)
                {
                    testPanel.setHtml(data.description);
                }
            });
        }
        else
        {
            alert(body.description);
        }
    }});

    Node.one("#delete").on("click", function(){
        var body = {id:listTable.getSelectedId()};
        Io({url:CurSite.interPath, data:{cmd:"L03", body:Json.stringify(body)}, success:function(data){
            var body = Json.parse(data.body);
            if(body.repCode == "0000")
            {
                window.location = "listLeague.htm?page=" + page + "&size=" + size;
            }
            else
            {
                alert(body.description);
            }
        }});
    });

    /*Node.all(".table_button_delete").on("click", function(){
        var body = {id:Node.one(this).attr("dataId")};
        Io({url:CurSite.interPath, data:{cmd:"L03", body:Json.stringify(body)}, success:function(data){
            var body = Json.parse(data.body);
            if(body.repCode == "0000")
            {
                window.location = "listLeague.htm?page=" + page + "&size=" + size;
            }
            else
            {
                alert(body.description);
            }
        }});
    });*/

});
