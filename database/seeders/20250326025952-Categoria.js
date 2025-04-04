'use strict';
const productosJson = require('../../data/productos.json')
const productos = productosJson.map(({tipo}) => {
  return {
    name: tipo,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('Categories', [{
      id: 1,
      name: "Placa de video",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 2,
      name: "Procesador",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 3,
      name: "Gabinete",
      createdAt: new Date(),
      updatedAt: new Date()
      },
    ])
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
