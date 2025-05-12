var express = require('express');
var router = express.Router();
const controller = require('../../controllers/apis/productApi_controller')

router.get('/products/all', controller.getAllProducts);

router.get('/products/category/:category', controller.getProductsByCategory);

router.get('/products/id/:id', controller.getProductById);

router.get('/products/manufacturer/:name', controller.getProductByManufacturer)

module.exports = router;