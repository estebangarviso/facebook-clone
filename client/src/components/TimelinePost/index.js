import React, { useContext } from 'react';
import Form from '../Form';
import GlobalContext from '../../context';
import { Box, Paper, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PostService from '../../services/post.service';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import FormButton from '../Form/FormButton';
import FormHiddenField from '../Form/FormHiddenField';
import FormTextField from '../Form/FormTextField';
import FormMediaUploadButton from '../Form/FormMediaUploadButton';
import { Item } from './StyledComponents';

const TimelinePost = () => {
  const { auth } = useContext(GlobalContext);

  const handleSuccess = (data) => {
    console.log(data);
  };

  return (
    auth.token !== null && (
      <Paper sx={{ py: '1rem', px: '1rem' }}>
        <Form
          serviceCallback={PostService.add}
          onSuccess={handleSuccess}
          enterSubmit={false}
          useFormProps={{
            resolver: yupResolver(schema)
          }}>
          <Box display='flex' flexDirection='column' gap={1}>
            <FormHiddenField name='userId' value={auth.userId} />
            <Box display='flex' flexDirection='row' gap={1}>
              <FormTextField name='content' label='Content' required multiline rows={3} maxRows={3} fullWidth />
              <Box display='flex' flexDirection='column' alignContent={'center'} justifyContent={'center'}>
                <FormButton type='submit'>
                  <SendIcon />
                </FormButton>
              </Box>
            </Box>
          </Box>
          <Stack direction='row' alignItems='strech' justifyContent='space-evenly' spacing={2}>
            <Item>
              <FormMediaUploadButton
                name='media'
                label='Photo/Video'
                iconProps={{ sx: { fontSize: '33px', color: 'success.main', backgroundColor: 'dark' } }}
                labelProps={{ sx: { color: 'text.muted' } }}
                sx={{
                  borderRadius: '20px',
                  p: '1rem'
                }}
              />
            </Item>
          </Stack>
        </Form>
      </Paper>
    )
  );
};

export default TimelinePost;
