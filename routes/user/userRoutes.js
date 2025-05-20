const express = require('express');
const asyncHandler = require('express-async-handler');
const { registerUser } = require('../../controllers/user/userController');
const { loginUser } = require('../../controllers/user/userController');
const { getCurrentUser } = require('../../controllers/user/userController');
const { validateTokenHandler } = require('../../middleware/validateTokenHandler');


const router = express.Router();

router.post( '/register', registerUser);

router.post('/login',  loginUser); 

router.get('/current', validateTokenHandler, getCurrentUser); 

module.exports = router;



