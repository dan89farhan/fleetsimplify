var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');

var postValidators = require('../validators/postValidators');

router.post('/create', postValidators.create, postController.create);

router.post('/post/:id', postController.get);
router.post('/edit/:id', postController.edit);

router.post('/delete/:id', postController.delete);


module.exports = router;
