const assuranceModel = require("../models/assurance");



exports.add = async (req, res, next) => {



    try {

        let {
            code,
            phone
        } = req.query;

        const assurance = assuranceModel();

        assurance.code = code;
        assurance.phone = phone;

        const saveAssurance = await assurance.save();


        return res.status(201).json({
            message: 'creation réussi',
            status: 'OK',
            data: saveAssurance,
            statusCode: 201
        });

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
