var express = require('express');
var router = express.Router();
const {render, edit, update, remove, addNew, renderNew} = require('../../controllers/users/admin_controllers')
const uploadNewProductImage = require('../../middleware/uploadProductImage')

router.get('/products', render)

router.get('/products/edit/:id', edit)

router.put('/products/edit/:id', update)

router.delete('/products/delete/:id', remove)

router.get('/products/add',renderNew)

router.post('/products/add', uploadNewProductImage.single('img'), addNew)

module.exports = router