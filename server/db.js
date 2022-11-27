const mysql = require("mysql2");

const pool = mysql
  .createPool({
    user: "root",
    password: "bakhti123",
    host: "localhost",
    port: 5000,
    database: "authorization",
  })
  .promise();

module.exports = pool;
