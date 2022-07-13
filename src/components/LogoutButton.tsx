import { useAuth } from 'hooks/auth';

function LogoutButton() {
  const { logout: logOut } = useAuth();

  const logoutHandler = async () => {
    logOut();
  };

  return (
    <button onClick={logoutHandler} title='Выход'><i className="fa-solid fa-right-from-bracket"></i></button>
  );
}

export default LogoutButton;
