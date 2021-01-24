var mongoose = require('mongoose');

var UserModel = require('./UserModel');
var PostModel = require('./PostModel');
var LikePostModel = require('./LikePostModel');
var FollowerModel = require('./FollowerModel');

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
};

const models = { UserModel, PostModel, LikePostModel, FollowerModel };

module.exports = {
  connectDb: connectDb,
  models: models,
};