var crypto = require('crypto');

var DigestUtil = function(){
};

DigestUtil.prototype.getIv = function()
{
    var iv8 = new Buffer(8);
    for(var i = 0; i < iv8.length;)
    {
        iv8.writeInt32BE(0x00000000, i);
        i += 4;
    }
    return iv8;
}

//解密
DigestUtil.prototype.check = function(headNode, bodyStr)
{
    var self = this;
    if(headNode.digestType == "3des")
    {
        var key = headNode.digest;
        console.log(bodyStr);
        var decipher = crypto.createDecipheriv('des-ede3-cfb', new Buffer(key, "base64"), self.getIv());
        var dec = decipher.update(bodyStr, 'base64', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    return bodyStr;
};

//加密
DigestUtil.prototype.generate = function(headNode, bodyStr)
{
    console.log(bodyStr);
    var self = this;
    var backHeadNode = {cmd:headNode.cmd, digestType:headNode.digestType};
    var msgNode = {head:backHeadNode, body:bodyStr};
    if(headNode.digestType == "3des")
    {
        var key = headNode.digest;
        var cipher = crypto.createCipheriv('des-ede3-cfb', new Buffer(key, "base64"), self.getIv());
        var crypted = cipher.update(bodyStr, 'utf8', 'base64');
        crypted += cipher.final('base64');
        msgNode.body = crypted;
    }
    return msgNode;
};

DigestUtil.prototype.getEmptyKey = function()
{
    var iv24 = new Buffer(24);
    for(var i = 0; i < iv24.length;)
    {
        iv24.writeInt32BE(0x00000000, i);
        i += 4;
    }
    return iv24.toString("base64");
};


var digestUtil = new DigestUtil();
module.exports = digestUtil;