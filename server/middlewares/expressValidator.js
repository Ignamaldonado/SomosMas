const { body } = require('express-validator');
const db = require('../models');
const User = db.User

const login = [
    body("email").isEmail().withMessage("Por favor escribe un email válido"),
    body("password").isLength({ min: 4 }).withMessage("Su contraseña debe tener al menos 4 caracteres")
];

const register = [
    body('firstName').isLength({min:2}).withMessage('El nombre es requerido y debe tener mas de dos caracteres'),
    body('lastName').isLength({min:2}).withMessage('El apellido es requerido y debe tener mas de dos caracteres'),  
    body('email').isEmail().withMessage('El formato de Email debe ser válido'),
    body('email').custom( async (value) =>{
        let email = value ? value : 0
        if (await User.findOne({ where: { email } })) {
            return false
        }else{return true}
    }).withMessage('El usuario ingresado ya existe'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener minimo 6 caracteres')
];

module.exports = {login, register};
