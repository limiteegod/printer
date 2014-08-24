var PageControl = function(){};

PageControl.prototype.handle = function(headNode, bodyNode, cb)
{
    console.log(bodyNode);
    var self = this;
    var cmd = headNode.cmd;
    if(cmd == "admin/login")
    {
        var backBodyNode = {title:"login", tip:"Welcome to login at my website."};
        cb(null, backBodyNode);
    }
    else
    {
        cb(null, {});
    }
};

var pageControl = new PageControl();
module.exports = pageControl;