const jwt = require("jsonwebtoken");

/**
 * This function takes the userId and generates a token using the secret key
 * "hello123". This shall be in our .env file later.
 */
const getToken = (userId) =>
  jwt.sign({ userId }, "hello123", {
    expiresIn: "1h", // every user has a certain expiry session after which they are logged out.
  });

module.exports = { getToken };
