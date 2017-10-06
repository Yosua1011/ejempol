var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
var authHelper = require('../helpers/authHelper')

/* GET users listing. */
router.get('/', authHelper.isLogin, userController.findAllUsers);

router.get('/:id', authHelper.isLogin, authHelper.isUserAuth, userController.findSpecificUser);

// router.post('/signup', userController.registerNewUser)

router.post('/signin', userController.setFBAccessToken, userController.loginUser)

// router.get('/', userController.setFBAccessToken, userController.getUser)

router.delete('/:id', authHelper.isLogin, userController.deleteSpecificUser)

router.put('/:id', authHelper.isLogin, authHelper.isUserAuth, userController.editSpecificUser)

module.exports = router;
