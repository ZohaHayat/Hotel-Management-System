const mysql = require("mysql2");

// creating a connection here
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "adminaima123",
  database: "authorization",
});

module.exports = pool;
