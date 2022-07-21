import express from 'express';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';
import Formatter from '../utils/formatter.js';
import autheticate from '../middlewares/authenticate.js';
import handleDB from '../middlewares/handleDB.js';
import PostUseCases from '../use-cases/post.use-cases.js';

dotenv.config({ path: './../.env' });

const router = express.Router();

router.get('/post', autheticate, handleDB(PostUseCases));

router.post('/post', autheticate, (req, res) => {
  const user = req.headers.user;
  const body = req.body;
  const files = req.files;

  const post = new Post();
  body.userId = user.userId;
  let media = files?.media;
  try {
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    if (media) {
      const fileName = `${user.userId}-${Date.now()}-${media.name}`;
      media.mv('./public/uploads/posts/' + fileName);
      body.media = '/uploads/posts/' + fileName;
    }

    console.log({ user, body, files });
    post.media = body.media;
    post.content = body.content;
    post.userId = body.userId;
    post.save();
    return res.status(200).json({
      message: `Post created by user with email ${user.email}`
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error creating post by user with email ${user.email}`
    });
  }
});

router.post('/post/:id/comment', autheticate, (req, res) => {
  const user = req.headers.user;
  const body = req.body;
  const postId = req.params.id;
  const postEntity = new Post();
  const comment = new Comment();
  try {
    const post = postEntity.read(postId);
    if (!post) {
      return res.status(404).json({
        message: `Post with id ${postId} not found`
      });
    }
    comment.content = body.content;
    comment.userId = user.userId; // who is commenting
    comment.postId = postId;
    comment.replyTo = body.replyTo;
    comment.save();
    return res.status(200).json({
      message: `Comment created by user with email ${user.email}`
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error creating comment by user with email ${user.email}`
    });
  }
});

// get all comments for a post
router.get('/post/:id/comment', autheticate, (req, res) => {
  const postId = req.params.id;
  const commentEntity = new Comment();
  const comments = commentEntity.readAll(postId);
  const users = new User().readAll();
  const commentsWithUser = comments.map((comment) => {
    const user = users.find((user) => user.userId === comment.userId);
    // Format createdAt to be more readable
    comment.createdAt = Formatter.getTimeSince(comment.createdAt);
    if (comment.updatedAt) {
      comment.updatedAt = Formatter.getTimeSince(comment.updatedAt);
    }
    return {
      ...comment,
      user: {
        name: user.name,
        avatar: user.avatar
      }
    };
  });
  return res.status(200).json({ success: true, comments: commentsWithUser });
});

// delete a comment
router.delete('/post/:id/comment/:commentId', autheticate, (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const commentEntity = new Comment();
  const comment = commentEntity.read(commentId);
  if (!comment) {
    return res.status(404).json({
      message: `Comment with id ${commentId} not found`
    });
  }
  if (comment.userId !== req.headers.user.userId) {
    return res.status(401).json({
      message: `You are not authorized to delete this comment`
    });
  }
  commentEntity.delete(commentId);
  return res.status(200).json({
    message: `Comment with id ${commentId} deleted`
  });
});

export default router;
