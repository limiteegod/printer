var TerminalControl = function(socket){
    var self = this;
    self.socket = socket;
};

/**
 * handle msg from terminal
 * @param cmd
 * @param sequenceId
 * @param cmdDataBuf
 * @param socket
 */
TerminalControl.prototype.handle = function(cmd, sequenceId, cmdDataBuf)
{
    var self = this;
    var headNode = {cmd:cmd, sequenceId:sequenceId};
    var bodyNode = self.getBodyNode(cmd, cmdDataBuf);
    console.log(headNode);
    console.log(bodyNode);
    if(cmd == "0001")
    {
        self.handle0001(headNode, bodyNode);
    }
};

/**
 * send response msg to terminal
 */
TerminalControl.prototype.sendRepMsg = function(backHeadNode) {
    var self = this;
    var content = backHeadNode.cmd + backHeadNode.sequenceId + backHeadNode.retCode + backHeadNode.retDesc;
    var contentBuf = new Buffer(content);

    var buf = new Buffer(contentBuf.length + 4);
    buf.writeInt32BE(contentBuf.length, 0);
    contentBuf.copy(buf, 4, 0, contentBuf.length);

    self.sendBuf(buf);
};

/**
 * send msg to terminal
 */
TerminalControl.prototype.send = function(headNode, bodyNode) {
    var self = this;

};

/**
 * send buffer to terminal
 */
TerminalControl.prototype.sendBuf = function(buf) {
    var self = this;
    self.socket.write(buf);
};

/**
 * get bodyNode from buffer data and cmd code
 * @param cmd
 * @param buf
 */
TerminalControl.prototype.getBodyNode = function(cmd, buf)
{
    var self = this;
    var bodyNode = {};
    if(cmd == "0001")
    {
        bodyNode.terminalid = buf.toString("gb2312", 0, 8);
        console.log("terminalid:" + bodyNode.terminalid);
    }
    return bodyNode;
};

/**
 *
 * @param bodyNode
 */
TerminalControl.prototype.handle0001 = function(headNode, bodyNode)
{
    var self = this;
    var backHeadNode = {cmd:headNode.cmd, sequenceId:headNode.sequenceId,
        retCode:"0000", retDesc:"received."};
    self.sendRepMsg(backHeadNode);
};

module.exports = TerminalControl;