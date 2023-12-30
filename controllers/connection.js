const mysql = require('mysql');
module.exports=function()
{
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb"
  });
  return con;
}