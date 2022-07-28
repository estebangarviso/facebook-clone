import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { getAllPosts } from '../../services/PostService';
import Post from '../Post';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, getPostsStatus, getPostsError } from '../../app/store/postsSlice';

const Timeline = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(getAllPosts());
    }
  }, [postStatus, dispatch]);

  if (postStatus === 'failed') {
    return <Box>{error}</Box>;
  }

  return (
    <Box sx={{ py: 4 }}>
      {posts.map((post) => (
        <Post key={post._id} {...post} loading={postStatus === 'loading'} />
      ))}
    </Box>
  );
};

export default Timeline;
