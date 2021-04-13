const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
user_id : { 
  type :String,
  max:255,
  required:true,
},
name : { 
  type :String,
  max:255,
  required:true,
},
id : { 
  type :String,
  max:25,
  required:true,
},
})
module.exports =mongoose.model("project",projectSchema);