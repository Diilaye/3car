const garantiModel = require('../models/garanti.js');

const souscripteurModel = require('../models/souscripteur.js');

const vehiculeModel = require('../models/vehicule.js');

const axios = require('axios');



require('dotenv').config({
    path: './.env'
});


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
                gb,
                codeCompagnie

            } = req.query;

            console.log(req.query);

            let vehicule = {};

            const garanti = garantiModel();


            vehicule = await vehiculeModel.findOne({
                imatriculation: immat.toUpperCase()
            }).exec();

            // console.log(vehicule);

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
                souscripteur.compagnie = compagnie;
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
            garanti.effet = effet;
            garanti.pt = pt != 0 ? 1 : 0;
            garanti.gb = gb != 0 ? 1 : 0;
            if (cause == "SUSPENSION") {
                garanti.dateSuspension = dateSuspension;
            }
            garanti.echeance = echeance;
            garanti.durer = durer;
            garanti.cause = cause;
            garanti.cause = cause;
            garanti.policeCompagnie = "Police compagnie";
            garanti.testGarantis = codeCompagnie == '6000' ? "test" : "production";


            const garantiSave = await garanti.save();




            if (cause == "AFFAIRE_NOUVELLE" || cause == "RENOUVELLEMENT") {
                if (compagnie == "ASKIA") {
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: 'http://srvwebaskia.sytes.net:8080/monserviceweb/srwbclient/createclient?pvCode=' + codeCompagnie + '&nom=' + nom_assure.replaceAll('_', ' ') + '&numtel=' + tel_assure.replaceAll('_', ' ') + '&adresse=' + adresse_assure.replaceAll('_', ' '),
                        headers: {
                            'appClient': codeCompagnie == '6000' ? process.env.APP_CLIENT : process.env.APP_CLIENT_PROD
                        }
                    };

                    return axios.request(config).then(async (responseClient) => {

                        console.log("response client");

                        console.log("response client");

                        console.log(responseClient.data);


                        const souscripteurF = await souscripteurModel.findById(garantiSave.soucripteurGaranti).exec();

                        // console.log(souscripteurF);

                        souscripteurF.numeroClientCompagnie = responseClient.data.cliNumero;

                        const souscripteurFS = await souscripteurF.save();

                        console.log("souscripteurFS");

                        console.log(souscripteurFS);

                        let codeCat = '';
                        let codeSCat = '';

                        if (genre == "VP") {
                            codeCat = "510";
                            codeSCat = "000";
                        } else if (genre == "TPC") {
                            codeCat = "520";
                            codeSCat = "004";
                        } else if (genre == "TPM") {
                            codeCat = "530";
                            codeSCat = "007";
                        } else if (genre == "TPV") {
                            codeCat = "540";
                            if (parseInt(place) > 5) {
                                codeSCat = "008";
                            } else {
                                codeSCat = "005";
                            }
                        } else {
                            codeCat = "550";
                            if (parseInt(puissance) > 125) {
                                codeSCat = "012";
                            } else {
                                codeSCat = "010";
                            }
                        }

                        let effetDate = effet.substring(6, 8) + '/' + effet.substring(4, 6) + '/' + effet.substring(0, 4);


                        let config1 = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: 'http://srvwebaskia.sytes.net:8080/monserviceweb/srwbauto/create?cliCode=' + responseClient.data.cliNumero + '&cat=' + codeCat + '&scatCode=' + codeSCat + '&carrCode=00&nrg=E00002&pfs=' + puissance + '&nbP=' + place + '&chrgUtil=3500&dure=' + durer + '&effet=' + effetDate + '&numImmat=' + immat.replaceAll('_', ' ') + '&mqCode=' + codeMarque + '&modele=&vaf=' + garantiSave.vaf + '&vvn=' + garantiSave.vvn + '&recour=' + garantiSave.recour + '&vol=' + garantiSave.vol + '&inc=' + garantiSave.inc + '&pt=' + garantiSave.pt + '&gb=' + garantiSave.gb,
                            headers: {
                                'appClient': codeCompagnie == '6000' ? process.env.APP_CLIENT : process.env.APP_CLIENT_PROD
                            }
                        };

                        const responseGaranti = await axios.request(config1);

                        console.log("response.data GArantis AXIA");

                        console.log(responseGaranti.data);

                        const gF = await garantiModel.findById(garantiSave.id).exec();

                        gF.policeCompagnie = responseGaranti.data.numeroPolice;

                        const gfS = await gF.save();

                        return res.status(201).json({
                            message: 'creation reussi',
                            data: gfS,
                        })

                    }).catch((error) => {
                        return res.status(404).json({
                            message: 'Erreur creation ',
                            data: error,
                        })
                    });


                }
            } else {
                return res.status(201).json({
                    message: 'creation reussi',
                    data: garantiSave,
                })
            }



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
            imatriculation: marque.toUpperCase()

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










