import express, { Request, Response } from 'express';
import User from '@models/user.model';
import Post from '@models/post.model';
import Comment from '@models/comment.model';
import Formatter from '@utils/formatter';
import autheticate from '@middlewares/authenticate';
import { RequestWithUser, RequestWithPost } from '@@types/index';
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

router.get('/post', autheticate, (req: Request, res: Response) => {
  const postEntity = new Post();
  const userEntity = new User();
  const posts = postEntity.getCollection();
  const users = userEntity.getCollection();
  // !TODO: use mongo join to get user data and post data

  const postsWithUser = posts.map((post: any) => {
    const user = users.find((user: any) => user.userId === post.userId);
    // Format createdAt to be more readable
    post.createdAt = Formatter.getTimeSince(post.createdAt);
    if (post.updatedAt) {
      post.updatedAt = Formatter.getTimeSince(post.updatedAt);
    }
    return {
      ...post,
      user: {
        name: user.name,
        avatar: user.avatar
      }
    };
  });
  return res.status(200).json(postsWithUser);
});

router.post('/post', autheticate, (req: RequestWithPost, res: Response) => {
  const user = req.headers.user;
  const body = req.body;
  const files = req.files;

  const post = new Post();
  body.userId = user.userId;
  let media = files?.media as UploadedFile;
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

router.post('/post/:id/comment', autheticate, (req: RequestWithPost, res: Response) => {
  const user = req.headers.user;
  const body = req.body;
  const postId = req.params.id;
  const postEntity = new Post();
  const comment = new Comment();
  try {
    const post = postEntity.getDocumentById(postId);
    if (!post) {
      return res.status(404).json({
        message: `Post with id ${postId} not found`
      });
    }
    comment.content = body.content;
    comment.userId = user.userId; // who is commenting
    comment.postId = postId; // what post is being commented on
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
router.get('/post/:id/comment', autheticate, (req: RequestWithUser, res: Response) => {
  const postId = req.params.id;
  const commentEntity = new Comment();
  const comments = commentEntity.getCollection(postId);
  const users = new User().getCollection();
  const commentsWithUser = comments.map((comment: any) => {
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
router.delete('/post/:id/comment/:commentId', autheticate, (req: RequestWithPost, res: Response) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const commentEntity = new Comment();
  const comment = commentEntity.getDocumentById(commentId);
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
