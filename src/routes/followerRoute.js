var express = require('express');
var router = express.Router();
var followerController = require('../controllers/followerController');

// router.get('/', followerController.get);

router.post('/follower/:id', followerController.follower);


module.exports = router;
