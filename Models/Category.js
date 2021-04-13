const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
name: {
    type : String,
    min : 1, 
    max :100
}
})

module.exports =mongoose.model('Category',categorySchema);