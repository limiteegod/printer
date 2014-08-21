var cmdFactory = require("./app/control/CmdFactory.js");
var digestUtil = require("./app/util/DigestUtil.js");

var emptyKey = digestUtil.getEmptyKey();
console.log(emptyKey);

var iv = digestUtil.getIv();
console.log(iv.toString("base64"));

var headNode = {cmd:"A01", digestType:"3des", digest:emptyKey};
var bodyNode = {code:"0000", description:"系统处理成功"};
var bodyStr = JSON.stringify(bodyNode);
var msgNode = digestUtil.generate(headNode, bodyStr);

console.log(msgNode);

cmdFactory.handle(msgNode.head, msgNode.body, function(err, msgNode){
    console.log(msgNode);
});

/*var msgNode = digestUtil.generate(headNode, bodyStr);
console.log(msgNode);

var decodedBodyStr = digestUtil.check(headNode, msgNode.body);
console.log(decodedBodyStr);*/