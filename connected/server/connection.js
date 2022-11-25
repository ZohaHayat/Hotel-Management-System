const mysql = require('mysql2');

var connectionString = mysql.createConnection(
    {
        host:"localhost",
        user: "root",
        password:"b30m6yu*",
        database:"hotel_management"
    }
);

connectionString.connect((err)=>{
    if (err){
        console.log("Connection failed");
    }
    else{
        console.log("Successful connection");
    }

});

module.exports = connectionString;
