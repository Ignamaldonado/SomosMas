'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Organizations', 'Instagram', {
      type: Sequelize.DataTypes.STRING
    })
    await queryInterface.addColumn('Organizations', 'Facebook', {
      type: Sequelize.DataTypes.STRING
    })
    await queryInterface.addColumn('Organizations', 'Linkedin', {
      type: Sequelize.DataTypes.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Organizations', 'Instagram')
    await queryInterface.removeColumn('Organizations', 'Facebook')
    await queryInterface.removeColumn('Organizations', 'Linkedin')
  }
};
