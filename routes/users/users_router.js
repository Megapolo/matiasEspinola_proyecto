var express = require('express');
var router = express.Router();
const {load, login, register, store, profile, logout, update} = require('../../controllers/users/user_controllers')
const validatorRegister = require('../../validation/registerValidation');
const loginValidator = require('../../validation/loginValidation')
const loginVerify = require('../../middleware/loginValidator');
const upload = require('../../middleware/uploadImage');

router.get('/login', loginVerify ,load);
router.post('/login', loginValidator ,login);
router.get('/logout', logout)

router.get('/register', register);
router.post('/register', validatorRegister ,store)

router.get('/profile/:id', loginVerify, profile)
router.put('/profile/:id', upload.single('avatar') ,update)

module.exports = router;
