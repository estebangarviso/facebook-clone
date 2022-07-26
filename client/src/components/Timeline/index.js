import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PostService from '../../services/PostService';
import { useContext } from 'react';
import GlobalContext from '../../context';
import Post from '../Post';
import { AppConfig } from '../../app/config';

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
          connect(auth.currentUser._id);
        } else {
          console.error(res);
          auth.logout();
        }
      })
      .catch((err) => {
        console.error(err);
        auth.logout();
      });
    const connect = (clientId) => {
      const ws = new WebSocket(`${AppConfig.WS_URL}?clientId=${clientId}`);
      ws.addEventListener('open', () => {
        console.log('We are connected');
      });

      ws.addEventListener('message', (e) => {
        e &&
          e.data &&
          e.data.text &&
          e.data
            .text()
            .then((data) => {
              // console.log('got a message: ' + data);
              const parsedData = JSON.parse(data);
              const { type, payload } = parsedData.data;
              if (type === 'post') {
                setPosts((prevPosts) => [payload, ...prevPosts]);
              }
            })
            .catch((err) => console.error(err));
      });
    };
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
