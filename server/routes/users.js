const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validator = require('../middlewares/expressValidator');
const jwtEmailValidator = require('../middlewares/jwtEmailValidator');
const jwtValidator = require('../middlewares/jwtValidator');

//GET list of all users.
router.get('/', userController.listAllUsers);

/* POST route to authenticate user to login */
router.post('/auth/login', validator.login , userController.login);
router.post('/auth/register', validator.register ,userController.register);

router.post('/auth/checkEmail' , userController.checkEmail);
router.post('/auth/checkPassword' , userController.checkPassword);

router.put('/:id', userController.update)
router.put('/changeRole/:id', userController.changeRoleId)

/* DELETE route to soft-delete a user */
router.delete('/:id', jwtValidator, userController.delete);

router.get('/auth/confirmemail/', jwtValidator, userController.sendEmailConfirmation)
router.get('/auth/confirmemail/:token', jwtEmailValidator, userController.emailConfirmation)









module.exports = router;

