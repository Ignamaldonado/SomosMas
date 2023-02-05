'use strict';

const organizations = [
  {
    name: 'Somos Más',
    image: '',
    phone: '111',
    address: 'En algún lugar',
    welcomeText: '<p>¡Bienvenidos a nuestra ONG <strong>Somos Mas</strong>.</p><p>Brindamos recursos educativos y apoyo a niños necesitados.</p><p>Creemos que todos los niños tienen derecho a una <strong>educación de calidad</strong> y estamos comprometidos a ayudarlos a alcanzar su máximo potencial.</p><p>¡Gracias por apoyar nuestra causa!</p>',
    socialLinks: JSON.stringify([{"url": "facebook", "name": "Facebook"}, {"url": "instagram", "name": "Instagram"}, {"url": "twitter", "name": "Twitter"}]),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', organizations, {});
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

// "[{\"url\":\"facebook\",\"name\":\"Facebook\"},{\"url\":\"instagram\",\"name\":\"Instagram\"},{\"url\":\"twitter\",\"name\":\"Twitter\"}]"