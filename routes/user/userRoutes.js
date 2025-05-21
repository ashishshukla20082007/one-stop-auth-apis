const express = require('express');
const asyncHandler = require('express-async-handler');
const { registerUser } = require('../../controllers/user/userController');
const { loginUser } = require('../../controllers/user/userController');
const { getCurrentUser } = require('../../controllers/user/userController');
const { validateTokenHandler } = require('../../middleware/validateTokenHandler');
const { userForgotPassword, userResetPassword } = require('../../controllers/user/userPasswordController');

const router = express.Router();

router.post( '/register', registerUser);

router.post('/login',  loginUser);

router.post('/forgot-password',  userForgotPassword); 

router.post('/reset-password/:token',  userResetPassword); 

router.get('/current', validateTokenHandler, getCurrentUser); 

module.exports = router;



