var express = require('express');
var router = express.Router();
const {render, edit, update, remove, addNew, renderNew} = require('../../controllers/users/admin_controllers')
const uploadNewProductImage = require('../../middleware/uploadProductImage')
const {checkAdminRole} = require('../../middleware/adminProductValidation')
const { checkProduct} = require('../../middleware/productValidator')

router.get('/products', checkAdminRole , render)

router.get('/products/edit/:id', checkAdminRole , edit)

router.put('/products/edit/:id', checkProduct, update)

router.delete('/products/delete/:id', remove)

router.get('/products/add', checkAdminRole, renderNew)

router.post('/products/add', uploadNewProductImage.array('img', 5), checkProduct, addNew)

module.exports = router