var digestUtil = require("../util/DigestUtil.js");
var userControl = require("./UserControl.js");
var db = require('../config/Database.js');
var errCode = require('../config/ErrCode.js');

var CmdFactory = function(){};

CmdFactory.prototype.handle = function(headNode, bodyStr, cb)
{

    var cmdGroup = headNode.cmd.match(/^([A-Z]+)([0-9]{1,})$/);
    console.log(cmdGroup);
    if(cmdGroup[1] == "A" && cmdGroup[2] == "01")
    {
        var userTable = db.get("user");
        userTable.find({name:headNode.userId}, {name:1, password:1}).toArray(function(err, data){
            console.log(data);
            if(data.length == 0) //user not exists
            {
                cb(err, errCode.E0002);
            }
            else    //user exists, then check password
            {
                var password = data[0].password;
                var key = digestUtil.md5(password);
                var decodedBodyStr = digestUtil.check(headNode, key, bodyStr);
                var bodyNode = JSON.parse(decodedBodyStr);
                console.log("decodedBodyStr:" + decodedBodyStr);
                cb(err, {});
            }
        });
    }
    else
    {
        var decodedBodyStr = digestUtil.check(headNode, bodyStr);
        console.log("decoded body:" + decodedBodyStr);
        //用户登录
        if(cmdGroup[1] == "A")
        {
            userControl.handle(headNode, JSON.parse(decodedBodyStr), function(err, backBodyNode){
                var msgNode = digestUtil.generate(headNode, JSON.stringify(backBodyNode));
                cb(err, msgNode);
            });
        }
    }
};

var cmdFactory = new CmdFactory();
module.exports = cmdFactory;