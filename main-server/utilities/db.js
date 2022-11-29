const mysql = require("mysql2");

// creating a connection here
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ladBob12!.",
  database: "authorization",
});

module.exports = pool;
