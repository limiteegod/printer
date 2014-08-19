KISSY.use("io,node,json,vs-data-select,vs-round-input,vs-window", function(S, Io, Node, Json, VsDataSelect, VsRoundInput, VsWindow){

    var parentId = "";

    var vsRoundInput = new VsRoundInput("#name", {width:180});
    var urlInput = new VsRoundInput("#url", {width:180});

    var vsDataSelect = new VsDataSelect("#dataSelect", {
        width:200
        ,
        click:function()
        {
            parentId = "";
            var myWindow = new VsWindow("#myWindow", {title:"权限父级选择", width:600, height:480,
                sureEvent:function(data){
                    parentId = data.id;
                    vsDataSelect.setData(data);
                }
            });
        }
    });

    var submit = Node.one("#submit");
    submit.on("click", function(){
        var name = vsRoundInput.getData();
        var url = urlInput.getData();
        var type = Node.one("#type").val();
        if(name.length == 0 || url.length == 0)
        {
            alert("请填写必要字段");
        }
        var body = {op:{name:name, url:url, parentId:parentId, type:type}};
        var listTable;
        Io({url:CurSite.interPath, data:{cmd:"P03", body:Json.stringify(body)}, success:function(data){
            var body = Json.parse(data.body);
            if(body.repCode == "0000")
            {
                alert(body.description);
            }
            else
            {
                alert(body.description);
            }
        }});
    });

});
