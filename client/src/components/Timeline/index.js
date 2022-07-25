import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PostService from '../../services/PostService';
import { useContext } from 'react';
import GlobalContext from '../../context';
import Post from '../Post';

const Timeline = () => {
  const { auth } = useContext(GlobalContext);
  const [posts, setPosts] = useState([
    {
      id: 1,
      loading: true
    },
    {
      id: 2,
      loading: true
    },
    {
      id: 3,
      loading: true
    }
  ]);

  useEffect(() => {
    PostService.getAll()
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        } else {
          console.error(res);
          auth.logout();
        }
      })
      .catch((err) => {
        console.error(err);
        auth.logout();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </Box>
  );
};

export default Timeline;
