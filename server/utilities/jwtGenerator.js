const jwt = require("jsonwebtoken");
require("dotenv").config();

// this function generates a token for a given user against the provided
// user_id
function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };

  // expiresIn is for session handling -- the time duration in the string
  // signifies the time after which the user will be signed out ie their
  // session will expire
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
