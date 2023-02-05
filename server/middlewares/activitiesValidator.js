const expressValidator = require("express-validator");
const { body } = expressValidator;

const activitiesValidator = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Por favor escribe un nombre válido"),
  body("content")
    .not()
    .isEmpty()
    .withMessage("Por favor escribe un contenido válido"),
];

module.exports = activitiesValidator;
