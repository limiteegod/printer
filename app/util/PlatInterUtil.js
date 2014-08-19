var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');
var prop = require('../config/Prop.js');
var options = prop.platform.site;
var PlatInterUtil = function(){};

PlatInterUtil.prototype.get= function(userId, userType, userKey, cmd, body, cb)
{
    var bodyStr = JSON.stringify(body);
    console.log("send-body:");
    console.log(bodyStr);
    var head = {userId:userId, userType:userType, digest:"", digestType:"3des", cmd:cmd, ver:prop.platform.ver};
    if(cmd == "AD01")
    {
        head.digestType = "";
    }
    var encodedBody = bodyStr;
    if(head.digestType.length > 0)
    {
        var cipher = crypto.createCipheriv('des-ede3-cfb', new Buffer(userKey, "base64"), new Buffer(8));
        var crypted = cipher.update(bodyStr, 'utf8', 'base64');
        crypted += cipher.final('base64');
        encodedBody = crypted;
    }
    var msgJson = {head:head, body:encodedBody};
    var msgToSend = JSON.stringify(msgJson);
    console.log("send-msg:");
    console.log(msgToSend);
    var post_data  = querystring.stringify({
        message:msgToSend
    });
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    options.headers = headers;
    var req = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('back-msg: ');
            console.log(chunk);
            cb(JSON.parse(chunk));
        });
    });
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(post_data, "utf8");
    req.end();
};

var platInterUtil = new PlatInterUtil();

module.exports = platInterUtil



