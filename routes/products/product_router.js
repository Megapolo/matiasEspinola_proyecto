var express = require('express');
var router = express.Router();
const controller = require('../../controllers/products/product_controllers')

router.get('/:nombre', controller.product);

module.exports = router;
