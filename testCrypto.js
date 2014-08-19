var crypto = require('crypto');
var digestUtil = require('./app/util/DigestUtil.js');


/*
var ciphers = crypto.getCiphers();
console.log(ciphers);

var hashes = crypto.getHashes();
console.log(hashes);

var bf = new Buffer("abc李明");
var baseStr = bf.toString("base64");
console.log(baseStr);
var strBack = new Buffer(baseStr, "base64").toString("utf-8");
console.log(strBack);
*/

/*var key = "c9k/MfwCp3223C6AOeRmY0YuwxyD81f8";
var headNode = {cmd:"A01", digestType:"3des", digest:key};
var bodyNode = {code:"0000", description:"系统处理成功"};
var bodyStr = JSON.stringify(bodyNode);
console.log(bodyStr);
var msgNode = digestUtil.generate(headNode, bodyStr);
console.log(msgNode);*/

var text = '{code:"0000", description:"系统处理成功"}';
var key = "c9k/MfwCp3223C6AOeRmY0YuwxyD81f8";
console.log("str:" + text);

var ivbf = new Buffer(8);
for(var i = 0; i < ivbf.length;)
{
    ivbf.writeInt32BE(0x00000000, i);
    i += 4;
}
var keyBf = new Buffer(key, "base64");
var cipher = crypto.createCipheriv('des-ede3-cfb', keyBf, ivbf);
var crypted = cipher.update(text, 'utf8', 'base64');
crypted += cipher.final('base64');
console.log(crypted);

var backivbf = new Buffer(8);
for(var i = 0; i < backivbf.length;)
{
    backivbf.writeInt32BE(0x00000000, i);
    i += 4;
}

var decipher = crypto.createDecipheriv('des-ede3-cfb', keyBf, backivbf)
var dec = decipher.update(crypted, 'base64', 'utf8');
dec += decipher.final('utf8');
console.log(dec);


/*var crypto = require('crypto');
var cipher = crypto.createCipher('aes-256-cbc','InmbuvP6Z8')
var text = "123|123123123123123";
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex')
console.log(crypted)
var decipher = crypto.createDecipher('aes-256-cbc','InmbuvP6Z8')
var dec = decipher.update(crypted,'hex','utf8')
dec += decipher.final('utf8')
console.log(dec)*/


