const expressValidator = require('express-validator')
const { body } = expressValidator

const newsValidator = [
    body("name")
        .not().isEmpty()
        .withMessage("Por favor escribe un nombre válido"),
    body("content")
        .not().isEmpty()
        .withMessage("Por favor escribe un contenido válido"),
    // body("image")
    //     .not().isEmpty()
    //     .withMessage("Por favor ingresa una imagen válida"),
    body("categoryId")
        .not().isEmpty()
        .withMessage("Por favor ingresa un categoryId válido")
]

module.exports = newsValidator
