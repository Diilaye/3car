const garantiModel = require('../models/garanti.js');

const souscripteurModel = require('../models/souscripteur.js');

const vehiculeModel = require('../models/vehicule.js');

const populateObject = [{
    path: 'soucripteurGaranti',

}, {
    path: 'vehiculeGaranti',

}];

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
                dateSuspension,
                compagnie,
                codeMarque,
                vaf,
                vvn,
                recour,
                vol,
                inc,
                pt,
                gb

            } = req.query;

            let vehicule = {};

            const garanti = garantiModel();


            vehicule = await vehiculeModel.findOne({
                imatriculation: immat
            }).exec();

            if (!vehicule) {
                vehicule = vehiculeModel();

                vehicule.genre = genre;
                vehicule.marque = marque;
                vehicule.imatriculation = immat.toUpperCase();
                vehicule.place = place;
                vehicule.puissance_fiscale = puissance;
                vehicule.codeMarque = codeMarque;
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
            garanti.compagnie = compagnie;
            garanti.attestation = attestation;
            garanti.vaf = vaf != 0 ? 1 : 0;
            garanti.vvn = vvn != 0 ? 1 : 0;
            garanti.recour = recour != 0 ? 1 : 0;
            garanti.vol = vol != 0 ? 1 : 0;
            garanti.inc = inc != 0 ? 1 : 0;
            garanti.effet = effet != 0 ? 1 : 0;
            garanti.pt = pt != 0 ? 1 : 0;
            garanti.gb = gb != 0 ? 1 : 0;
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

    try {

        const garantis = await garantiModel.find({}).populate(populateObject).exec();

        return res.status(200).json({
            message: 'liste garantis',
            data: garantis,
        })

    } catch (error) {
        return res.status(404).json({
            message: 'errrur optenue',
            data: error,
        })
    }





}

exports.one = async (req, res) => {

    try {

        let { marque } = req.query;

        const vehicule = await vehiculeModel.findOne({
            imatriculation: marque

        }).exec();

        const garantis = await garantiModel.find({
            vehiculeGaranti: vehicule.id
        }).populate(populateObject).exec();

        let i = 1;

        while ((Date.now() - Date.parse(`${garantis[garantis.length - i].effet.substring(0, 4)}-${garantis[garantis.length - i].effet.substring(4, 6)}-${garantis[garantis.length - i].effet.substring(6, 8)}`)) <= 0) {
            if (garantis[garantis.length - i].cause != "SUSPENSION" || garantis[garantis.length - i].cause != "RESILIATION") {
                i++;
            }
        }

        if (garantis[garantis.length - i].cause == "SUSPENSION" || garantis[garantis.length - i].cause == "RESILIATION") {
            return res.status(404).json({
                message: 'errreur optenue',
                data: {},
            })
        }

        return res.status(200).json({
            message: 'liste garantis',
            data: garantis[garantis.length - i],
        })

    } catch (error) {
        return res.status(404).json({
            message: 'errreur optenue',
            data: error,
        })
    }

}

