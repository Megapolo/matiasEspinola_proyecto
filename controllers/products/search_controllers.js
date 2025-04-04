// const fs = require('fs');
// const dataBaseItems = fs.readFileSync('data/productos.json', 'utf-8')
// const productos = JSON.parse(dataBaseItems);
const {pool} = require('../../database/config/config.js');

// const db = require('../../database/models');
// const { op } = require('db.sequelize.Op');

const searchProducts = async function(search) {
  const param = `%${search}%`;
  const [rows] = await pool.query(
    `SELECT * FROM products 
     WHERE UPPER(nombre) LIKE UPPER(?) 
        OR UPPER(fabricante) LIKE UPPER(?) 
        OR UPPER(categoryId) LIKE UPPER(?)`,
    [param, param, param]
  );
  
  return rows;
  // let param = search.toUpperCase();
  // let producto = db.Product.findAll({
  //  where: [{ nombre: { [op.like]: `%${param}%` }, fabricante: { [op.like]: `%${param}%` }, tipo: { [op.like]: `%${param}%` } }]
  // });
  // .then(producto => {
  //   return producto;
  // });
  // .catch (error => {
  //   return error; )
  // });
}

const search = async (req, res, next) => {
  const name = req.query.search?.toUpperCase();
  if (!name) {
    return res.redirect('/products');
  }

  try {
    const [productos] = await pool.query(`
      SELECT p.*, i.name AS image
      FROM products p
      LEFT JOIN images i ON i.productId = p.id
      WHERE UPPER(p.nombre) LIKE ? 
         OR UPPER(p.fabricante) LIKE ? 
         OR UPPER(p.categoryId) LIKE ?
    `, [`%${name}%`, `%${name}%`, `%${name}%`]);
    const productosMap = {};

    productos.forEach(row => {
      if (!productosMap[row.id]) {
        productosMap[row.id] = {
          ...row,
          imagenes: row.image ? [row.image] : []
        };
      } else if (row.image) {
        productosMap[row.id].imagenes.push(row.image);
      }
    });

    const resultados = Object.values(productosMap);
    const fabricante = [...new Set(resultados.map(p => p.fabricante))];

    res.render('products/search', {
      fabricante,
      name,
      producto: resultados,
      title: "Búsqueda"
    });

  } catch (error) {
    console.error("ERROR EN SEARCH (pool.query):", error);
    return res.status(500).send("Error al buscar productos.");
  }
};

const all = async (req, res, next) => {
  try {
    const [productos] = await pool.query('SELECT * FROM products');

    const [imagenes] = await pool.query('SELECT * FROM images');

    const productosConImagenes = productos.map(producto => {
      const imgs = imagenes.filter(img => img.productId === producto.id);
      return {
        ...producto,
        imagenes: imgs 
      };
    });

    const fabricante = [...new Set(productosConImagenes.map(element => element.fabricante))];

    return res.render('products/all', { 
      fabricante, 
      productos: productosConImagenes, 
      title: "Lista de Productos" 
    });
  } catch (error) {
    console.error("ERROR EN ALL:", error); 
    return res.status(500).send("Error al cargar todos los productos.");
  }
};

module.exports = { search, all, searchProducts };