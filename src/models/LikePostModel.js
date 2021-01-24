
var mongoose = require('mongoose');

const likePostSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
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

const LikePostModel = mongoose.model('LikePost', likePostSchema);

module.exports = LikePostModel;