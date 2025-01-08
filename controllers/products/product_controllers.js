const fs = require('fs')
const database = fs.readFileSync('data/productos.json', 'utf-8')
const db = JSON.parse(database)

const product = (req, res, next) => {
  const request = req.params.nombre;
  if (!request) {
    return res.send("El producto seleccionado no es valido.");
  }
  let producto = db.find((element) => element.nombre == request);
  let relacionados = db.filter((element) => element.tipo == producto.tipo && element.id != producto.id)
  if (producto) {
    let title = producto.nombre;
    res.render("products/product", { title, producto, relacionados});
  } else {
    res.send("Producto no encontrado.");
  }
};
module.exports= {product}