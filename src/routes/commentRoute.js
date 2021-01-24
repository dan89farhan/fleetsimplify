var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentController');

router.post('/:id', commentController.follower);


module.exports = router;
