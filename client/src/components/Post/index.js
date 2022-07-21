import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Avatar,
  Stack
} from '@mui/material';
import { MoreVert as MoreVertIcon, Comment as CommentIcon } from '@mui/icons-material';
import { AppConfig } from '../../app/config';
import Comments from '../Comments';

const Post = ({ postId, user, createdAt, content, media }) => {
  const [showComments, setShowComments] = useState(false);
  const handleComment = () => {
    setShowComments(!showComments);
  };
  return (
    <Card key={postId} style={{ marginBottom: '1rem' }}>
      <CardHeader
        avatar={<Avatar aria-label='avatar' src={AppConfig.BACKEND_URL + user.avatar} />}
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={createdAt}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {content}
        </Typography>
      </CardContent>
      {media && <CardMedia image={AppConfig.BACKEND_URL + media} style={{ height: '200px' }} component='img' />}
      <CardActions disableSpacing>
        <Stack spacing={1}>
          <IconButton aria-label='comment' sx={{ borderRadius: '5px' }} onClick={handleComment}>
            <CommentIcon />
            <Typography variant='body2' color='textSecondary' component='p'>
              Comment
            </Typography>
          </IconButton>
        </Stack>
      </CardActions>
      {showComments && (
        <CardContent sx={{ px: 0 }}>
          <Comments postId={postId} />
        </CardContent>
      )}
    </Card>
  );
};

export default Post;
