const {pool} = require('../../database/config/config.js');

const product = async (req, res, next) => {
  const nombreProducto = req.params.nombre;

  if (!nombreProducto) {
    return res.send("El producto seleccionado no es válido.");
  }

  try {
    const [productoResult] = await pool.query(`
      SELECT p.*, i.name AS image
      FROM products p
      LEFT JOIN images i ON i.productId = p.id
      WHERE p.nombre = ?
    `, [nombreProducto]);

    if (productoResult.length === 0) {
      return res.send("Producto no encontrado.");
    }

    const producto = {
      ...productoResult[0],
      imagenes: productoResult.map(p => p.image).filter(img => img)
    };

    const [relacionadosRaw] = await pool.query(`
      SELECT p.id, p.nombre, p.categoryId, p.precio, i.name AS image
      FROM products p
      LEFT JOIN images i ON i.productId = p.id
      WHERE p.categoryId = ? AND p.id != ?
      ORDER BY p.id
    `, [producto.categoryId, producto.id]);

    const relacionadosMap = new Map();
    relacionadosRaw.forEach(p => {
      if (!relacionadosMap.has(p.id)) {
        relacionadosMap.set(p.id, {
          id: p.id,
          nombre: p.nombre,
          tipo: p.categoryId,
          precio: p.precio,
          imagenes: p.image ? [p.image] : []
        });
      } else if (p.image) {
        relacionadosMap.get(p.id).imagenes.push(p.image);
      }
    });

    const relacionados = Array.from(relacionadosMap.values());

    res.render("products/product", {
      title: producto.nombre,
      producto,
      relacionados
    });

  } catch (error) {
    console.error("Error al buscar producto:", error);
    res.status(500).send("Hubo un error al obtener el producto");
  }
};

module.exports = { product };