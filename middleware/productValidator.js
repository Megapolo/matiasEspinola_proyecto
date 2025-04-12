
const checkProduct = async (req, res, next) => {
  const {nombre, descripcion ,categoryId} = req.body;

  let errors = [];

  if (!nombre) {
    errors.push({ field: 'nombre', message: 'El nombre es requerido' });
  }

  if (!descripcion) {
    errors.push({ field: 'descripcion', message: 'La descripcion es requerida' });
  }

  if (!categoryId && categoryId < 0 || categoryId > 3) {
    errors.push({ field: 'categoryId', message: 'La categoria es requerida' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = {checkProduct};