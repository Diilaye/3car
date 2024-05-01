const garantiModel = require('../models/garanti');

exports.add = async (req, res) => {

    let {
        action
    } = req.query;

    res.json('action')
}