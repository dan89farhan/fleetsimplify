var db = require('../models');

exports.follower = async function (req, res, next) {

    const user = req.user;

    const postId = req.params.id;

    const comment = req.body.comment;

    var data = {
        user: user._id,
        post: postId,
        comment: comment
    };


    try {


        var commentModel = db.models.CommentModel;
        var newCommentModel = new commentModel(data);
        const commentPost = await newCommentModel.save();
        return res.status(200).json({ commentPost: commentPost });

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

