const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // as soon as a user navigates to http://localhost:5000,
  // this function sends a req.user object (with the user_id)
  // which will then be used in the login.js route
  res.json(req.user);
});

module.exports = router;
