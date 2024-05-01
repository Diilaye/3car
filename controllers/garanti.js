const garantiModel = require('../models/garanti.js');

const souscripteurModel = require('../models/souscripteur.js');

const vehiculeModel = require('../models/vehicule.js');

exports.add = async (req, res) => {


    try {


        if (req.query.nom_assure != undefined) {
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
                cause,
                dateSuspension
            } = req.query;

            let vehicule = {};

            const garanti = garantiModel();


            vehicule = await vehiculeModel.findOne({
                marque: marque
            }).exec();

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



            let souscripteur = {};


            souscripteur = await souscripteurModel.findOne({
                telephone: tel_assure
            }).exec();

            if (!souscripteur) {
                souscripteur = souscripteurModel();
                souscripteur.adresse = adresse_assure;
                souscripteur.assure = nom_assure;
                souscripteur.telephone = tel_assure;
                const souscripteurSave = await souscripteur.save();
                garanti.soucripteurGaranti = souscripteurSave.id;

            } else {
                garanti.soucripteurGaranti = souscripteur.id;
            }




            garanti.police = police;
            garanti.temoin = temoin;
            garanti.attestation = attestation;
            garanti.effet = effet;
            if (cause == "SUSPENSION") {
                garanti.dateSuspension = dateSuspension;
            }
            garanti.echeance = echeance;
            garanti.durer = durer;
            garanti.cause = cause;



            const garantiSave = await garanti.save();

            return res.status(201).json({
                message: 'creation reussi',
                data: garantiSave,
            })



        } else {
            return res.status(404).json({
                message: 'remplir tous les champs',
                data: "",
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: 'errrur optenue',
            data: error,
        })
    }


}

exports.all = async (req, res) => {


    return res.status(200).json({
        message: 'remplir tous les champs',
        data: "",
    })


}