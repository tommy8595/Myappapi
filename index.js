const express = require("express");
const mysql = require('mysql')
const bodyParser = require('body-parser');
const { request, response } = require("express");

const app= express()
const port=process.env.PORT || 3000;

//connect to database
const pool=mysql.createPool({
    connectionLimit : 10,
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b61f61551323c3',
    password: '7c837d4f',
    database:'heroku_033692b967cfb7c'
 });

 //get all data
 app.get('',(request,response) =>{  // arrow function

   pool.getConnection((error,connection)=>{
      if (error) throw error
      console.log(`connect as id ${connection.threadId}`);
      connection.query('select * from person',(err,row)=>{        
         connection.release(); //resturn the connection to pool
         if(!err){response.send(row)}
         else{console.log(err)}
      })
   });
 });

 //get data by id
 app.get('/:id',(request,response) =>{  // arrow function

   pool.getConnection((error,connection)=>{
      if (error) throw error
      console.log(`connect as id ${connection.threadId}`);
      connection.query('select * from person where id =?',[request.params.id],(err,row)=>{        
         connection.release(); //return the connection to pool
         if(!err){response.send(row)}
         else{console.log(err)}
      })
   });
 });



 app.listen(port,() =>{console.log(`http:localhost:${port}`);});  
