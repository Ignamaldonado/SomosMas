
const express = require('express')
const router = express.Router()

const organizationController = require('../controllers/organizationController.js')
// const organizationValidator = require('../middlewares/organizationValidator')

router.get('/', organizationController.get)
router.put('/', organizationController.update)

module.exports = router
