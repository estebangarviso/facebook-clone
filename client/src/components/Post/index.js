import React, { useContext } from 'react';
import Form from '../Form';
// import { Input, Textarea } from '../Fields';
import GlobalContext from '../../context';
import { TextField, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Post = () => {
  const { auth } = useContext(GlobalContext);
  const isLoggedIn = auth.token !== null;
  return isLoggedIn ? (
    <Form action='/posts' enterSubmit={false}>
      <Box display='flex' flexDirection='column' gap={1}>
        <input type='hidden' name='userId' value={auth.userId} />
        <TextField name='title' type='text' label='Title' required />
        <Box display='flex' flexDirection='row' gap={1}>
          <TextField name='content' label='Content' required multiline rows={3} maxRows={3} fullWidth />
          <Box display='flex' flexDirection='column' alignContent={'center'} justifyContent={'center'}>
            <IconButton type='submit'>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Form>
  ) : (
    <div>You must be logged in to post</div>
  );
};

export default Post;
