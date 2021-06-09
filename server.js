const express = require("express");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());

const URL = process.env.URL

mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log("connected to database");
  // getToDo();
}).catch((err)=>{
  console.log(err);
});

const todoSchema = mongoose.Schema({
  userId:{
    type:Number,
    required:true
  },
  id:{
    type:Number,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  completed:{
    type:Boolean,
    required:true
  }
});

const TODO = mongoose.model("todos",todoSchema);

// Putting dummy data to database


// async function getToDo() {
//     const todos = await fetch(
//         "https://jsonplaceholder.typicode.com/todos"
//     );
//     let response = await todos.json();
//     await TODO.create(response);
//     console.log("data imported");
// }



app.get("/",async(req,res)=>{
  try {
   let count = parseInt(req.query.count);
   let query = TODO.find();
   query = query.skip(count).limit(10);

   let result = await query;

   res.json({data:result});

  } catch (err) {
    console.log(err);
  }

});

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log("server is running on 5000");
});
