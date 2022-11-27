const express = require("express");
const auth = require("./routes/jwtAuth");
const app = express();
const cors = require("cors");
const PORT = 5000;
//middleware
app.use(cors());
app.use(express.json()); // req.body

//routes
app.use("/auth", auth);

// this is where you are directed to after logging in
// app.use("/dashboard", require("./routes/dashboard"));

app.listen(PORT, () => {
  console.log(`Server is starting on port 5000`);
});
