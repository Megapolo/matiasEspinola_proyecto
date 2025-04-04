'use strict';
const productosJson = require('../../data/productos.json');

const productos = productosJson.map(({ id, img }) => {
  return {
    name: img,         // Asegurate que esto coincida con tu DB
    productId: id,     // FK a la tabla products
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("⏫ Insertando imágenes:", productos);
    await queryInterface.bulkInsert('Images', productos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};