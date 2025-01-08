var express = require('express');
var router = express.Router();
const controller = require('../../controllers/users/login_controllers')

router.get('/', function(req, res, next) {
  res.render('users/login', { title: 'Login' });
});

module.exports = router;
