const express = require('express');



// import all controllers
const voyageCtrl = require('../controllers/voyage');


const routes = new express.Router();

// Add routes
routes.get('/post', voyageCtrl.add);

routes.get('/', voyageCtrl.all);
// routes.get('/one', garantiCtrl.one);


module.exports = routes;
