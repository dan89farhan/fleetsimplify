const { check, sanitizeBody } = require('express-validator');
var db = require('../models/index');
exports.register = [
    check('name').trim().notEmpty().withMessage('Name required'),
    
    // email address validation
    check('email')
        .notEmpty()
        .withMessage('Email Address required')
        .normalizeEmail()
        .isEmail()
        .withMessage('must be a valid email')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                var userModel = db.models.UserModel;
                userModel.findOne({ email: req.body.email }, function (err, user) {
                    if (err) {
                        reject(new Error('Server Error'))
                    }
                    if (Boolean(user)) {
                        reject(new Error('E-mail already in use'))
                    }
                    resolve(true)
                });
            });
        }),
    // password validation
    check('password').trim().notEmpty().withMessage('Password required').isLength({ max: 15 }),

];

exports.login = [
    // email address validation
    check('email')
        .notEmpty()
        .withMessage('Email Address required')
        .normalizeEmail()
        .isEmail()
        .withMessage('must be a valid email'),

    // password validation
    check('password').trim().notEmpty().withMessage('Password required').isLength({ max: 15 }),
];