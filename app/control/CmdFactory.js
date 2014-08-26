var digestUtil = require("../util/DigestUtil.js");
var userControl = require("./UserControl.js");
var db = require('../config/Database.js');
var errCode = require('../config/ErrCode.js');
var uniqueIdService = require('../service/UniqueIdService.js');

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
                try {
                    var bodyNode = JSON.parse(decodedBodyStr);
                    uniqueIdService.exists(bodyNode.uniqueId, function(err, data){
                        if(err)
                        {
                            cb(null, errCode.E0004);
                        }
                        else
                        {
                            headNode.key = key;
                            var stInfoTable = db.get("stInfo");
                            stInfoTable.find({_id:headNode.userId}, {lastActiveTime:1, st:1}).toArray(function(err, stInfoData){
                                if(stInfoData.length == 0)
                                {
                                    var st = digestUtil.createUUID();
                                    stInfoTable.save({_id:headNode.userId, st:st, lastActiveTime:new Date().getTime()});
                                    cb(null, {uniqueId:bodyNode.uniqueId, st:st});
                                }
                                else
                                {
                                    cb(null, {uniqueId:bodyNode.uniqueId, st:stInfoData[0].st});
                                }
                            });
                        }
                    });
                }
                catch (err)
                {
                    cb(err, errCode.E0003);
                    return;
                }
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