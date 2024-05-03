
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VehiculeModel = new Schema({


    policeCompagnie: {
        type: String,
        default: ""
    },

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
    dateSuspension: {
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
        ref: "souscripteur",
    },
    vehiculeGaranti: {
        type: Schema.Types.ObjectId,
        ref: "vehicule",
    },

    compagnie: {
        type: String,
        default: ""
    },
    vaf: {
        type: String,
        default: ""
    }, vvn: {
        type: String,
        default: ""
    }, recour: {
        type: String,
        default: ""
    }, vol: {
        type: String,
        default: ""
    }, inc: {
        type: String,
        default: ""
    }, pt: {
        type: String,
        default: ""
    }, gb: {
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

module.exports = mongoose.model('garanti', VehiculeModel);