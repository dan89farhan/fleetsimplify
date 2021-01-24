const { check, sanitizeBody } = require('express-validator');
var db = require('../models/index');
exports.create = [
    check('title').trim().notEmpty().withMessage('Title required'),

    check('description').trim().notEmpty().withMessage('Description required'),
];