var express = require('express');
var router = express.Router();
const controller = require('../controllers/cart_controllers')


router.get('/', controller)
module.exports = router;
