import axios, { handleError, handleSuccess } from '../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const ENDPOINT = '/post';

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  try {
    const res = await axios.get(ENDPOINT);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
});

export const addPost = createAsyncThunk('posts/addPost', add);
async function add(formData) {
  console.log('PostService.add formData', formData);
  try {
    const res = await axios.post(ENDPOINT, formData);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

export const addComment = createAsyncThunk('comments/addComment', async (formData) => {
  console.log('PostService.addComment formData', formData);
  try {
    const res = await axios.post(ENDPOINT + '/' + formData.get('postId') + '/comment', formData);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
});

export const getAllCommentsByPostId = createAsyncThunk('posts/getAllCommentsByPostId', getAllCommentsById);
async function getAllCommentsById(postId) {
  try {
    const res = await axios.get(ENDPOINT + '/' + postId + '/comment');
    console.log('PostService.getAllCommentsById res', res);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

const PostService = {
  add,
  getAllCommentsById
};

export default PostService;
