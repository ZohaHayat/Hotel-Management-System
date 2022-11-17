const { response, request } = require("express");
const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const config = require('../../config/config');
const connection = config.connection;


//variables
var C_id=1

//implement use cases

router.get('/SignUp',(request,response)=>{

    sql_statement='SELECT FirstName FROM Customer'
    connection.query(sql_statement,(err,rows)=>{
        
        if (err){
            console.log("Error!",err)
        }
        else{
            response.send(rows)
        }
    })
})


router.post('/SignUp',async(request,response)=>{
    var body =request.body
    var id=C_id.toString()
    var email=body.Email
    var fname = body.FirstName
    var lname= body.LastName
    var password = body.Password
    var paydue='0'
    
    // console.log(body)
    sql_statement = 'INSERT INTO Customer (CustomerID, Email, FirstName, LastName, Password, Payments_Due) VALUES (?,?,?,?,?,?)'
    connection.query(sql_statement,[id,email,fname,lname,password, paydue],(err,rows)=>{
        if (err){
            console.log("ERROR",err)
            response.sendStatus(400)
        }else{
            response.sendStatus(200)
            C_id++;    

        }
    })
})



module.exports = router;
