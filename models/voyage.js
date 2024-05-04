
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VoyageModel = new Schema({


    assure: {
        type: String,
        default: ""
    },
    telephone: {
        type: String,
        default: ""
    },
    adresse: {
        type: String,
        default: ""
    },

    zone: {
        type: String,
        default: ""
    },

    duree: {
        type: String,
        default: ""
    },

    effet: {
        type: String,
        default: ""
    },

    numPassport: {
        type: String,
        default: ""
    },

    dtDeliv: {
        type: String,
        default: ""
    },

    dtExpir: {
        type: String,
        default: ""
    },

    lieuNais: {
        type: String,
        default: ""
    },

    dtNais: {
        type: String,
        default: ""
    },

    lieuDepart: {
        type: String,
        default: ""
    },

    lieuDest: {
        type: String,
        default: ""
    },


    policeCompagnie: {
        type: String,
        default: ""
    },

    police: {
        type: String,
        default: ""
    },

    compagnie: {
        type: String,
        default: ""
    },

    cliCode: {
        type: String,
        default: ""
    },




}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('voyage', VoyageModel);
