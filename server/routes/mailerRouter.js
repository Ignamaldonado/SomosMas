const express = require('express')
const router = express.Router()
const mailerController = require('../controllers/mailerController')
const { body } = require('express-validator')

const emailValidations = [
    body('to').isEmail().withMessage('Debes completar el campo con un email'),
    body('subject').notEmpty().withMessage('Debes completar el campo razon'),
    body('text').notEmpty().withMessage('Debes completar el campo de texto'),
]


router.get('/', mailerController.home)

router.post('/send', emailValidations, mailerController.send)

module.exports = router