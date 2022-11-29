const express = require("express");
// importing the function that adds user to the database
const { addUserToDatabase } = require("../../utilities/database");
const router = express.Router();

/**
 * As soon as the user naviagtes to localhost:5000/api/signup
 * the backend server responds with this json message asking
 * the user to submit information if they want to sign up. This
 * message could be any string of your choice.
 */
router.get("/", (req, res) => {
  res.json({ message: "Sign up" });
});

/**
 * This is a post router. It first fetches the email, password
 * and name from the req.body object.
 * What is req.body?
 * The information submitted by a user via any html form gets packed
 * in a req.body object (just like a packet containing bits of information
 * gets routed over a network -- that packet has info). We need to defragment
 * this req.body using the const {} = req.body syntax and extract the information
 * that we need. Using axios, this is sent from the frontend to the backend and we
 * defragment it here.
 *
 */
router.post("/", (req, res, next) => {
  // defragmenting the req.body structure
  const { email, password, name } = req.body;

  // adding the user to the users table by simply calling the
  // function that we programmed in the database.js file (makes the
  // code very clean)
  addUserToDatabase(email, password, name)
    .then(() => {
      // if the query was successfully executed, it implies that the user has been
      // seeded. Respond with the status code 200 (OK)
      res.sendStatus(200);
    })
    .catch((err) => {
      // if there was an error (query was not executed successfully -- server's fault)
      // respond with status(500)
      res.status(500).json({ message: err.message });
      // next is used to respond to the next incoming request. if the user was not signed up
      // sccessfully we dont want the app to crash. for it to remain working we use next(err)
      next(err);
    });
});

module.exports = router;
