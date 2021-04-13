const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        min : 6, 
        max :100
    },
    prenom: {
        type: String,
        required: true
    },
email: {
    type : String,
    min : 6, 
    max :100
},
password: {
    type : String,
    min : 6,
    max: 1024
},
roles: {
    type : String,
    enum : ["Admin" , "Client" ]
},
verified: {
    type: Boolean,
    default: false

},
image: {
    type: String
},
social: {
    type: Boolean,
    default: false
},
date: {
    type : Date,
    default : Date.now,

   
   
    
}
})

module.exports =mongoose.model('User',userSchema);