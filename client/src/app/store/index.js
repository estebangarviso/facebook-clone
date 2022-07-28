// refs: https://redux.js.org/tutorials/essentials/part-4-using-data#editing-posts
//      https://github.com/ivantsov/yandex-mail-notifier/blob/master/src/pages/background/redux/store.js
//      https://github.com/ivantsov/yandex-mail-notifier/blob/a3700f9cad9aa206e6ef4fbd35c08ee02f5fcbe5/src/pages/background/modules/websocket/index.js
import { configureStore } from '@reduxjs/toolkit';
import initSubscriber from 'redux-subscriber';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import postsReducer from './postsSlice';
import commentsReducer from './commentsSlice';
import themeReducer from './themeSlice';

// Middleware you want to use by NODE_ENV:
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
middlewares.push(thunk);

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    theme: themeReducer
  },
  middleware: middlewares,
  devTools: process.env.NODE_ENV === 'development'
});

initSubscriber(store);

export default store;
