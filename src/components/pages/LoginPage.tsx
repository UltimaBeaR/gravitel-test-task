import LoginForm from "components/LoginForm";

import classes from './LoginPage.module.scss';

function LoginPage() {
  return (
    <div className={classes.offsets}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;