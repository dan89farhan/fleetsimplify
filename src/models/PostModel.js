
var mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      //   unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  },
  { timestamps: true },
);


const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;