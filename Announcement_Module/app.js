//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require('mongoose');
const homeStartingContent = "ANNOUNCEMENTS AND NOTIFICATIONS ,IF YOU HAVE ANY DOUBT CONTACT HDO MR.ROBERT......";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
  
  // mongodb conection
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true});
// schema
   const Schema = new mongoose.Schema(
   {
     titledata:String,
     postdata:String
       });

   //model
    const Blog=mongoose.model("Blog",Schema);
  


const blog=new Blog(
  {
    titledata:"1",
    postdata:homeStartingContent,
  }
);
const log=[blog];

app.get("/",function(req,res){

  Blog.find({},function(err,found)
  {   
      // console.log("i found"+found);
    if(found.length===0)
    {
          Blog.insertMany(log,function(err,found){
     if(err)
     { console.log("error is"+err);}
    });
  
  }  
    if(err)
    { 
   console.log("there is an error.."+err);
    }

 
  
     
  res.render("home",{para1:homeStartingContent,data:found});
});
  
});














app.listen(3000, function() {
  console.log("Server started on port 3000");
});


app.get("/about",function(req,res){

  res.render("about",{about1:aboutContent});

});
app.get("/contact",function(req,res){

  res.render("contact",{contact1:contactContent});

});

app.get("/compose",function(req,res){

  res.render("compose");

});

app.post("/compose",function(req,res){
  
  // const textdata={
  //  titledata:req.body.posttitle,
  //    postdata:req.body.postbody
    
  //  };   
   title=req.body.posttitle,
     post=req.body.postbody
    //   log.push(textdata);
    // console.log(log.titledata);


      const blogNew =Blog({
        titledata:title,
        postdata:post
      });
        
        Blog.insertMany(blogNew,function(err,found)
        {
            if(err){console.log("insert error"+err);}
        });
              res.redirect("/");
       });

   app.get("/post/:topic",function(req,res)
   {  
    var x=req.params.topic;

        console.log("param found"+x);

    
        x=_.lowerCase(x);
       console.log(x);

       
      //  for(var i=0;i<log.length;i++)
      //         {
      //            console.log(log[i].titledata);
      //             var y=_.lowerCase(log[i].titledata);
      //             console.log(y);
                    
      //    if(x===y)
      //    {
      //         res.render("post",{page:log[i]});    
      //    }
      //    else{
      //      console.log("match not found...");
      //    }

      //   }
    
      Blog.find({},function(err,found)
      {   console.log("what blog find last0"+found +   "and "  +found.postdata);
             


      for(var i=0;i<found.length;i++)
              {
                 console.log(found[i].titledata);
                  var y=_.lowerCase(found[i].titledata);
                  console.log(y);
                    
         if(x===y)
         {
              res.render("post",{page:found[i]});    
         }
         else{
           console.log("match not found...");
         }

        }

      });
});

    app.post("/delete",function(req,res)
    { console.log("oooo");

      console.log(req.body);

      Blog.findByIdAndRemove(req.body.button,function()
        { 
          console.log("deleted");
          res.redirect("/");

        }
    );



   
    });





