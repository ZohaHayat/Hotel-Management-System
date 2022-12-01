const express = require("express");
const {addUserToDatabase} = require("../../utilities/database");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Hire Staff" });
  });

router.post("/", (req, res, next) => {
// defragmenting the req.body structure
const { email, password, name } = req.body;
console.log(req.body)

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

