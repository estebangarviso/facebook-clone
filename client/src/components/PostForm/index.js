import React, { useContext } from 'react';
import Form from '../Form';
import { Box, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import PostService from '../../services/PostService';
import schema from './schema';
import FormTextField from '../Form/FormTextField';
import FormMediaUploadButton from '../Form/FormMediaUploadButton';
import FormButton from '../Form/FormButton';
import GloabaContext from '../../context';

const PostForm = () => {
  const { auth } = useContext(GloabaContext);
  return (
    <>
      <Paper sx={{ py: '1rem', px: '1rem' }}>
        <Form serviceCallback={PostService.add} validationSchema={schema} popUpError>
          <Box display='flex' flexDirection='column' gap={1}>
            <Box display='flex' flexDirection='row' gap={1}>
              <FormTextField
                name='content'
                label={`What's on your mind, ${auth.currentUser?.name?.first}`}
                required
                multiline
                fullWidth
              />
            </Box>
          </Box>
          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={0.5}>
            <FormMediaUploadButton
              name='media'
              label='Photo/Video'
              iconProps={{ sx: { fontSize: '33px', color: 'success.main', backgroundColor: 'dark' } }}
              labelProps={{ sx: { color: 'grey.500', ml: '.5rem' } }}
              sx={{
                borderRadius: '5px',
                textTransform: 'none'
              }}
              variant='text'
              fullWidth
            />
          </Stack>
          <Box sx={{ width: '100%', display: 'flex' }}>
            <FormButton type='submit' variant='contained' color='primary' sx={{ width: '100%' }}>
              Post
            </FormButton>
          </Box>
        </Form>
      </Paper>
      <Dialog open={false}>
        <DialogTitle>Create post</DialogTitle>
        <DialogContent>
          <DialogContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostForm;
