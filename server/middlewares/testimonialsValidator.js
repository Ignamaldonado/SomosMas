const expressValidator = require('express-validator')
const { body } = expressValidator

const testimonialsValidator = [
    body("name")
    .not().isEmpty().withMessage("Por favor complete el campo nombre"),
    body("content")
    .not().isEmpty().withMessage("Por favor escriba el contenido del testimonio")
]

module.exports = testimonialsValidator