const { json } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const connectionString = require('./connection')

app.use(json());
app.use(cors());

//Routers
const postRouter = require('./routes/Posts')
app.use("/Posts",postRouter)

app.listen(3001, ()=>{
    console.log("Server running on port 3001")
});