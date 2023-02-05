'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [
      {
        name: 'Maria Irola',
        image: '/images/support_01.jpg',
        createdAt:new Date,
        updatedAt:new Date
      },
      {
        name: 'Marita Gomez',
        image: '/images/support_02.jpg',
        createdAt:new Date,
        updatedAt:new Date
      },
      {
        name: 'Miriam Rodriguez',
        image: '/images/support_03.jpg',
        createdAt:new Date,
        updatedAt:new Date
      },
      {
        name: 'Cecilia Mendez',
        image: '/images/support_04.jpg',
        createdAt:new Date,
        updatedAt:new Date
      },
      {
        name: 'Mario Fuentes',
        image: '/images/support_01.jpg',
        createdAt:new Date,
        updatedAt:new Date
      },
      {
        name: 'Rodrigo Fuente',
        image: '/images/support_02.jpg',
        createdAt:new Date,
        updatedAt:new Date
      },
      {
        name: 'Maria Garcia',
        image: '/images/support_03.jpg',
        createdAt:new Date,
        updatedAt:new Date
      },
      {
        name: 'Marco Fernandez',
        image: '/images/support_04.jpg',
        createdAt:new Date,
        updatedAt:new Date
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
