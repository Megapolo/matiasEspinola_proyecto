var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('users/register', { title: 'Registro' });
});

module.exports = router;
