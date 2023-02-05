'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Organizations', 'welcomeText', {
      type: Sequelize.TEXT,
      allowNull: false
    }),
    await queryInterface.changeColumn('Organizations', 'phone', {
      type: Sequelize.STRING,
      allowNull: false
    }),
    await queryInterface.renameColumn('Organizations', 'adress', 'address')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Organizations', 'welcomeText', {
      type: Sequelize.STRING,
      allowNull: false
    }),
    await queryInterface.changeColumn('Organizations', 'phone', {
      type: Sequelize.INTEGER,
      allowNull: true
    }),
    await queryInterface.renameColumn('Organizations', 'address', 'adress')
  }
};
