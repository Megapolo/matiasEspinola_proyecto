var express = require('express');
var router = express.Router();
const controller = require('../../controllers/users/register_controllers')

router.get('/', function(req, res, next) {
  res.render('users/register', { title: 'Registro' });
});

module.exports = router;
