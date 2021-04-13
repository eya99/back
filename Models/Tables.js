const mongoose = require("mongoose");

const TablesSchema = new mongoose.Schema({

nomTable: {
    type : String,
    max :255
},



})

module.exports =mongoose.model('Tables',TablesSchema);