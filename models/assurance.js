const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssuranceModel = new Schema({

    code: {
        type: String,
    },

    phone: {
        type: String,

    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('assurance', AssuranceModel);