
var mongoose = require('mongoose');

const followerSchema = new mongoose.Schema(
    {
        follow_userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        followedby_userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true },
);

const FollowerModel = mongoose.model('Follower', followerSchema);

module.exports = FollowerModel;