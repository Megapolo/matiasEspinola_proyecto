var express = require('express');
var router = express.Router();
const {load, login, register, store, admin} = require('../controllers/user_controllers')
const validator = require('../validation/register');

router.get('/login', load);

router.post('/login', login);

router.get('/register', register);

router.post('/register', validator ,store)

router.get('/admin', admin)

module.exports = router;
