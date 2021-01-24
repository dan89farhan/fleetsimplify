// import mongoose from 'mongoose';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    accessToken: {
      type: String
    }
  },
  { timestamps: true },
);


//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  console.log('user', user);
  // return;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;