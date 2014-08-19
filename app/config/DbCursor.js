var dbPool = require('./DbPool.js');

var DbCurser = function(baseSql){
    var self = this;
    self.baseSql = baseSql;
};


DbCurser.prototype.sort = function(data)
{
    var self = this;
    var count = 0;
    var sql = " order by ";
    for(var key in data)
    {
        if(count > 0)
        {
            sql += ",";
        }
        if(data[key] > 0)
        {
            sql += key;
        }
        else
        {
            sql += key + " desc";
        }
        count++;
    }
    if(count > 0)
    {
        self.baseSql += sql;
    }
};

DbCurser.prototype.toArray = function(cb)
{
    var self = this;
    console.log(self.baseSql);
    dbPool.conn.query(self.baseSql, function(err, rows, fields) {
        if (err) throw err;
        if(cb != undefined)
        {
            cb(err, rows);
        }
    });
};

module.exports = DbCurser;