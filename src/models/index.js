var mongoose = require('mongoose');

var UserModel = require('./UserModel');
var PostModel = require('./PostModel');

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
};

const models = { UserModel, PostModel };

module.exports = {
  connectDb: connectDb,
  models: models,
};