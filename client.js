const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
phone : { 
  type :String,
  max:255,
  required:true,
},
username : { 
  type :String,
  max:255,
  required:true,
},
idusr : { 
  type :String,
  max:25,
  required:true,
},
})
module.exports =mongoose.model("client",clientSchema);