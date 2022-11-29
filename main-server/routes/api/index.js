const express = require("express");
const router = express.Router();
const auth = require("../../utilities/auth");

// mounting the routes to our /api route
// .../api/signup etc.
router.use("/signup", require("./signup"));
router.use("/login", require("./login"));

// authentication router (ignore for now -- this is entirely for authentication)
router.use(auth.authenticate("jwt", { session: false }));
router.use("/authenticate", require("./authenticate"));

module.exports = router;
