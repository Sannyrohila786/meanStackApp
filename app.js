const  mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser')
var app =  express();


app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'edudesk',
});


mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Data base Connected sucessfully');
    }else {
        console.log('Databse not connect ' + JSON.stringify(err));
    }

});

app.listen(3000,()=> console.log("express servcer is running on port 3000" ))

app.get('/library',(req,res)=>{
    mysqlConnection.query('SELECT  * FROM jhi_user',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            console.log(rows);

        }else {
            console.log(err);

        }
    })

});


app.get('/library/:id',(req,res)=>{
    console.log(req.params.id);
    mysqlConnection.query('SELECT  * FROM jhi_user where id = ?' ,[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            console.log(rows);

        }else {
            console.log(err);

        }
    })

});



app.delete('/library/:id',(req,res)=>{
    console.log(req.params.id);
    mysqlConnection.query('Delete from  jhi_user where id = ?' ,[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("deleted sucessfully");
        }else {
            console.log(err.json);

        }
    })

})

/// Updaate data

app.post('/library' ,(req,res)=> {
    const data = req.body
    var lastName = data.lastName
    var firstName = data.firstName
    var age = data.age
    var sql = "INSERT INTO employee (lastName, firstName,age) VALUES ?";
    var values = [
        [lastName,firstName,age],
    ];
    console.log(values);
    mysqlConnection.query(sql,[values],function (err,result) {
        console.log(result, +" hellllllllllllo");
    })
});


