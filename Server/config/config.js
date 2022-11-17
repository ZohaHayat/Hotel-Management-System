var mysql = require("mysql2");

config = {
  host: "localhost",
  user: "root",
  password: "adminaima123",
  database: "hotel_management",
};
var connection = mysql.createConnection(config); //connects to the database (mysql)

module.exports = {
  connection: connection,
};