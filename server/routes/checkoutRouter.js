const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController')

router.post('/', checkoutController.process)

router.get('/success', checkoutController.sucess)

router.get('/pending', checkoutController.pending)

router.get('/cancelled', checkoutController.cancelled)

router.post('/notification', checkoutController.notification)

module.exports = router