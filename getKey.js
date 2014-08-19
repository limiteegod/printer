var bf = new Buffer(24);
console.log(bf.length);
for(var i = 0; i < bf.length;)
{
    bf.writeInt32BE(0x00000000, i);
    i += 4;
}
var str = bf.toString("base64");
console.log(str);