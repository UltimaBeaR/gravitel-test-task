import { useAppSelector } from 'hooks';
import { selectIsAuthenticated } from 'store/authSlice';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';

function Layout() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <div>
      Layout
      { !isAuthenticated && <LoginForm /> }
      { isAuthenticated && <Dashboard /> }
    </div>
  );
}

export default Layout;
