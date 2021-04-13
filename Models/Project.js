const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
name: {
    type : String,
    min : 1, 
    max :100
},
category: {
    type : String,
    min : 1,
    max : 100
},
giturl:{
    type : String,
    min :10,
    max : 100
},
url:{
    type : String
},
createdat:{
    type : String,
    min : 8,
    max : 50
},
userId : {
    type   : String
}
})

module.exports =mongoose.model('Project',projectSchema);