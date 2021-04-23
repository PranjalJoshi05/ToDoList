const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

let items = ["Buy Food","Cook Food","Eat Food"];

app.get("/",function(req,res){
  let today = new Date();
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  let date = today.toLocaleDateString("en-US", options);
  res.render("list",{kindOfDay:date, items: items});
})

app.post("/delete",function(req,res){
  let i = parseInt(req.body.index);
  items = items.slice(0, i).concat(items.slice(i + 1, items.length));
  res.redirect("/");
})

app.post("/",function(req,res){
  let newItem = req.body.newItem;
  if(newItem.length>0){
      items.push(newItem);
  }
  res.redirect("/");
})

app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
