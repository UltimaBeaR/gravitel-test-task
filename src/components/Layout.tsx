import { useAuth } from 'hooks/auth';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

function Layout() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      Layout
      { !isLoggedIn && <LoginForm /> }
      { isLoggedIn && <><Dashboard /><LogoutButton /></> }
    </div>
  );
}

export default Layout;
