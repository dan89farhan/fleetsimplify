var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

var userValidators = require('../validators/user_validators');

/* GET home page. */
// router.get('/', userController.index);
router.post('/create', userValidators.register, userController.create);

module.exports = router;
