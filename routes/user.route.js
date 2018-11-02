const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user.controller');

router.post('/signup', UsersController.user_signup);

router.post('/signin', UsersController.user_signin);

module.exports = router;