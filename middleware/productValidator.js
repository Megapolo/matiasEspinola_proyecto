
const checkProduct = async (req, res, next) => {
  const {nombre, descripcion ,categoryId, fabricante, precio} = req.body;

  let errors = [];

  if (!nombre) {
    errors.push({ field: 'nombre', message: 'El nombre es requerido' });
  }

  if (!descripcion) {
    errors.push({ field: 'descripcion', message: 'La descripcion es requerida' });
  }

  if (!categoryId && categoryId <= 0 || categoryId > 3) {
    errors.push({ field: 'categoryId', message: 'La categoria es requerida' });
  }

  
  if (!fabricante) {
    errors.push({ field: 'fabricante', message: 'El fabricante es requerido' });
  }
  
  if (!precio || precio <= 0) {
    errors.push({ field: 'precio', message: 'El precio es requerido' });
  }
  
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = {checkProduct};