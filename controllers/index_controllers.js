const {pool} = require('../database/config/config.js');

const outstanding = async (req, res, next) => {
  try {
    const [productosRaw] = await pool.query(`
      SELECT p.id, p.nombre, p.precio, i.name AS image
      FROM products p
      LEFT JOIN images i ON i.productId = p.id
      ORDER BY p.id
    `);

    const productosMap = new Map();
    productosRaw.forEach(p => {
      if (!productosMap.has(p.id)) {
        productosMap.set(p.id, {
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          imagenes: p.image ? [p.image] : []
        });
      } else if (p.image) {
        productosMap.get(p.id).imagenes.push(p.image);
      }
    });

    const productos = Array.from(productosMap.values());

    res.render('index', { title: 'Página', productos });

  } catch (error) {
    console.error("❌ ERROR EN INDEX:", error);
    return res.status(500).send("Error al cargar los productos.");
  }
};

module.exports = { outstanding };

