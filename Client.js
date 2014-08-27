var digestUtil = require('./app/util/DigestUtil.js');

var net = require('net');

var HOST = '192.168.11.147';
var PORT = 16777;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // 建立连接后立即向服务器发送数据，服务器将收到这些数据

    var cmd = "0001";
    var sequenceId = digestUtil.createUUID();
    var terminalId = "12345678";
    var content = cmd + sequenceId + terminalId;
    var contentBuf = new Buffer(content, "utf8");

    //send length
    var packageLength = contentBuf.length;
    var packageLengthBuf = new Buffer(4);
    packageLengthBuf.writeInt32BE(packageLength, 0);
    client.write(packageLengthBuf);

    //send data
    client.write(contentBuf);

    //send again
    client.write(packageLengthBuf);
    client.write(contentBuf);
});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {
    console.log('DATA: ' + data);
});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
    // 完全关闭连接
    client.destroy();
});