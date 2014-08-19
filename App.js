var express = require('express'), app = express();
var cmdFactory = require("./app/control/CmdFactory.js");

app.use(express.logger());

//是Connect內建的middleware，设置此处可以将client提交过来的post请求放入request.body中
app.use(express.bodyParser());
//是Connect內建的，可以协助处理POST请求伪装PUT、DELETE和其他HTTP methods
app.use(express.methodOverride());

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.post("/main/interface.htm", function(req, res){
    var message = req.body.message;
    console.log(message);
    var msgNode = JSON.parse(message);
    var headNode = msgNode.head;
    var bodyStr = msgNode.body;
    console.log(bodyStr);
    var msgNode = cmdFactory.handle(headNode, bodyStr);
    res.json(msgNode);
});

app.listen(8081);