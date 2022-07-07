import React from 'react';
import { Container } from './styles';
import Post from '../../components/Post';

const PostPage = () => {
  return (
    <>
      <h1>Post Page</h1>
      <Container>
        <Post />
      </Container>
    </>
  );
};

export default PostPage;
