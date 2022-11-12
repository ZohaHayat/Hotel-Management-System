var mysql = require("mysql2");

config = {
  host: "localhost",
  user: "root",
  password: "adminaima123",
  database: "db_project_hotel_management",
};
var connection = mysql.createConnection(config); //added the line

module.exports = {
  connection: connection,
};