import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoudary';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
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
              <Route
                path={AppRoutes.HOME}
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path={AppRoutes.PROFILE} element={<ProfilePage />} />
              <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
              <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Layout>
        </GlobalProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
export default App;
