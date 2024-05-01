const assuranceModel = require("../models/assurance");

const garantiModel = require('../models/garanti.js');

const souscripteurModel = require('../models/souscripteur.js');

const vehiculeModel = require('../models/vehicule.js');


exports.add = async (req, res, next) => {



    try {

        let {
            nom_assure,
            adresse_assure,
            tel_assure,
            genre,
            marque,
            immat,
            place,
            puissance,
            police,
            attestation,
            effet,
            durer,
            echeance,
            temoin,
            cause
        } = req.query;

        let vehicule = {};

        const garanti = garantiModel();


        vehicule = await vehiculeModel.findOne({
            marque: marque
        }).exec();

        console.log("vehicule");
        console.log(vehicule);

        if (!vehicule) {
            vehicule = vehiculeModel();

            vehicule.genre = genre;
            vehicule.marque = marque;
            vehicule.imatriculation = immat;
            vehicule.place = place;
            vehicule.puissance_fiscale = puissance;
            const vehiculeSave = await vehicule.save();
            garanti.vehiculeGaranti = vehiculeSave.id;

        } else {
            garanti.vehiculeGaranti = vehicule.id;
        }

        const souscripteur = souscripteurModel();

        souscripteur.adresse = adresse_assure;
        souscripteur.assure = nom_assure;
        souscripteur.telephone = tel_assure;
        const souscripteurSave = await souscripteur.save();


        garanti.police = police;
        garanti.temoin = temoin;
        garanti.attestation = attestation;
        garanti.effet = effet;
        garanti.echeance = echeance;
        garanti.durer = durer;
        garanti.cause = cause;
        garanti.soucripteurGaranti = souscripteurSave.id;

        const garantiSave = await garanti.save();

        return res.status(201).json({
            message: 'creation reussi',
            data: garantiSave,
        })


        // let {
        //     code,
        //     phone
        // } = req.query;

        // const assurance = assuranceModel();

        // assurance.code = code;
        // assurance.phone = phone;

        // const saveAssurance = await assurance.save();


        // return res.status(201).json({
        //     message: 'creation réussi',
        //     status: 'OK',
        //     data: saveAssurance,
        //     statusCode: 201
        // });

    } catch (error) {
        return res.status(404).json({
            message: 'erreur supréssion ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }

}


exports.all = async (req, res) => {

    try {
        const adresses = await assuranceModel.find({
        }).exec();

        return res.status(200).json({
            message: 'liste de addresse avec success',
            status: 'OK',
            data: adresses,
            statusCode: 200
        });

    } catch (error) {

        return res.status(400).json({
            message: 'erreur serveur',
            status: 'OK',
            data: error,
            statusCode: 400
        });

    }

}
