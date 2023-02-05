const expressValidator = require("express-validator");
const { body } = expressValidator;

const membersValidator = [
  body("name")    
    .not().isEmpty()
    .withMessage("Por favor escribe un nombre ")
    .isAlpha('es-ES',{ignore: '\s'})
    .withMessage('El nombre solo debe contener Letras'),
  body("image")
    .notEmpty()
      .withMessage('Se necesita una imagen')
        .custom(string => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(string))
          .withMessage('Imagen invalida')
];

module.exports = membersValidator;