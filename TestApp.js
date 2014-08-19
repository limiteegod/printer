var cmdFactory = require("./app/control/CmdFactory.js");
var digestUtil = require("./app/util/DigestUtil.js");


var headNode = {cmd:"A01", digestType:"3des", digest:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"};
var bodyNode = {name:"liming", password:"1234567"};
var bodyStr = JSON.stringify(bodyNode);
var msgNode = digestUtil.generate(headNode, bodyStr);
console.log(msgNode);

var decodedBodyStr = digestUtil.check(headNode, msgNode.body);
console.log(decodedBodyStr);

/*
cmdFactory.handle(headNode, bodyStr, function(err, msgNode){
    console.log(msgNode);
});*/
