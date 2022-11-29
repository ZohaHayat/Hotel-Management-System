const express = require("express");
// for user authentication
const auth = require("../../utilities/auth");
// generating token against a given user
const { getToken } = require("../../utilities/jwt");

const router = express.Router();

/**
 * auth.authenticate("local", { session: false })
 * The above line acts as a MIDDLEWARE and authenticates a user before
 * entering into the body of the function. If the user is not in the database
 * i.e not signed up, then a status code of 401 (Unauthorized) is returned by
 * the server.
 * In this function, the user_id is detached from the req.user object
 */
router.post("/", auth.authenticate("local", { session: false }), (req, res) => {
  // extracting user_id from the req.user object
  const { user_id: userId } = req.user;
  // getting the token against this user
  const token = getToken(userId);
  // responding with the token (if the server responds with a token in a json object
  // it means that login was successfull)
  res.json({ token });
});

module.exports = router;
