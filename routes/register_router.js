var express = require('express');
var router = express.Router();
const controller = require('../controllers/register_controllers')

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Registro' });
});

module.exports = router;
