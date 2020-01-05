const express =require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const moduleop=require(__dirname+"/date.js");

// console.log(moduleop);
// var y=moduleop.add();
// console.log(y);
// console.log(moduleop.sub());

let app=express();
app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({extended:true}));
  app.use("/public",express.static("public"));

  
    //mongodb connection

   mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});
   const todoSchema=new mongoose.Schema({
    name:{ type: String, required:[ true,"add item in todo list"]},
     });

     //collection based on above schema
     const Item = mongoose.model("Item",todoSchema);


       const item1 = new Item(
          {   name:"cs practical work",
             }
        );

        const item2 = new Item(
          {   name:"maths practical work",
             }
        );
        const item3=new Item(
          {   name:"electronics practical work",
             }
        );
        const defaultItems=[item1,item2,item3];
   
        //schema 2
     
    
       //mongo  staff collection
         const Staffitem = mongoose.model("Staffitem",todoSchema);

           //documents in staff collections


        const sitem1=new Staffitem(
  {
    name:"Reactjs guest lecture on 22",
  }
);
   

const defaultWorkItems=[sitem1];   
        


  






       

    

app.listen("3000",function(){
    console.log("server is started on port 3000....");
});

  


var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };   
var today  = new Date();
   var x=(today.toLocaleDateString("hi-IN", options));  






   var y="Student to do list";






app.get("/",function(req,res)

{  
    Item.find({},function(err,found)
  {

       if(found.length===0)
       {
             Item.insertMany(defaultItems,function(err,found){
        if(err)
        { console.log("error");}
       });

        }

  if(err)
     { 
    console.log("there is an error.."+err);
     }
   


 

 res.render("list",{newitem:found,aajkadin:x,heading:y});
});
});


app.post("/",function(req,res){
  
   console.log(req.body);



   if(req.body.btnreq==="Student to do list")
 {
     let itemNew=req.body.newiteminput;
     
        const itemNewAdd=new Item(
          {
                name:itemNew,
               }

            );
            Item.insertMany(itemNewAdd,function(err)
              {
                  console.log("added");
              });
      

    res.redirect("/");}

else{
      let item=req.body.newiteminput;
      console.log(req.body.newiteminput);
       const newStaffItem = new Staffitem(
       {
         name:item,
       });
       Staffitem.insertMany(newStaffItem,function(err)
              {    if(err)
                {console.log(err);}
                else
                  {console.log("added staff wala");}
              });
   res.redirect("/work");
       
    }
  });
  //delete an item....

  app.post("/delete",function(req,res)
  {   
      
    console.log("only check value"+req.body.check);
    console.log("hidden body"+req.body.hiddenValue);

    if(req.body.hiddenValue===y)
  {
       Item.findByIdAndRemove(req.body.check,function(err)
       {
  
       
         console.log("deleted ");
         res.redirect("/");
       });
      }

      else{
        Staffitem.findByIdAndRemove(req.body.check,function(err)
       {
  
       
         console.log("deleted ");
         res.redirect("/work");
       });

      }

  });
    
app.get("/about",function(req,res){
    res.render("about");
});


app.get("/work",function(req,res){

  Staffitem.find({},function(err,found)
  {

       if(found.length===0)
       {  
        Staffitem.insertMany(defaultWorkItems,function(err)
        {    if(err)
          {console.log(err);}
          else
            {console.log("added");}
        });
       }

         

var y="Staff to do list";
   
res.render("list",{newitem:found,heading:y,aajkadin:x});  
});

    
});












// app.get("/:work", function (req, res) {
  

//     console.log(req.params);

//       if(req.params.work==="work")


//       res.render("list");
  
  
  
  
  
// });