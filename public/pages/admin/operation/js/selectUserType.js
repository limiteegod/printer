KISSY.use("io,node,json", function(S, Io, Node, Json){

    var backValueNode = Node.one("#backValue");

    var getData = function()
    {
        var type = parseInt(Node.one("#type").val());
        var data = {type:type};
        return JSON.stringify(data);
    };

    var bodyNode = Node.one("body");
    bodyNode.on("focusout", function(e) {
        backValueNode.val(getData());
    });

    backValueNode.val(getData());  //init default value of backValue element
});
