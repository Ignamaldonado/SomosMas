const expressValidator = require("express-validator");
const { body } = expressValidator;

const categoriesValidator = [
    body("name")
        .isString().bail()
        .notEmpty()
        .withMessage("Por favor ingresa el nombre de la categoría")
];

module.exports = categoriesValidator;