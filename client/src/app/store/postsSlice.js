import { createSlice } from '@reduxjs/toolkit';
import { getAllPosts, addPost } from '../../services/PostService';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    status: 'idle', // idle, loading, succeeded, failed
    posts: [],
    error: null // null or error message
  },
  reducers: {
    postAdded: (state, action) => {
      state.posts.unshift(action.payload);
    },
    postUpdated: (state, action) => {
      state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    },
    postDeleted: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // const loadedPosts = action.payload.map((post) => {
        //   post.createdAt = new Date(post.createdAt);
        //   return post;
        // });
        // state.posts = state.posts.concat(loadedPosts);
        const loadedPosts = action.payload.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('posts/add action.payload', action.payload);
        state.posts.push(action.payload);
      });
  }
});

// Selectors
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post._id === postId);

// Action creators are generated for each case reducer function
export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;
