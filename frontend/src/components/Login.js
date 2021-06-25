import React from "react";
import { Link, withRouter } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onLogin(email, password);
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form className='auth__form' onSubmit={handleSubmit} noValidate>
        <input
          className='auth__input'
          value={email}
          type='email'
          placeholder='Email'
          onChange={handleChangeEmail}
        />
        <input
          className='auth__input'
          value={password}
          type='password'
          placeholder='Пароль'
          onChange={handleChangePassword}
        />
        <button className='auth__button'>Войти</button>
        <p className='auth__subtitle'>
          Еще не зарегистрированы?{" "}
          <Link className='btn-link' to='/sign-up'>
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
}

export default withRouter(Login);
