var headNode = {cmd:"A01"};

var cHeadNode = headNode;
console.log(cHeadNode);
console.log(headNode);

cHeadNode.name = "123";

console.log(cHeadNode);
console.log(headNode);

var setP = function(node)
{
    node.p = "aaaa";
};

setP(headNode);
console.log(cHeadNode);
console.log(headNode);
