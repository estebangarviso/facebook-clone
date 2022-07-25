import React, { useEffect, useState } from 'react';
import Comment from '../Comment';
import CommentForm from '../CommentForm';
import { List, CircularProgress } from '@mui/material';
import PostService from '../../services/PostService';
import { StyledComments } from './StyledComponents';

const Comments = ({ postId, user }) => {
  const [comments, setComments] = useState({ loading: true });

  useEffect(() => {
    PostService.getAllCommentsById(postId).then((res) => {
      setComments(res.data.comments);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledComments display='flex' flexDirection='column'>
      {comments.loading ? (
        <CircularProgress sx={{ alignSelf: 'center' }} />
      ) : (
        <>
          <CommentForm postId={postId} popUpError sx={{ px: '16px', py: '4px' }} />
          <List sx={{ width: '100%' }} dense disablePadding className='comments'>
            {comments
              .filter((comment) => !comment?.replyTo)
              .map((comment) => (
                <Comment rootNode key={comment._id} {...comment} comments={comments} />
              ))}
          </List>
        </>
      )}
    </StyledComments>
  );
};

export default Comments;
