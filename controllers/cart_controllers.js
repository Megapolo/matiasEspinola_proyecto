var express = require('express');
var router = express.Router();


const index = (req, res) => {
  res.render('cart', { title: "Carrito"})
}
module.exports = index;
