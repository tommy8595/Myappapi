const express = require("express");
const app = express();
const mysql=require('mysql');
var bodyParser = require('body-parser')
let port=process.env.PORT || 3000;

//connect to database
const connection=mysql.createConnection({
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b61f61551323c3',
    password: '7c837d4f',
    database:'heroku_033692b967cfb7c'
 });


app.get("/",(req,res)=>{
    res.send("Hello world");
});

//select all data
app.get('/selectall',function(req,res){

    connection.query("select * from person",(err,rows,fields)=>{    
       console.log("selectall");
       res.json(rows);
    });
    res.end
 
 })
 
 //select by id
 app.get('/person/:id',async(req,res)=>{
 
    connection.query("select * from person where id=?",[req.params.id],(err,rows,fields)=>{ 
       if(!err){
          console.log('success select by id');
          res.json(rows);
       }else{
          console.log(err);
       }     
    });
    res.end
 });
 
 
 
app.listen(port,() =>{
    console.log(`http:localhost: ${port}`);
    //test connection
    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }   
        console.log('Connected to the MySQL Server.');
      });
});         
