const mongoose = require('mongoose');
//const _ = require('lodash');


const PublicationSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    idforum: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
    
});

module.exports = mongoose.model('publication',PublicationSchema)

const Publication = mongoose.model('Publication', PublicationSchema);

module.exports = { Publication }