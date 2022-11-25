const { json } = require('express');
const express = require('express');
const connectionString = require('../connection');
const router = express.Router();



router.get("/",(req,res)=>{
    // console.log(req);
    // res.send("Get api working");
    connectionString.query("select CustomerID,FirstName,LastName,Email from hotel_management.Customer;", (err,result)=>{
        if (err){
            res.send("Error");
            console.log("error in GET");
        }
        else{
            res.send(result);
        }
    });
});

router.post("/", async (req,res)=>{
    const data = req.body;
    connectionString.query("INSERT INTO hotel_management.Customer SET ?",data, (err,result)=>{
        if (err){
            res.send("Error");
            console.log("error in POST");
        }
        else{
            res.send(result);
        }
    });
    

});

module.exports = router