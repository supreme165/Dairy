const route = require('express').Router();

const productController = require('../controller/productController');
route.get('/create',productController.Userproduct);

module.exports = route;
