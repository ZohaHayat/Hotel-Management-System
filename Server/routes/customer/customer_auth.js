const { response, request } = require("express");
const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const config = require('../../config/config');
const connection = config.connection;


router.get('/',(request,response)=>{

    sql_statement='SELECT * FROM USERS'
    connection.query(sql_statement,(err,rows)=>{
        
        if (err){
            console.log("Error!",err)
        }else{
            response.send(rows)
        }
    })
})


router.post('/register',async(request,response)=>{
    var body =request.body
    var name = body.username
    var pass = body.password
    
    // console.log(body)
    sql_statement = 'INSERT INTO USERS (id,name,pass) VALUES (?,?,?)'
    connection.query(sql_statement,[null,name,pass],(err,rows)=>{
        if (err){
            console.log("ERROR",err)
            response.sendStatus(400)
        }else{
            response.sendStatus(200)
        }
    })
})



module.exports = router;
