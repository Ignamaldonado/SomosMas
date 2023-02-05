'use strict';
const bcrypt = require('bcrypt')

const usersArray = [
  {
    firstName: 'Admin',
    lastName: 'Demo',
    email: 'admin@test.com',
    password: bcrypt.hashSync('12345678', 10),
    roleId: 1,
    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
    createdAt: new Date,
    updatedAt: new Date
  },
  {
    firstName: 'Usuario',
    lastName: 'Demo',
    email: 'usuario@test.com',
    password: bcrypt.hashSync('12345678', 10),
    roleId: 2,
    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
    createdAt: new Date,
    updatedAt: new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', usersArray, {});
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
