var db = require('../models');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.index = function (req, res, next) {
    res.send('respond with a resource');
}


exports.create = async function (req, res, next) {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    var userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        var userModel = db.models.UserModel;
        var newUser = new userModel(userData);
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        const user = await newUser.save();
        return res.status(200).json({ user: user });
    } catch (error) {
        console.log('error ', error);
        return res.status(403).json(
            {
                error: error,
                'message': 'Error Occurred'
            }
        );
    }

}

exports.authenticateUser = async function (req, res, next) {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }
    try {
        let user = await db.models.UserModel.authenticate(req.body.email, req.body.password);
        // console.log('user', user);
        if (user) {
            const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            user = await db.models.UserModel.findByIdAndUpdate(user._id, { accessToken }, { new: true }).exec();
            return res.status(200).json({ user: user });
        }
        else {
            res.status(401).json({ message: 'unauthorized user' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error occured ' + error });
    }
}