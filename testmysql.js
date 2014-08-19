var mysql = require('mysql');
var prop = require('./app/config/prop.js');

var conn = mysql.createConnection(prop.mysql);
conn.connect();
conn.query('select id,name from user', function(err, rows, fields) {
    if (err) throw err;
    for(var i = 0; i < fields.length; i++){
        console.log(fields[i]);
    }
    for(var i = 0; i < rows.length; i++){
        console.log(rows[i]);
    }

    conn.end();
});

