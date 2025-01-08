var express = require('express');
var router = express.Router();
const controller = require('../../controllers/products/cart_controllers')


router.get('/', controller)
module.exports = router;
