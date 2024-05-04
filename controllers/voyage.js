const voyageModel = require('../models/voyage');

const axios = require('axios');

exports.add = async (req, res) => {


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

        compagnie

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

        const voyageSave = await voyage.save();

        if (compagnie == "ASKIA") {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://srvwebaskia.sytes.net:8080/monserviceweb/srwbclient/createclient?pvCode=6000&nom=' + assure.replaceAll('_', ' ') + '&numtel=' + telephone.replaceAll('_', ' ') + '&adresse=' + adresse.replaceAll('_', ' '),
                headers: {
                    'appClient': process.env.APP_CLIENT
                }
            };

            axios.request(config).then(async (responseClient) => {

                console.log("response client");


                console.log(responseClient.data);

                let effetDate = effet.substring(6, 8) + '/' + effet.substring(4, 6) + '/' + effet.substring(0, 4);
                let dtDelivDate = dtDeliv.substring(6, 8) + '/' + dtDeliv.substring(4, 6) + '/' + dtDeliv.substring(0, 4);
                let dtExpirDate = dtExpir.substring(6, 8) + '/' + dtExpir.substring(4, 6) + '/' + dtExpir.substring(0, 4);
                let dtNaisDate = dtNais.substring(6, 8) + '/' + dtNais.substring(4, 6) + '/' + dtNais.substring(0, 4);

                let config1 = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://srvwebaskia.sytes.net:8080/monserviceweb/srwbvoyage/create?cliCode=' + responseClient.data.cliNumero + '&zn=' + zone + '&duree=' + durer + '&effet=' + effetDate + '&numPassport=' + numPassport + '&dtDeliv=' + dtDelivDate + '&dtExpir=' + dtExpirDate + '&lieuNais=' + lieuNais + '&dtNais=' + dtNaisDate + '&lieuDepart=' + lieuDepart + '&lieuDest=' + lieuDest + '&assure=' + assure,
                    headers: {
                        'appClient': process.env.APP_CLIENT
                    }
                };

                const responseGaranti = await axios.request(config1);

                console.log("response.data GArantis AXIA");

                console.log(responseGaranti.data);

                const voyageSF = await voyageModel.findById(voyageSave.id).exec();

                voyageSF.policeCompagnie = responseGaranti.data.numeroPolice;

                voyageSF.policeCompagnie = responseClient.data.cliNumero;

                const voyageS = await voyageSF.save();

                return res.status(201).json({
                    message: 'creation reussi ',
                    data: voyageS,
                })


            }).catch((error) => {
                console.log(error);
            });;

        } else {
            return res.status(404).json({
                message: 'remplir tous les champs',
                data: "",
            })
        }

    } else {
        return res.status(404).json({
            message: 'remplir tous les champs',
            data: "",
        })
    }

    try {



    } catch (error) {

        return res.status(404).json({
            message: 'remplir tous les champs',
            data: error,
        })

    }

}

exports.all = async (req, res) => {

    try {

        const voyages = await voyageModel.find({}).exec();

        return res.status(200).json({
            message: 'creation reussi ',
            data: voyages,
        })


    } catch (error) {
        return res.status(404).json({
            message: 'remplir tous les champs',
            data: error,
        })
    }

}