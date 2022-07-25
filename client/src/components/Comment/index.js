import React, { useState } from 'react';
import CommentForm from '../CommentForm';
import { List, Box, Avatar, Typography, Link, Stack } from '@mui/material';
import { AppConfig } from './../../app/config';
import { StyledComment } from './StyledComponents';

const Comment = ({ _id: commentId, content, createdAt, post: postId, user, comments, ...otherProps }) => {
  const [showReplies, setShowReplies] = useState(false);
  const replies = comments.filter((comment) => comment.replyTo?._id === commentId);
  const hasReplies = comments.some((comment) => comment.replyTo?._id === commentId);
  return (
    <StyledComment {...otherProps} disablePadding>
      <Box position='relative'>
        {hasReplies && <Box className='node-branch-root' />}
        <Box display='flex' alignItems='center' flexDirection='row' sx={{ width: '100%' }} position='relative'>
          <Avatar
            sx={{ mr: 1, width: '32px', height: '32px', alignSelf: 'start', zIndex: 1 }}
            src={AppConfig.BACKEND_URL + user.avatar}
          />
          <Box sx={{ flex: 1 }}>
            <Box bgcolor='background.comment' sx={{ borderRadius: '5px', py: '8px', px: '12px' }}>
              <Typography color='text.primary' sx={{ fontWeight: 'bold', fontSize: '.8125rem' }}>
                {user?.name}
              </Typography>
              <Typography variant='body2' color='text.primary'>
                {content}
              </Typography>
            </Box>
            <Stack spacing={1} direction='row' alignItems='center' sx={{ '> a': { fontSize: '12px' } }}>
              <Link href='#' variant='caption' color='text.primary'>
                Like
              </Link>
              <Link variant='caption' color='text.primary' onClick={() => setShowReplies(!showReplies)}>
                Reply
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        {replies.map((comment, index, array) => (
          <List sx={{ width: '100%' }} dense disablePadding>
            <Comment key={comment._id} {...comment} comments={comments} className='reply' />
          </List>
        ))}
        {showReplies && (
          <CommentForm user={user} postId={postId} replyTo={commentId} label={`Reply to ${user?.name}...`} popUpError />
        )}
      </Box>
    </StyledComment>
  );
};

export default Comment;
