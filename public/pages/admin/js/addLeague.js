KISSY.use("io,node,json", function(S, Io, Node, Json){

    Node.one("#submit").on("click", function(){
        var name = Node.one("#name").val();
        var description = Node.one("#description").val();
        var body = {league:{name:name, description:description}};
        Io({url:CurSite.getAbsolutePath("main/interface.htm"), data:{cmd:"L01", body:Json.stringify(body)}, success:function(data){
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
