
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VehiculeModel = new Schema({


    police: {
        type: String,
        default: ""
    },

    attestation: {
        type: String,
        default: ""
    },

    effet: {
        type: String,
        default: ""
    },
    echeance: {
        type: String,
        default: ""
    },
    durer: {
        type: String,
        default: ""
    },
    cause: {
        type: String,
        default: ""
    },

    temoin: {
        type: String,
        default: ""
    },

    soucripteurGaranti: {
        type: Schema.Types.ObjectId,
        ref: "vehicule",
    },
    vehiculeGaranti: {
        type: Schema.Types.ObjectId,
        ref: "vehicule",
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

module.exports = mongoose.model('garanti', VehiculeModel);