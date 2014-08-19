var conn;

var User = function(conn){

};

User.prototype.clear = function()
{
    if(conn)
    {
        var sql = "create table user(id int(4) not null primary key auto_increment,name char(20) not null);";
        conn.query(sql, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows.affectedRows);
        });
    }
};

module.exports = User;