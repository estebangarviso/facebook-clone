import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import Container from './styles';
import GlobalContext from '../../context';
import { AppRoutes } from '../../app/routes';

const LoginPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(GlobalContext);

  if (auth.token) {
    // redirect to home page
    return navigate(AppRoutes.HOME.path);
  }

  return (
    <>
      <h1>Login Page</h1>
      <Container>
        <SignIn />
        <SignUp />
      </Container>
    </>
  );
};

export default LoginPage;
