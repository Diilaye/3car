const voyageModel = require('../models/voyage');

const axios = require('axios');

exports.add = async (req, res) => {





    try {

        let {

            assure,

            telephone,

            adresse,

            zone,

            duree,

            effet,

            numPassport,

            dtDeliv,

            dtExpir,

            lieuNais,

            dtNais,

            lieuDepart,

            lieuDest,

            police,

            compagnie,

            codeCompagnie

        } = req.query;

        if (assure != undefined) {

            const voyage = voyageModel();

            voyage.assure = assure;
            voyage.telephone = telephone;
            voyage.adresse = adresse;
            voyage.zone = zone;
            voyage.duree = duree;
            voyage.effet = effet;
            voyage.numPassport = numPassport;
            voyage.dtDeliv = dtDeliv;
            voyage.dtExpir = dtExpir;
            voyage.lieuNais = lieuNais;
            voyage.dtNais = dtNais;
            voyage.lieuDepart = lieuDepart;
            voyage.lieuDest = lieuDest;
            voyage.police = police;
            voyage.compagnie = compagnie;
            voyage.policeCompagnie = "responseGaranti.data.numeroPolice";
            voyage.cliCode = "responseClient.data.cliNumero";
            garanti.testGarantis = codeCompagnie == '6000' ? "test" : "production";


            const voyageSave = await voyage.save();

            // return res.json(voyageSave)

            if (compagnie == "ASKIA") {
                let apC = '';
                if (codeCompagnie == '6000') {
                    apC = process.env.APP_CLIENT;
                } else {
                    apC = process.env.APP_CLIENT_PROD;
                }
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://srvwebaskia.sytes.net:8080/monserviceweb/srwbclient/createclient?pvCode=' + codeCompagnie + '&nom=' + assure.replaceAll('_', ' ') + '&numtel=' + telephone.replaceAll('_', ' ') + '&adresse=' + adresse.replaceAll('_', ' '),
                    headers: {
                        'appClient': apC
                    }
                };

                return axios.request(config).then(async (responseClient) => {
                    console.log("response client");


                    // return res.json(responseClient.data);


                    let effetDate = effet.substring(6, 8) + '/' + effet.substring(4, 6) + '/' + effet.substring(0, 4);
                    let dtDelivDate = dtDeliv.substring(6, 8) + '/' + dtDeliv.substring(4, 6) + '/' + dtDeliv.substring(0, 4);
                    let dtExpirDate = dtExpir.substring(6, 8) + '/' + dtExpir.substring(4, 6) + '/' + dtExpir.substring(0, 4);
                    let dtNaisDate = dtNais.substring(6, 8) + '/' + dtNais.substring(4, 6) + '/' + dtNais.substring(0, 4);



                    var options = {
                        method: 'GET',
                        url: 'http://srvwebaskia.sytes.net:8080/monserviceweb/srwbvoyage/create?cliCode=' + responseClient.data.cliNumero + '&zn=001&duree=' + duree + '&effet=' + effetDate + '&numPassport=' + numPassport + '&dtDeliv=' + dtDelivDate + '&dtExpir=' + dtExpirDate + '&lieuNais=' + lieuNais + '&dtNais=' + dtNaisDate + 'lieuDepart=' + lieuDepart + '&lieuDest=' + lieuDest,

                        headers: {
                            'appClient': process.env.APP_CLIENT,
                        },



                    };

                    axios.request(options).then(async (responseGaranti) => {
                        console.log("response.data GArantis AXIA");

                        console.log(responseGaranti.data);

                        const voyageSF = await voyageModel.findById(voyageSave.id).exec();

                        voyageSF.policeCompagnie = responseGaranti.data.numeroPolice;

                        voyageSF.cliCode = responseClient.data.cliNumero;

                        const voyageS = await voyageSF.save();

                        return res.status(201).json({
                            message: 'creation reussi ',
                            data: voyageS,
                        })
                    }).catch((errorG) => {
                        return res.status(404).json({
                            message: 'creation de garanti non effectuer  ',
                            data: errorG,
                        })
                    });


                }).catch((error) => {
                    return res.status(404).json({
                        message: 'creation de client non effectuer  ',
                        data: error,
                    })
                });
            }

        } else {
            return res.status(404).json({
                message: 'remplir tous les champs',
                data: "",
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: 'erreur survenue',
            data: error,
        })
    }



}

exports.all = async (req, res) => {

    try {

        const voyages = await voyageModel.find({}).exec();

        return res.status(200).json({
            message: 'liste voyages ',
            data: voyages,
        })


    } catch (error) {
        return res.status(404).json({
            message: 'remplir tous les champs',
            data: error,
        })
    }

}