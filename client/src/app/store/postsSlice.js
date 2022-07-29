import { createSlice } from '@reduxjs/toolkit';
import { getPosts, addPost, postsApi } from '../../services/PostService';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    hasMore: true,
    pageNumber: 0,
    pageSize: 0,
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
    },
    // Add the generated reducer as a specific top-level slice
    [postsApi.reducerPath]: postsApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // const loadedPosts = action.payload.map((post) => {
        //   post.createdAt = new Date(post.createdAt);
        //   return post;
        // });
        // state.posts = state.posts.concat(loadedPosts);
        // const loadedPosts = posts.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1)); // sorted from backend
        state.posts = action.payload.posts;
        state.hasMore = action.payload.hasMore;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(getPosts.rejected, (state, action) => {
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
export const selectPosts = (state) => state.posts.posts;
export const selectHasMore = (state) => state.posts.hasMore;
export const selectPageNumber = (state) => state.posts.pageNumber;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post._id === postId);

// Action creators are generated for each case reducer function
export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;
