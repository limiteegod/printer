var net = require('net');
var TerminalControl = require('./app/control/TerminalControl.js');

var HOST = '192.168.11.147';
var PORT = 16777;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
net.createServer(function(sock) {

    var tc = new TerminalControl(sock);

    var buf = new Buffer(10*1024);

    //current length of buf
    var curBufLen = 0;

    //data length of the data that will be received from terminal.
    var tBufLen = 0;

    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort);

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
        //append data to buffer
        data.copy(buf, curBufLen, 0, data.length);
        curBufLen += data.length;

        console.log("data append length:" + data.length);
        if(tBufLen == 0 && curBufLen >= 4)    //command start point.
        {
            tBufLen = buf.readInt32BE(0);
            console.log("cmd data length:" + tBufLen);
        }
        console.log("curBufLen:" + curBufLen + ",tBufLen:" + tBufLen);

        //cmd data all received
        while(curBufLen >= tBufLen + 4 && tBufLen > 0)
        {
            var cmd = buf.toString("utf8", 4, 8);
            var sequenceId = buf.toString("utf8", 8, 40);
            var cmdDataBuf = new Buffer(tBufLen - 36);
            buf.copy(cmdDataBuf, 0, 40, tBufLen + 4);
            if(curBufLen > tBufLen + 4)
            {
                curBufLen = curBufLen - tBufLen - 4;
                var exchangeBuf = new Buffer(curBufLen);
                buf.copy(exchangeBuf, 0, tBufLen + 4, tBufLen + curBufLen + 4);
                exchangeBuf.copy(buf, 0, 0, curBufLen);
            }
            else
            {
                curBufLen = 0;
            }
            tBufLen = 0;
            if(curBufLen >= 4)    //command start point.
            {
                tBufLen = buf.readInt32BE(0);
            }
            tc.handle(cmd, sequenceId, cmdDataBuf);
        }
        console.log("curBufLen:" + curBufLen + ",tBufLen:" + tBufLen);
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);