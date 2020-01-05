//jshint esversion:6
require('dotenv').config();
const express =require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

var md5 = require('md5');
console.log(process.env.SECRET);

 
let app=express();
app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(express.static("public"));

  // mongodb connection and schema
  mongoose.connect('mongodb://localhost:27017/cmsDB', {useNewUrlParser: true});
   const cmsSchema=new mongoose.Schema({
    username:{ type: String, required:[ true,"add item in todo list"]},
    password:{type:String,required:[ true,"add item in todo list"]}
     });

     
    
     

        //   cmsSchema.plugin(encrypt,{secret: secret,encryptedFields:["password"]});
     //model

     const cms= mongoose.model("cms",cmsSchema);
     

    var hash =md5("welcome everyone");
    console.log(hash);
    
  



 //server started
app.listen("3000",function(){
    console.log("server is started on port 3000....");
});

   app.get("/",function(req,res)
   {   res.render("home");

   });


   app.get("/register",function(req,res)
   { 
       res.render("register");

   });

      app.post("/register",function(req,res)
      {  
            const newUser=new cms(
                {
                    username:req.body.username,
                     password:md5(req.body.password),
                     
                }
        ); 
            cms.insertMany(newUser,function(err,found)
            {  
                if(err)
                {
                    console.log(err);
                } 
                else
                {console.log(found);}

            });  
        
        res.redirect("/login");
    });
    
    app.get("/login",function(req,res)
    {
          res.render("login");
    });
       
      app.post("/login",function(req,res)
      {
           cms.findOne({username:req.body.username},function(err,found)
           {  if(err)
            {console.log("1st error is"+err);
              
                res.render("failAccess");
                
            }
            else
            {console.log("i found"+found)}
    
             if(found.password===md5(req.body.password))
             { 
                  res.render("secrets");
                  console.log(found.password);

             }
             else{
                res.render("failAccess");
             }

            


           });             


      });

