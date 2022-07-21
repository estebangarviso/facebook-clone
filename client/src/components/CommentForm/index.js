import React from 'react';
import Form from '../Form';
import FormTextField from '../Form/FormTextField';
import FormButton from '../Form/FormButton';
import { Box, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import schema from './schema';
import PostService from '../../services/PostService';

const CommentForm = ({ postId, replyTo = undefined, label = 'Write a comment...', ...otherProps }) => {
  const handleServiceCallback = async (formData) => {
    // add post id to form data
    formData.append('postId', postId);
    // add reply id to form data
    if (replyTo) {
      formData.append('replyTo', replyTo);
    }
    // send form data to server
    const res = await PostService.addComment(formData);
    return res;
  };
  return (
    <Box display='flex' flexDirection='row' {...otherProps}>
      <Avatar sx={{ mr: '1rem' }} />
      <Form serviceCallback={handleServiceCallback} validationSchema={schema}>
        <Box display='flex' flexDirection='row' gap={1}>
          <FormTextField
            name='content'
            label={label}
            required
            multiline
            size='small'
            variant='filled'
            fullWidth
            InputProps={{ sx: `border-radius: 18px;` }}
          />
        </Box>
      </Form>
    </Box>
  );
};

export default CommentForm;
