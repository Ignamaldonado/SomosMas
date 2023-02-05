const expressValidator = require("express-validator");
const { body } = expressValidator;

const contactsValidator = [
    body("name")
        .not()
        .isEmpty()
        .withMessage("Por favor escribe un nombre válido"),
    body("email")
        .isEmail()
        .withMessage("Por favor escribe un email válido"),
    body("phone")
        .not()
        .isEmpty()
        .withMessage("Por favor escribe un número de contacto válido"),
    body("message")
        .not()
        .isEmpty()
        .withMessage("Por favor escribe un mensaje válido"),
];

const responseValidator = [
    body("email")
        .isEmail()
        .withMessage("Por favor escribe un email válido"),
    body("subject")
        .not()
        .isEmpty()
        .withMessage("Por favor escribe un asunto válido"),
    body("message")
        .not()
        .isEmpty()
        .withMessage("Por favor escribe un mensaje válido"),
];

module.exports = {contactsValidator, responseValidator};
