const mongoose = require('mongoose');
//const _ = require('lodash');


const ForumSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('forum',ForumSchema)

const Forum = mongoose.model('Forum', ForumSchema);

module.exports = { Forum }