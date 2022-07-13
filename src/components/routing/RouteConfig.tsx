import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
import Layout from 'components/Layout';
import LoginPage from 'components/pages/LoginPage';
import DashboardPage from 'components/pages/DashboardPage';
import NotFoundPage from 'components/pages/NotFoundPage';

function RouteConfig() {
  const { isLoggedIn } = useAuth();

  const pages = isLoggedIn
    ? (
      <>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
    : (
      <>
        <Route path="login" element={<LoginPage />} />
        <Route path="*"
          element={
            <Navigate replace to="/login" />
          }
        />
      </>
    );

  const element = (
    <Routes>
      <Route element={<Layout />}>
        {pages}
      </Route>
    </Routes>
  );

  return element;
}

export default RouteConfig;