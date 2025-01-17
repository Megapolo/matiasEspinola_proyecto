var express = require('express');
var router = express.Router();
const {load, login, register, store, admin, profile, logout} = require('../../controllers/users/user_controllers')
const validatorRegister = require('../../validation/registerValidation');
const validatorLogin = require('../../validation/loginValidation')

router.get('/login', load);

router.post('/login', validatorLogin ,login);

router.get('/logout', logout)

router.get('/register', register);

router.post('/register', validatorRegister ,store)

router.get('/profile', profile)

module.exports = router;
