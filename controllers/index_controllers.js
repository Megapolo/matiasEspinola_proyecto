const { log } = require("console");
const fs = require("fs")
const db = fs.readFileSync('data/productos.json', 'utf-8')
const productos = JSON.parse(db);

const outstanding = (req, res, next) => {
let producto = productos
  console.log(producto);
  return res.render('index', { title: 'Pagina', producto });
 
  
}

module.exports = {outstanding}

