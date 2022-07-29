import React, { useContext, useState, useEffect, useRef } from 'react';
import Form from '../Form';
import {
  Box,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Button
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PostService from '../../services/PostService';
import schema from './schema';
import FormInputBase from '../Form/FormInputBase';
import FormMediaUploadButton from '../Form/FormMediaUploadButton';
import FormButton from '../Form/FormButton';
import GloabaContext from '../../context';

const PostForm = () => {
  const descriptionElementRef = useRef();
  const [open, setOpen] = useState(false);
  const { auth } = useContext(GloabaContext);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        console.log();
      }
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper sx={{ py: '1rem', px: '1rem' }}>
        <Button onClick={() => setOpen(true)}>Add Post</Button>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        fullWidth
        maxWidth='sm'
        aria-labelledby='post-form-dialog-title'
        aria-describedby='post-form-dialog-description'
        PaperComponent={Form}
        serviceCallback={PostService.add}
        validationSchema={schema}
        popUpError
        PaperProps={{ sx: { backgroundColor: 'background.paper', borderRadius: '8px' } }}>
        <DialogTitle sx={{ textAlign: 'center' }} id='post-form-dialog-title'>
          Create post
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              backgroundColor: 'secondary.button',
              '&:hover': { backgroundColor: 'action.custom.secondary' }
            }}
            color='inherit'>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true} sx={{ height: '100%', borderBottom: 'none' }}>
          <DialogContentText ref={descriptionElementRef} id='post-form-dialog-description' tabIndex={-1}>
            <FormInputBase
              name='content'
              placeholder={`What's on your mind, ${auth.currentUser.name.first}`}
              required
              multiline
              fullWidth
              sx={{
                fontSize: '1.5rem',
                lineHeight: '1.1667'
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={0.5}>
            <FormMediaUploadButton
              name='media'
              label='Photo/Video'
              iconProps={{ sx: { fontSize: '33px', color: 'success.main', backgroundColor: 'dark' } }}
              labelProps={{ sx: { color: 'grey.500', ml: '.5rem' } }}
              sx={{
                borderRadius: '8px',
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostForm;
