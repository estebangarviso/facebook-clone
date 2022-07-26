import React, { useEffect, useState, useContext } from 'react';
import Comment from '../Comment';
import CommentForm from '../CommentForm';
import { List, CircularProgress } from '@mui/material';
import PostService from '../../services/PostService';
import { StyledComments } from './StyledComponents';
import { AppConfig } from '../../app/config';
import GlobalContext from '../../context';

const Comments = ({ postId }) => {
  const { auth } = useContext(GlobalContext);
  const [comments, setComments] = useState({ loading: true });

  useEffect(() => {
    PostService.getAllCommentsById(postId).then((res) => {
      setComments(res.data.comments);
      connect(auth.currentUser._id);
    });
    const connect = (clientId) => {
      const ws = new WebSocket(`${AppConfig.WS_URL}?clientId=${clientId}`);
      ws.addEventListener('open', () => {
        console.log('We are connected');
      });

      ws.addEventListener('message', (e) => {
        e &&
          e.data &&
          e.data.text &&
          e.data
            .text()
            .then((data) => {
              // console.log('got a message: ' + data);
              const parsedData = JSON.parse(data);
              const { type, payload } = parsedData.data;
              if (type === 'comment' && payload.post === postId) {
                setComments((prevComments) => [payload, ...prevComments]);
              }
            })
            .catch((err) => console.error(err));
      });
    };
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
