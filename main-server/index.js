const express = require("express");
const app = express();
const auth = require("./utilities/auth");
const logger = require("morgan");
require("dotenv").config();

const apiRouter = require("./routes/api/index");

app.use(logger("dev"));
app.use(express.json()); // for req.body parsing
app.use(auth.initialize()); // this starts the authentication

app.use("/api", apiRouter);

app.listen(5000, () => {
  console.log(`SERVER IS LISTENING AT ${5000}`);
});

module.exports = app;
