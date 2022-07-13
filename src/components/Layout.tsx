import { useAppSelector } from 'hooks';
import { selectIsAuthenticated } from 'store/authSlice';
import LoginForm from './LoginForm';

function Layout() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <div>
      Layout. Аутентификация: { isAuthenticated ? 'Да' : 'Нет' }
      <LoginForm />
    </div>
  );
}

export default Layout;
