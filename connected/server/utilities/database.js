/*
This is our main file where we will be executing all our SQL queries to keep the code clean
*/

const mysql = require("mysql2");
const bcrypt = require("bcrypt");

// establishing the connection to the database with the credentials mentioned in the .env file
const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.NAME,
});

// writing a query that gets all users by their user_id (we must have a users table where there is an attribute known as user_id)
const getUserById = (id) => {
  // write a sql query that gets all users by their id (subject to change)
  const sql = `SELECT * FROM users WHERE id = ?`;
  // returning a promise for asynchronous failure handling (all queries will be executed using promises)
  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (res.length === 0) {
          resolve(null);
        }

        resolve(res[0]);
      }
    });
  });
};

const getUserByEmail = async (email) => {
  // sql query that gets all users from the users table where email=<given email as an argument>
  const sql = `SELECT * FROM users WHERE email = ?`;
  let values = [email];
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const authenticate = async (email, password) => {
  const response = await getUserByEmail(email);

  if (response.length === 0) {
    return null;
  }

  const user = response[0];

  const passwordMatched = await bcrypt.compare(password, user.hash);
  if (passwordMatched) {
    return user;
  }

  return null;
};

module.exports = {connection, getUserById, getUserByEmail, authenticate};
