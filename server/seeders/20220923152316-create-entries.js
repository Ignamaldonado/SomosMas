'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Entries', [
      {
        name: 'Brindaremos apoyo escolar a alumnos de secundario',
        content: 
`Las clases serán de inglés, matemática y lengua y estarán destinadas a alumnos de nivel secundario. Se desarrollarán en el Dispositivo Territorial Comunitario (DTC) de barrio San Benito, los sábados, de 11 a 13.

Al respecto, María Juncosa, directora del edificio municipal de barrio San Benito, afirmó que “el objetivo de llevar adelante esta iniciativa, es acompañar a aquellos jóvenes que adeudan materias del secundario. Buscamos, de esta manera, poder brindar diferentes servicios que beneficien y respondan a las necesidades de los vecinos”.

Es importante destacar que, quienes estén interesados en participar de las clases sólo deben asistir al edificio municipal para inscribirse.

El apoyo escolar consiste en brindar diferentes herramientas útiles de estudio para aquellas personas a quienes les cuesta aprobar las materias. No busca la excelencia, pero sí la facilidad para retener información.

Tiene como finalidad proporcionar, a los alumnos, un complemento más sencillo a la educación tradicional. Su objetivo, además, es rellenar los huecos que deja la formación del centro escolar.`,

        image: 'https://alkemyong.s3.amazonaws.com/apoyo-escolar-3-1-1024x575 Cropped.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Higiene personal para niños',
        content: 

`Somos mas llevó a cabo una campaña de higiene personal para niños. La campaña tuvo como objetivo promover buenos hábitos de higiene entre los niños. Las actividades realizadas durante la campaña incluyeron un concurso de elaboración de cartulinas, un quiz sobre higiene personal y una demostración sobre cómo lavarse las manos correctamente. Los niños también recibieron kits de higiene que consisten en un cepillo de dientes, pasta de dientes, jabón y una toalla.

La campaña fue un éxito, los niños mostraron un gran interés en las actividades y aprendieron sobre la importancia de la higiene personal. La campaña contribuirá en gran medida a promover buenos hábitos de higiene entre los niños y les ayudará a mantenerse sanos y limpios.

Se espera que esta campaña marque una diferencia real en la vida de los niños de la comunidad y los ayude a mantenerse saludables y prosperar.`,
        
        image: 'https://alkemyong.s3.amazonaws.com/UNDP-Peru-2016_kids_washing_hands_30882271066 Cropped.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: '¡Aprendemos a reciclar!',
        content:
`Somos Mas ha lanzado una campaña de educación ambiental y reciclaje para niños. La campaña tiene como objetivo educar a los niños sobre la importancia de reciclar y preservar nuestro medio ambiente. Esperamos inculcarles un sentido de responsabilidad por el medio ambiente e inspirarlos a tomar medidas para protegerlo.

La campaña comienza con una serie de actividades divertidas e interactivas que introducen a los niños a los conceptos de reciclaje y protección del medio ambiente. Aprenderán sobre las diversas formas en que pueden reciclar materiales y la importancia de hacerlo. También se les enseñará sobre los efectos nocivos de la contaminación y cómo se puede prevenir.

Después de las actividades iniciales, los niños realizarán una excursión a una planta de reciclaje local. Verán de primera mano cómo se clasifican y procesan los materiales reciclables. También aprenderán sobre las diferentes formas en que se pueden utilizar los materiales reciclados.

La campaña culminará con un concurso en el que se pedirá a los niños que presenten su propio proyecto de reciclaje. El proyecto ganador será implementado por nuestra ONG, con la ayuda de los niños.

Esperamos que a través de esta campaña podamos inculcar en los niños el amor y el respeto por nuestro medio ambiente, y el deseo de hacer su parte para preservarlo.`,
        
        image: 'https://alkemyong.s3.amazonaws.com/48361815_1950594598349405_886395067080638464_n.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Nadie merece pasar una noche con hambre',
        content:

`Somos Mas proporciona comidas para personas sin hogar que viven en las calles. Creemos que nadie debería pasar hambre y estamos comprometidos a ayudar a los necesitados. Brindamos una comida caliente y un almuerzo en bolsa a cada persona que servimos. Nuestros voluntarios son el corazón de nuestra organización y su misión es garantizar que todas las personas a las que servimos se sientan valoradas y respetadas.

Cada día, nuestros voluntarios salen a la comunidad para servir nuestras comidas. Llegan a conocer a las personas a las que sirven y establecen relaciones con ellas. Ofrecen una cara amistosa y un oído que escucha, y le hacen saber a la gente que no están solos. Nuestros voluntarios marcan la diferencia en la vida de las personas a las que sirven y hacen de nuestra comunidad un lugar mejor.

Si estás interesado en ser voluntario con nosotros, por favor contáctanos. ¡Nos encantaría que te unas a nuestro equipo!`,

        image: 'https://alkemyong.s3.amazonaws.com/Recorridas-nocturnas-CABA-1 Cropped.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date,
        updatedAt: new Date
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
