var db = require('../models');

exports.follower = async function (req, res, next) {

    const user = req.user;

    const followedby_userid = req.params.id;

    var followersData = {
        follow_userid: user._id,
        followedby_userid: followedby_userid,
    };


    try {

        if(user._id == followedby_userid){
            throw new Error('User can not follow to itself');
        }

        let userRes = await db.models.UserModel.findById(followedby_userid).exec();
        if(!userRes){
            throw new Error('User Does not exists');
        }

        const whereQuery = followersData;
        let follower = await db.models.FollowerModel.findOne(whereQuery).exec();
        if (follower) {
            follower = await db.models.FollowerModel.findByIdAndDelete({_id: follower._id}).exec();
            return res.status(200).json({
                follower: follower,
            });
        } else {
            follower = db.models.FollowerModel;
            var newFollower = new follower(followersData);
            const newFollowerData = await newFollower.save();
            return res.status(200).json({ follower: newFollowerData });
        }

    } catch (error) {
        console.log('error ', error.message);
        return res.status(200).json(
            {
                error: error.message,
                'message': 'Error Occurred'
            }
        );
    }

}

