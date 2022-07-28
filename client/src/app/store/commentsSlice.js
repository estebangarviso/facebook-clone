import { createSlice, nanoid } from '@reduxjs/toolkit';
import { getAllCommentsByPostId, addComment } from '../../services/PostService';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    status: 'idle', // idle, loading, succeeded, failed
    comments: [],
    error: null // null or error message
  },
  reducers: {
    commentAdded: {
      reducer(state, action) {
        state.comments.push(action.payload);
      },
      prepare(comment) {
        return {
          payload: {
            ...comment,
            _id: nanoid()
          }
        };
      }
    },
    commentUpdated: (state, action) => {
      state.comments = state.comments.map((comment) => (comment._id === action.payload._id ? action.payload : comment));
    },
    commentDeleted: (state, action) => {
      state.comments = state.comments.filter((comment) => comment._id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCommentsByPostId.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllCommentsByPostId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // const loadedComments = action.payload.map((comment) => {
        //   comment.createdAt = new Date(comment.createdAt);
        //   return comment;
        // });
        // state.comments = state.comments.concat(loadedComments);
        const loadedComments = action.payload.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
        state.comments = state.comments.concat(loadedComments);
      })
      .addCase(getAllCommentsByPostId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('comments/add action.payload', action.payload);
        state.comments.push(action.payload);
      });
  }
});

// Selectors
export const selectAllComments = (state) => state.comments.comments;
export const getCommentsStatus = (state) => state.comments.status;
export const getCommentsError = (state) => state.comments.error;
export const selectCommentById = (state, commentId) =>
  state.comments.comments.find((comment) => comment._id === commentId);

// Action creators are generated for each case reducer function
export const { commentAdded, commentUpdated, commentDeleted } = commentsSlice.actions;

export default commentsSlice.reducer;
