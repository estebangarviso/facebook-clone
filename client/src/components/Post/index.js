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
  Stack,
  Skeleton
} from '@mui/material';
import { MoreVert as MoreVertIcon, Comment as CommentIcon } from '@mui/icons-material';
import { AppConfig } from '../../app/config';
import Comments from '../Comments';

const Post = ({ _id, user, createdAt, content, media, loading }) => {
  const [showComments, setShowComments] = useState(false);
  const handleComment = () => {
    setShowComments(!showComments);
  };
  return (
    <Card
      key={_id}
      style={{ marginBottom: '1rem' }}
      sx={{
        '.MuiCardHeader-avatar .MuiSkeleton-root, .MuiCardHeader-avatar .MuiAvatar-root': {
          width: '40px',
          height: '40px'
        }
      }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation='wave' variant='circular' />
          ) : (
            <Avatar aria-label='avatar' src={AppConfig.BACKEND_URL + user.avatar} />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={loading ? <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} /> : user.name}
        subheader={loading ? <Skeleton animation='wave' height={10} width='40%' /> : createdAt}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {loading ? (
            <>
              <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation='wave' height={10} width='80%' />
            </>
          ) : (
            content
          )}
        </Typography>
      </CardContent>
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation='wave' variant='rectangular' />
      ) : (
        media && (
          <CardMedia
            image={AppConfig.BACKEND_URL + media}
            component='div'
            sx={{
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              minWidth: '500px',
              width: 'auto',
              height: '280px'
            }}
          />
        )
      )}
      {loading ? null : (
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
      )}
      {showComments && (
        <CardContent sx={{ px: 0 }}>
          <Comments postId={_id} />
        </CardContent>
      )}
    </Card>
  );
};

export default Post;
