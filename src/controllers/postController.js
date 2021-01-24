var db = require('../models');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.create = async function (req, res, next) {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    const user = req.user;

    var postData = {
        title: req.body.title,
        description: req.body.description,
        user: user._id,
    }

    try {
        var postModel = db.models.PostModel;
        var newPost = new postModel(postData);
        const post = await newPost.save();
        return res.status(200).json({ post: post });
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

exports.get = async function (req, res, next) {
    try {
        const posts = await db.models.PostModel.find({ user: req.user._id }).exec();
        console.log('posts', posts);
        return res.status(200).json({
            posts: posts,
        });
    } catch (error) {
        return res.status(200).json({
            error: error.message
        });
    }
}

exports.edit = async function (req, res, next) {
    try {

        const whereQuery = { _id: req.params.id, user: req.user._id };
        const post = await db.models.PostModel.findByIdAndUpdate(whereQuery, req.body, { new: true }).exec();
        return res.status(200).json({
            post: post,
        });
    } catch (error) {
        return res.status(200).json({
            error: error.message
        });
    }
}

exports.delete = async function (req, res, next) {
    try {

        const whereQuery = { _id: req.params.id, user: req.user._id };
        const post = await db.models.PostModel.findByIdAndDelete(whereQuery).exec();
        return res.status(200).json({
            post: post,
        });
    } catch (error) {
        return res.status(200).json({
            error: error.message
        });
    }
}

exports.likePost = async function (req, res, next) {

    const user = req.user;

    const postId = req.params.id;

    var likePostData = {
        user: user._id,
        post: postId,
    };


    try {

        const whereQuery = { post: req.params.id, user: req.user._id };
        let likePost = await db.models.LikePostModel.findOne(whereQuery).exec();
        if (likePost) {
            likePost = await db.models.LikePostModel.findByIdAndDelete({_id: likePost._id}).exec();
            return res.status(200).json({
                likePost: likePost,
            });
        } else {
            var likeModel = db.models.LikePostModel;
            var newLikePost = new likeModel(likePostData);
            const likePost = await newLikePost.save();
            return res.status(200).json({ likePost: likePost });
        }

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

