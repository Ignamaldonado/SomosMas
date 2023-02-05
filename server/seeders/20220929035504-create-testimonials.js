'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Testimonials', [
        {
          name: 'Facundo Carrillo',
          image: 'https://alkemyong.s3.amazonaws.com/Facundo-Carrillo.jpg',
          content: '¡Somos Mas es una gran organización para trabajar! El personal es muy amable y acogedor, y el trabajo es muy gratificante. Siento que estoy marcando una diferencia en la vida de las personas a las que servimos.',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'Sofia Pedraza',
          image: 'https://alkemyong.s3.amazonaws.com/Sofia-Pedraza.jpg',
          content: 'Trabajar en Somos Más ha sido una experiencia increíblemente gratificante. He tenido la oportunidad de ayudar a marcar la diferencia en la vida de otras personas y ver de primera mano el impacto positivo que ha tenido nuestro trabajo. Es un honor ser parte de una organización que está marcando una diferencia tan positiva en el mundo.',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'Francisco Sosa',
          image: 'https://alkemyong.s3.amazonaws.com/Francisco-Sosa.jpg',
          content: 'Estoy agradecida de haber tenido la oportunidad de trabajar en Somos Mas. Ha sido un privilegio ayudar a apoyar el increíble trabajo que realizan para brindar educación y oportunidades a los niños desfavorecidos de mi barrio. He visto de primera mano la diferencia que Somos Más hace en la vida de estos niños y estoy orgullosa de haber sido parte de ella.',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'Nestor Sastre',
          image: 'https://alkemyong.s3.amazonaws.com/Nestor-Sastre.jpg',
          content: 'Estoy muy agradecida de haber tenido la oportunidad de trabajar en Somos Mas. He aprendido mucho y he tenido la oportunidad de ayudar a muchas personas. He conocido personas increíbles que me han inspirado a seguir haciendo un buen trabajo en el mundo.',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'Maria Pereira',
          image: 'https://alkemyong.s3.amazonaws.com/Maria-Pereira.jpg',
          content: 'Somos Mas me ha dado la oportunidad de ayudar a niños desfavorecidos de mi barrio. He podido ayudarlos a obtener una educación y mejorar su calidad de vida. Estoy muy agradecida por esta oportunidad y continuaré ayudando a estos niños mientras pueda.',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'Clara Rasso',
          image: 'https://alkemyong.s3.amazonaws.com/Clara-Rasso.jpg',
          content: 'Si está buscando un lugar para realmente marcar la diferencia, Somos Más es la organización perfecta para usted. Llevo más de un año trabajando aquí y ha sido una experiencia increíble. Trabajamos con algunas de las poblaciones más vulnerables de la zona y les brindamos los recursos y el apoyo que tanto necesitan. Estoy muy orgulloso de ser parte de esta organización y no puedo imaginarme haciendo otra cosa.',
          createdAt:new Date,
          updatedAt:new Date
        }

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
