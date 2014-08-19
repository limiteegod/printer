KISSY.use("io,node,json,vs-table", function(S, Io, Node, Json, VsTable){

    var body = {};
    var listTable;
    Io({url:CurSite.interPath, data:{cmd:"P02", body:Json.stringify(body)}, success:function(data){
        var body = Json.parse(data.body);
        if(body.repCode == "0000")
        {
            listTable = new VsTable("#opTable", {
                head:["id", "name", "url"],
                colName:["id", "name", "url"],
                data:body.rst,
                row:body.rst.length + 1,
                col:3,
                width:540,
                selectEvent:function(data)
                {
                    Node.one("#backValue").val(Json.stringify(data));
                }
            });
        }
        else
        {
            alert(body.description);
        }
    }});

});
