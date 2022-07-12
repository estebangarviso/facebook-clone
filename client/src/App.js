import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoudary';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Layout from './components/Layout';
import { GlobalProvider } from './context';
import { AppRoutes } from './app/routes';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <GlobalProvider>
          <Layout>
            <Routes>
              <Route path={AppRoutes.HOME.path} element={<HomePage />} />
              <Route path={AppRoutes.LOGIN.path} element={<LoginPage />} />
              <Route path={AppRoutes.REGISTER.path} element={<RegisterPage />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Layout>
        </GlobalProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
export default App;
