const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VehiculeModel = new Schema({



    genre: {
        type: String,
        default: ""
    },

    marque: {
        type: String,
        default: ""
    },

    imatriculation: {
        type: String,
        default: "",
        unique: true
    },
    place: {
        type: String,
        default: ""
    },
    puissance_fiscale: {
        type: String,
        default: ""
    },

    codeMarque: {
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

module.exports = mongoose.model('vehicule', VehiculeModel);