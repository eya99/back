const mongoose = require('mongoose');
//const _ = require('lodash');


const ReclamationSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    commentaire: {
        type: String,
        required: true,
    }


});

module.exports = mongoose.model('reclamation',ReclamationSchema)

const Reclamation = mongoose.model('Reclamation', ReclamationSchema);

module.exports = { Reclamation }