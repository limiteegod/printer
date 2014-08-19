var ErrCode = function()
{
    var self = this;
    self.E0000 = {code:"0000", description:"系统处理成功"};
    self.E0001 = {code:"0001", description:"参数错误"};
};
module.exports = new ErrCode();