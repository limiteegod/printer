var db = require("../config/Database.js");
var errCode = require("../config/ErrCode.js");
var DbCursor = require('../config/DbCursor.js');

var userTable = db.get("user");

var UserControl = function(){};

UserControl.prototype.handle = function(headNode, bodyNode, cb)
{
    console.log(bodyNode);
    //用户登录
    if(headNode.cmd == "A01")
    {
        if(bodyNode.name == undefined || bodyNode.password == undefined)
        {
            cb(null, errCode.E0001);
            return;
        }
        var cursor = userTable.find(bodyNode, {name:1, password:1});
        cursor.sort({_id:-1});
        cursor.toArray(function(err, results){
            console.log(results);
            if(err)
            {
                cb(err);
            }
            else
            {
                cb(err, errCode.E0000);
            }
        });
    }
}

var userControl = new UserControl();
module.exports = userControl;