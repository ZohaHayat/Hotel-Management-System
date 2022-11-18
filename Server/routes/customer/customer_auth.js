const { response, request } = require("express");
const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const config = require('../../config/config');
const connection = config.connection;


//variables
var C_id=1

//implement use cases

router.get('/Login',(request,response)=>{
    // console.log(response)
    var body=request.body
    var email=body.Email
    var type=""
    var Pass=body.Password
    // console.log(Pass)

    var parsed_email=email.slice(-9)

    if (parsed_email=="hotel.com")
    {

        type="Staff"

    }

    else 
    {
        type="Customer"
    }
    
    sql_statement=`SELECT * FROM ${type} WHERE Password = "${Pass}" and Email="${email}"`
    connection.query(sql_statement,(err,rows)=>{
        
        if (err){
            console.log("Error!",err)
        }

        else if (rows==[])
        {
            response.sendStatus(404)

        }
        else
        {
            response.send(rows)
        }
    })
})


router.post('/SignUp',async(request,response)=>{
    var body =request.body
    // var id=C_id.toString()
    var email=body.Email
    var fname = body.FirstName
    var lname= body.LastName
    var password = body.Password
    // var type=body.Type
    
    // console.log(body)
    
        
    var paydue='0'
    sql_statement = 'INSERT INTO Customer (CustomerID, Email, FirstName, LastName, Password, Payments_Due) VALUES (?,?,?,?,?,?)'
    connection.query(sql_statement,[,email,fname,lname,password, paydue],(err,rows)=>{
        if (err)
        {
            console.log("ERROR",err)
            response.sendStatus(400)
        }
        else
        {
            response.sendStatus(200)
            // C_id++;    

        }
    })

    var Employee_Type=body.Employee_Type;
    var salary=body.Salary;
    var Shift_type=body.Shift_type;
    sql_statement = 'INSERT INTO Staff (StaffID, Email, FirstName, LastName, Password, Employee_Type, Salary, Shift_type) VALUES (?,?,?,?,?,?,?,?)'
    connection.query(sql_statement,[,email,fname,lname,password, Employee_Type, salary, Shift_type],(err,rows)=>{
        if (err)
        {
            console.log("ERROR",err)
            response.sendStatus(400)
        }
        else
        {
            response.sendStatus(200)
            C_id++;    

        }
    })

    
})

router.post('/UpdatePassword',async(request,response)=>{
    var body =request.body
    var email=body.Email
    var password = body.Password
    var newpass=body.newPassword
    var type=""
    var parsed_email=email.slice(-9)

    if (parsed_email=="hotel.com")
    {

        type="Staff"

    }

    else 
    {
        type="Customer"
    }
    
    // console.log(body)
    
    var paydue='0'
    sql_statement = `UPDATE ${type} SET Password='${newpass}' WHERE Email="${email}" AND Password='${password}'`
    connection.query(sql_statement,(err,rows)=>{
        if (err)
        {
            console.log("ERROR",err)
            response.sendStatus(400)
        }
        else
        {
            response.sendStatus(200)
            // C_id++;    

        }
    })


})

router.post('/UpdateAccountInformation',async(request,response)=>{
    var body =request.body
    var oldemail=body.oldEmail
    var newemail=body.newEmail
    var password = body.Password
    var f_name = body.newFirstName
    var l_name = body.newLastName
    var type=""
    var parsed_email=oldemail.slice(-9)
    if (parsed_email=="hotel.com")
    {

        type="Staff"

    }

    else 
    {
        type="Customer"
    }
    
    // console.log(body)
    
    var paydue='0'
    sql_statement = `UPDATE ${type} SET Email='${newemail}', FirstName = '${f_name}',LastName = '${l_name}' WHERE Email="${oldemail}" AND Password='${password}'`
    connection.query(sql_statement,(err,rows)=>{
        if (err)
        {
            console.log("ERROR",err)
            response.sendStatus(400)
        }
        else
        {
            response.sendStatus(200)
            // C_id++;    

        }
    })


})

router.post('/HireStaff',async(request,response)=>{
    var body =request.body
    // var id=C_id.toString()
    var email=body.Email
    var fname = body.FirstName
    var lname= body.LastName
    var password = body.Password
    var password = body.Password
    // var  = body.Shift_type


    // var type=body.Type
    
    // console.log(body)
    
        
    var paydue='0'
    sql_statement = 'INSERT INTO Customer (CustomerID, Email, FirstName, LastName, Password, Payments_Due) VALUES (?,?,?,?,?,?)'
    connection.query(sql_statement,[,email,fname,lname,password, paydue],(err,rows)=>{
        if (err)
        {
            console.log("ERROR",err)
            response.sendStatus(400)
        }
        else
        {
            response.sendStatus(200)
            // C_id++;    

        }
    })

    var Employee_Type=body.Employee_Type;
    var salary=body.Salary;
    var Shift_type=body.Shift_type;
    sql_statement = 'INSERT INTO Staff (StaffID, Email, FirstName, LastName, Password, Employee_Type, Salary, Shift_type) VALUES (?,?,?,?,?,?,?,?)'
    connection.query(sql_statement,[,email,fname,lname,password, Employee_Type, salary, Shift_type],(err,rows)=>{
        if (err)
        {
            console.log("ERROR",err)
            response.sendStatus(400)
        }
        else
        {
            response.sendStatus(200)
            C_id++;    

        }
    })

    
})


module.exports = router;
