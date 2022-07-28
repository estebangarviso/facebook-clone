import { CREATED, UPDATED, DELETED } from '../actions';
import { POSTS, COMMENTS } from '../domains';

const initialState = {
  posts: [],
  comments: []
};

const notifierReducer = (state = initialState, action) => {
  // Use action.type.split('/')[0] to get the first part of the action type (e.g. 'posts')
  // and action.type.split('/')[1] to get the second part of the action type (e.g. 'created')
  const { type, payload } = action;
  const [domain, eventName] = type.split('/');
  switch (domain) {
    case POSTS:
      switch (eventName) {
        case CREATED:
          return {
            ...state,
            posts: [...state.posts, payload]
          };
        case UPDATED:
          return {
            ...state,
            posts: state.posts.map((post) => (post._id === payload._id ? payload : post))
          };
        case DELETED:
          return {
            ...state,
            posts: state.posts.filter((post) => post._id !== payload)
          };
        default:
          return state;
      }
    case COMMENTS:
      switch (eventName) {
        case CREATED:
          return {
            ...state,
            comments: [...state.comments, payload]
          };
        case UPDATED:
          return {
            ...state,
            comments: state.comments.map((comment) => (comment._id === payload._id ? payload : comment))
          };
        case DELETED:
          return {
            ...state,

            comments: state.comments.filter((comment) => comment._id !== payload)
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default notifierReducer;
