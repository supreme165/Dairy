const route = require('express').Router();

const usercontroller = require('../controller/userController');
route.get('/register',usercontroller.createUser);
route.get('/login',usercontroller.loginUser);

module.exports = route;
