'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: "Matías",
      lastname: "Espínola",
      email: "espinolamatias37@gmail.com",
      tel: "1122334455",
      provincia: 1,
      localidad: 1,
      address: "Calle falsa 123",
      password: "$2b$10$yOHZ00LqZdXj5wKsa3wNCeNedxjsz3zndGDBs1gbrCt.PD0kPaU0q",
      code: "1661",
      img: "/images/users/IMG_20230207_132559-1747093614408-81e5bb53-d90e-44bf-a086-2a656743c36d.jpg",
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ])
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
