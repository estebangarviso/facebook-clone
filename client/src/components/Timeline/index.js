import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardHeader, CardContent, CardMedia, IconButton, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimelineSkeleton from './TimelineSkeleton';
import PostService from '../../services/post.service';
import { useContext } from 'react';
import GlobalContext from '../../context';

const Timeline = () => {
  const { auth } = useContext(GlobalContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    PostService.getAll()
      .then((res) => {
        console.log({ res });
        if (res.success) {
          setPosts(res.posts);
        }
      })
      .catch((err) => {
        console.error(err);
        auth.logout();
      });
  }, []);

  return posts ? (
    <Box sx={{ py: 4 }}>
      {posts.map((post) => (
        <Card key={post.postId} style={{ marginBottom: '1rem' }}>
          <CardHeader
            avatar={<Avatar aria-label='recipe' src={post.user.avatar} />}
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title={post.user.name}
            subheader={post.createdAt}
          />
          {post.image && (
            <CardMedia image={post.image} title={post.title} style={{ height: '200px' }} component='img' />
          )}
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {post.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  ) : (
    <Box sx={{ py: 4 }}>
      <TimelineSkeleton />
    </Box>
  );
};

export default Timeline;
