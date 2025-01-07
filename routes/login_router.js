var express = require('express');
var router = express.Router();
const controller = require('../controllers/login_controllers')

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
