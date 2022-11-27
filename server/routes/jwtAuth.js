const express = require("express");
const bcrypt = require("bcrypt"); // passwords hashing
const router = express.Router();
const pool = require("../db"); //
const jwtGenerator = require("../utilities/jwtGenerator");

const saltRounds = 10;

// registering a new user -- sign up
router.post("/signup", async (req, res) => {
  try {
    // defragmenting req.body
    const { name, email, password } = req.body;
    // check if the user already exists using a sql query
    const [rows, _fields] = await pool.query(
      "SELECT * FROM users WHERE user_email=?",
      [email]
    );
    // this means that the user already exists
    if (rows.length !== 0) {
      // 401 is displayed whenever a user tries to create 2 accounts
      // using the same email (which means that the authentication has failed)
      return res.status(401).send("User Already Exists");
    }
    // for hashing passwords
    const salt = await bcrypt.genSalt(saltRounds);
    // this is the hashed password
    const hashed_pwd = await bcrypt.hash(password, salt);

    // inserting a new user into the datavbase
    const query = `INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)`; // prepare statement
    let values = [name, email, hashed_pwd];

    // executing the query
    let userID;
    const user = await pool
      .query(query, values)
      .then((result) => {
        userID = result[0].insertId;
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
      });

    // generating the token against the userid
    const token = jwtGenerator(userID);
    // responding with the json token
    res.json({ token });
  } catch (error) {
    // in the event of an error, print the error message to the screen
    console.log(error.message);
    // respond with the status code 500 which means the problem is at the server side
    res.status(500).send("Internal Server Error");
  }
});

// signin router
router.post("/login", async (req, res) => {
  try {
    // defragmenting the req.body object
    const { email, password } = req.body;
    let userPasswd, userId; // for jwt purposes -- ignore for now
    // executing the select query -- fetch users with the given email (this should
    // return one row only since there can never be two users with the same email id)
    const [rows, _fields] = await pool.query(
      `SELECT * FROM users WHERE user_email=?`,
      [email],
      (err, results) => {
        // if there is an error in executing the query
        if (err) {
          // throw the error
          throw err;
        }
        userPasswd = results[0].user_password;
        userId = results[0].user_id;
      }
    );
    // 
    if (rows.length === 0) {
      return res
        .status(401)
        .send("Password or Email already exists or is Incorrect");
    }

    const validPassword = await bcrypt.compare(password, userPasswd);
    if (!validPassword) {
      return res.status(401).send("Password or Email is incorrect");
    }
    // generating a tokenn against the given user id
    const token = jwtGenerator(userId);
    // 
    res.json(token);
  } catch (error) {
    console.log(error.message);
    // 
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
