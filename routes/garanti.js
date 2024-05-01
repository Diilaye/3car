const express = require('express');



// import all controllers
const garantiCtrl = require('../controllers/garanti');


const routes = new express.Router();

// Add routes
routes.get('/', garantiCtrl.all);
routes.get('/post', garantiCtrl.add);


module.exports = routes;
