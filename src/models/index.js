var mongoose = require('mongoose');

var UserModel = require('./UserModel');

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
};

const models = { UserModel };

module.exports = {
  connectDb: connectDb,
  models: models,
};