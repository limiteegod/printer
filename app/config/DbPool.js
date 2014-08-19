var mysql = require('mysql');
var prop = require('./Prop.js');

var conn = mysql.createConnection(prop.mysql);
conn.connect();

exports.conn = conn;
