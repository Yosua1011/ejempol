var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
var authHelper = require('../helpers/authHelper')

/* GET users listing. */

router.post('/signin', userController.setFBAccessToken, authHelper.isLogin, userController.loginUser)

module.exports = router;
