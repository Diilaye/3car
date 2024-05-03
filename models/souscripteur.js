const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SouscriteurModel = new Schema({



    assure: {
        type: String,
        default: ""
    },

    adresse: {
        type: String,
        default: ""
    },

    telephone: {
        type: String,
        default: "",
        unique: true
    },

    compagnie: {
        type: String,
        default: "",
    },

    numeroClientCompagnie: {
        type: String,
        default: "",
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

module.exports = mongoose.model('souscripteur', SouscriteurModel);