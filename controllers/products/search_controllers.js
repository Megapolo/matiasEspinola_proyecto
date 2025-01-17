const fs = require('fs');
const dataBaseItems = fs.readFileSync('data/productos.json', 'utf-8')
const productos = JSON.parse(dataBaseItems);

const searchProducts = function(search) {return productos.filter(element =>
  element.nombre.includes(search) || 
  element.fabricante.toUpperCase().includes(search) ||
  element.tipo.toUpperCase().includes(search));

}

const search = (req, res, next) => {
  const name = req.query.search.toUpperCase()
  const producto = searchFunction(name)
  const fabricante = [...new Set(producto.map(element => element.fabricante))];
  if (producto.length >= 0) {
    return res.render('products/search', {fabricante, name, producto, title: "Búsqueda"});
  } else
  return res.send("El producto seleccionado no existe todavía");
}
;

const all = (req, res, next) => {
  const producto = []
  const fabricante = [...new Set(productos.map(element => element.fabricante))];
  return res.render('products/all', {fabricante, productos, title: "Lista de Productos"});
};


module.exports = { search, all, searchProducts };
