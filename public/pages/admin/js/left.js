KISSY.use("io,node,json,tree", function(S, Io, Node, Json, Tree){

    var tree = new Tree({
        content : "权限管理",
        expanded : true,
        showRootNode:false,
        render : "#treeContainer"
    });

    var body = {uniqueId:CurSite.createUUID()};
    Io({url:CurSite.interPath, data:{cmd:"AP01", body:Json.stringify(body)}, success:function(data){
        var body = data;
        if(body.repCode == "0000")
        {
            var rst = body.rst;
            for(var i = 0; i < rst.length; i++)
            {
                if(rst[i].operation.type == 0)
                {
                    var tNode = new Tree.Node({
                        content : rst[i].operation.name,
                        tree : tree
                    });
                    for(var j = 0; j < rst.length; j++)
                    {
                        if(rst[j].operation.parentId == rst[i].operation.id)
                        {
                            var cNode = new Tree.Node({
                                content : rst[j].operation.name,
                                tree : tree,
                                tUrl: rst[j].operation.url
                            });
                            tNode.addChild(cNode);
                        }
                    }
                    tree.addChild(tNode);
                }
            }
            tree.render();
            tree.on("click", function(e) {
                var tUrl = e.target.get("tUrl");
                if(tUrl == undefined)
                    return;
                parent.document.getElementById("mainFrame").src = e.target.get("tUrl") + "?frameId=mainFrame";
            });
        }
        else
        {
            alert(body.description);
        }
    }});

});
