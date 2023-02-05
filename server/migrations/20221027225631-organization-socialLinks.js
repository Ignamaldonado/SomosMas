'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Organizations', 'Instagram'),
    await queryInterface.removeColumn('Organizations', 'Linkedin'),
    await queryInterface.removeColumn('Organizations', 'Facebook'),
    await queryInterface.addColumn('Organizations', 'socialLinks', {
      type: Sequelize.JSON,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Organizations', 'socialLinks'),
    await queryInterface.addColumn('Organizations', 'Instagram'),
    await queryInterface.addColumn('Organizations', 'Linkedin'),
    await queryInterface.addColumn('Organizations', 'Facebook', {
      type: Sequelize.JSON,
      allowNull: false
    })
  }
};
