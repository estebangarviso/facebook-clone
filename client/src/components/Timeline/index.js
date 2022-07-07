import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardHeader, CardContent, CardMedia, IconButton, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimelineSkeleton from './TimelineSkeleton';
import { AppConfig } from '../../app/config';
import { AppRoutes } from '../../app/routes';
import PostService from '../../services/post.service';

const Timeline = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    PostService.getAll()
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return posts ? (
    <Container
      maxWidth='lg'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1rem',
        width: '100%'
      }}>
      {posts.map((post) => (
        <Card key={post.postId} style={{ width: '80vw', marginBottom: '1rem' }}>
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
    </Container>
  ) : (
    <TimelineSkeleton />
  );
};

export default Timeline;
