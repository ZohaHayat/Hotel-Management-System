var express = require('express');
var mysql =require('mysql2')
const router = express.Router();
var app = express();
app.use("/",router)
app.use(express.json())
// app.use(cors());


//Authentication Routes

const Customer_Register= require('./routes/customer/customer_auth') 
app.use('/customerauth',Customer_Register)



var port=8597
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});

