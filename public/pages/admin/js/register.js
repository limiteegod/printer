KISSY.use("io,node,json", function(S, Io, Node, Json){

    Node.one("button.continue").html("提交");

    Node.one("button.continue").on("click", function(){
        var name = Node.one("#name").val();
        var pwd = Node.one("#pwd").val();
        var body = {user:{name:name, pwd:pwd}};
        var bodyStr = Json.stringify(body);
        Io({url:CurSite.getAbsolutePath("main/login.htm"), data:{cmd:"A02", body:bodyStr}, success:function(data){
            var body = Json.parse(data.body);
            if(body.repCode == "0000")
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
