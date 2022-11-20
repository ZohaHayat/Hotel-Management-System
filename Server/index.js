var express = require('express');
var mysql =require('mysql2')
const router = express.Router();
var app = express();
app.use("/",router)
app.use(express.json())
// app.use(cors());
module.exports = router;


//Authentication Routes

const Customer_Register= require('.') //connects to the customer
app.use('/routes/customer/customer_auth',Customer_Register)



var port=3001
app.listen(port,()=>{
    console.log(`Server is running on ${port}`); //listens to the server
});

