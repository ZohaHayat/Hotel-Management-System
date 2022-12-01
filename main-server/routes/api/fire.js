const express = require("express");
const auth = require("../../utilities/auth");
const { deleteStaff } = require("../../utilities/database");
const router = express.Router();


router.get("/", (req, res) => {
    res.json({ message: "Fire Staff" });
  });
  
// router.post(
// "/",
// auth.authenticate("local", { session: false }),
// (req, res) => {
//     const {email} = req.body;
//     deleteStaff(email)
//     .then(() => {
//         res.status(200);
//     })
//     .catch((error) => res.status(500).send({ message: error.message }));
// }
// );
router.post("/", (req, res, next) => {
    // defragmenting the req.body structure
    const { email } = req.body;

    // adding the user to the users table by simply calling the
    // function that we programmed in the database.js file (makes the
    // code very clean)
    deleteStaff(email)
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
