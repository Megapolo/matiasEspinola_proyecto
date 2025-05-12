const { Product, Image } = require('../../database/models');
const { v4: uuidv4 } = require("uuid");

function showProducts () {
    return parseFile(readFile(pathProductData))
}

const render = async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: [{ association: 'categoria' }, {association: 'images'}] 
      });
      console.log("Productos encontrados:", products);
      res.render('admin/admin', { title: 'Admin', products });
    } catch (error) {
      console.log("Error al cargar productos:", error);
      res.render("error", { error });
    }
  };
  

  const edit = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await Product.findByPk(id, {
        include: [{ association: 'categoria' }, { association: 'images' }
        ]
      });

      res.render('admin/admin_product', { title: 'Edición de producto', product });

    } catch (error) {
      console.log("Error al buscar producto para editar:", error);
      res.render("error", { error });
    }
  };

const update = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    console.log("Datos actualizados:", updatedData);
    try {
      await Product.update(updatedData, {
        where: { id }
      });
      res.redirect('/admin/products');
    } catch (error) {
      console.log("Error al actualizar producto:", error);
      res.render("error", { error });
    }
  };

const remove = async (req, res) => {
    const id = req.params.id;
    try {
      await Image.destroy({
        where: { productId: id }
      });

      await Product.destroy({
        where: { id }
      });
      res.redirect('/admin/products');
    } catch (error) {
      console.log("Error al eliminar producto:", error);
      res.render("error", { error });
    }
  };

const renderNew = (req, res) => {
    res.render('admin/admin_new', {title : 'Nuevo producto'})
}

const addNew = async (req, res) => {
  try {
    const { nombre, fabricante, precio, descuento, categoryId, descripcion,} = req.body;

    const newProduct = await Product.create({
      nombre,
      fabricante,
      precio,
      descuento,
      categoryId,
      descripcion,
    });

    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map(file => {
        return Image.create({
          name: "/images/newProducts/"+file.filename,
          productId: newProduct.id
        });
      });
      await Promise.all(imagePromises);
    }

    res.redirect('/admin/products');
  } catch (error) {
    console.log("Error al agregar nuevo producto:", error);
    res.render("error", { error });
  }
};



module.exports = {render, edit, update, remove, renderNew, addNew}