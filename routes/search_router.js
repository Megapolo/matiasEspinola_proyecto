var express = require('express');
var router = express.Router();
const controller = require('../controllers/search_controllers')

router.get('/', controller.all)

router.get('/search/:name?', controller.search)



module.exports = router;
