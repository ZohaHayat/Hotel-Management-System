const mysql = require("mysql2");

// creating a connection here
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "*Litstw13",
  database: "authorization",
});

module.exports = pool;
