'use strict';
const productosJson = require('../../data/productos.json')
const productos = productosJson.map(({nombre,fabricante,tipo,precio,descuento}) => {
  return {
    nombre: nombre,
    fabricante: fabricante,
    categoryId: tipo,
    precio: precio,
    descuento: descuento,
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Products', productos)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
