var express = require('express');
var router = express.Router();
const controller = require('../controllers/index_controllers')

router.get('/', controller.outstanding)

module.exports = router;
