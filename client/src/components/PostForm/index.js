import React from 'react';
import Form from '../Form';
import { Box, Paper, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PostService from '../../services/PostService';
import schema from './schema';
import FormButton from '../Form/FormButton';
import FormTextField from '../Form/FormTextField';
import FormMediaUploadButton from '../Form/FormMediaUploadButton';

const PostForm = () => {
  return (
    <Paper sx={{ py: '1rem', px: '1rem' }}>
      <Form serviceCallback={PostService.add} validationSchema={schema} popUpError>
        <Box display='flex' flexDirection='column' gap={1}>
          <Box display='flex' flexDirection='row' gap={1}>
            <FormTextField name='content' label='Content' required multiline rows={3} maxRows={3} fullWidth />
            <Box display='flex' flexDirection='column' alignContent={'center'} justifyContent={'center'}>
              <FormButton type='submit'>
                <SendIcon />
              </FormButton>
            </Box>
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
      </Form>
    </Paper>
  );
};

export default PostForm;
