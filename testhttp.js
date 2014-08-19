var platInterUtil = require('./app/util/PlatInterUtil.js');

var body = {name:"admini", password:"0okmnhy6"};
platInterUtil.get("", 0, "", "AD01", body, function(msg){
    var body = JSON.parse(msg.body);
    var st = body.st;
    var name = body.user.name;

    var ad03Body = {gameCode:"T01", termCode:"2015200"};
    platInterUtil.get(name, 3, st, "AD03", ad03Body, function(msg){

    });
    console.log(st);
});
