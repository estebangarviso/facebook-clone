import axios, { handleError, handleSuccess } from '../utils/axios';

const ENDPOINT = '/post';

async function getAll() {
  try {
    const res = await axios.get(ENDPOINT);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

async function add(formData) {
  console.log('PostService.add formData', formData);
  try {
    const res = await axios.post(ENDPOINT, formData);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

async function addComment(formData) {
  console.log('PostService.addComment formData', formData);
  try {
    const res = await axios.post(ENDPOINT + '/' + formData.get('postId') + '/comment', formData);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

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
  getAll,
  add,
  addComment,
  getAllCommentsById
};

export default PostService;
