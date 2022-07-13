import { useAuth } from 'hooks/auth';

function LogoutButton() {
  const { logout: logOut } = useAuth();

  const logoutHandler = async () => {
    logOut();
  };

  return (
    <button onClick={logoutHandler}>Logout</button>
  );
}

export default LogoutButton;
