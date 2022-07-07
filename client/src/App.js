import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoudary';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import PostPage from './pages/Post';
import Layout from './components/Layout';
import { GlobalProvider } from './context';
import { AppRoutes } from './app/routes';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <GlobalProvider>
          <Layout>
            <Routes>
              <Route path={AppRoutes.HOME.path} element={<HomePage />} />
              <Route path={AppRoutes.POST.path} element={<PostPage />} />
              <Route path={AppRoutes.LOGIN.path} element={<LoginPage />} />
            </Routes>
          </Layout>
        </GlobalProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
export default App;
