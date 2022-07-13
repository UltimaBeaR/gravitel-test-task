import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGqlLoginMutation } from 'hooks/graphql/loginMutation';

import classes from './LoginForm.module.scss';

function LoginForm() {
  const { gqlLogin, gqlLoginData, gqlLoginLoading, gqlLoginError } = useGqlLoginMutation();

  const navigate = useNavigate();

  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [showError, setShowError] = useState(false);

  if (gqlLoginData) {
    navigate('/');
    return <div>Переадресация...</div>;
  }

  const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowError(true);

    const login = loginInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (login !== undefined && password !== undefined) {
      await gqlLogin(login, password);
    }
  };

  const inputHandler = () => {
    setShowError(false);
  };

  return (
    <form className={`${classes.form} ${gqlLoginLoading ? 'disable-interaction' : ''}`} onSubmit={loginHandler}>
      <h2>Вход</h2>
      <p className={classes.slogan}>Уникальная технология доступная для вашего бизнеса уже сейчас!</p>
      <input ref={loginInputRef} className={classes.input} type='text' placeholder='Логин' onInput={inputHandler} />
      <input ref={passwordInputRef} className={classes.input} type='password' placeholder='Пароль' onInput={inputHandler} />
      <button className={classes.button} type='submit'>Войти&nbsp;&nbsp;<span className={`small-loader ${gqlLoginLoading ? 'small-loader__visible' : ''}`} /></button>
      { showError && gqlLoginError && <p className={classes['login-error']}>Ошибка входа</p> }
    </form>
  );
}

export default LoginForm;
