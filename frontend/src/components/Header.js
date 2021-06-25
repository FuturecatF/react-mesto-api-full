import React from "react";
import logo from "../images/logo.svg";
import { Route, Link, Switch } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className='header'>
      <img className='logo' src={logo} alt='Место' />
      <div className='header__container'>
        <Switch>
          <Route path='/sign-up'>
            <Link to='/sign-in' className='btn-link'>
              Войти
            </Link>
          </Route>
          <Route path='/sign-in'>
            <Link to='/sign-up' className='btn-link'>
              Зарегистрироваться
            </Link>
          </Route>
          <Route path='/'>
            <p className='header__email'>{email}</p>
            <Link to='/sign-in' className='btn-link' onClick={onSignOut}>
              Выход
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
