var express = require('express');
var router = express.Router();
var adminDashboardController = require('../controllers/adminDashboardController');

/* GET home page. */
router.get('/', adminDashboardController.index);




module.exports = router;
