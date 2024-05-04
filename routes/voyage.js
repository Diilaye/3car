const express = require('express');



// import all controllers
const voyageCtrl = require('../controllers/voyage');


const routes = new express.Router();

// Add routes
routes.get('/', voyageCtrl.all);
// routes.get('/one', garantiCtrl.one);
routes.get('/post', voyageCtrl.add);


module.exports = routes;
