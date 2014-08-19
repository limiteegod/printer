KISSY.use("io,node,json", function(S, Io, Node, Json){

    Node.one("button.continue").html("提交");

    Node.one("button.continue").on("click", function(){
        var name = Node.one("#name").val();
        var pwd = Node.one("#pwd").val();
        var body = {name:name, password:pwd, uniqueId:CurSite.createUUID()};
        Io({type:"post", url:CurSite.interPath, data:{cmd:"AD01", body:Json.stringify(body)}, success:function(data){
            if(data.repCode == "0000")
            {
                window.location = CurSite.getAbsolutePath("pages/admin/index.html");
            }
            else
            {
                alert(body.description);
            }
        }});
    });

});
