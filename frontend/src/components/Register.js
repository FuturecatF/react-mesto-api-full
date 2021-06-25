import React from "react";
import { Link, withRouter } from "react-router-dom";

function Register({ onRegister }) {
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
    onRegister(email, password);
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='auth__input'
          type='email'
          value={email}
          placeholder='Email'
          onChange={handleChangeEmail}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={handleChangePassword}
        />
        <button className='auth__button'>Зарегистрироваться</button>
        <p className='auth__subtitle'>
          Уже зарегистрированы?{" "}
          <Link className='btn-link' to='/sign-in'>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default withRouter(Register);
