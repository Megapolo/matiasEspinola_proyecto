var express = require('express');
var router = express.Router();
const controller = require('../../controllers/apis/cartApi_controller');

router
    .get('/show', controller.getCart)
    .post('/add/:id', controller.addItemToCart)
    .delete('/remove/:id', controller.removeItemFromCart)
    .delete('/remove/all', controller.removeAllItems)


module.exports = router;
