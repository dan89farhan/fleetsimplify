var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

var userValidators = require('../validators/user_validators');

/* GET home page. */
// router.get('/', userController.index);
router.post('/register', userValidators.register, userController.create);

/** For login */
router.post('/login', userValidators.login, userController.authenticateUser);

module.exports = router;
