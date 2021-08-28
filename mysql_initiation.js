var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql51123765_chemeng",
    database: "mydb"
  });
  
  module.exports = (con);