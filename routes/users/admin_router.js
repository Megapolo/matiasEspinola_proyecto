var express = require('express');
var router = express.Router();
const {render, PRODUCTS, USERS} = require('../../controllers/users/admin_controllers')

router.get('/', render)

router.get('/edit/:nombre', (req, res)=> res.redirect('/index'))

module.exports = router