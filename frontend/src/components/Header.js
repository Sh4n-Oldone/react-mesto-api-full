import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
// import { useMediaQuery } from 'react-responsive';
import logo from '../images/logo_white.svg';
import { removeToken } from '../utils/token';

export default function Header({user, onExit}) {
  const history = useHistory();

  // const isSmallScreen = useMediaQuery({ query: (max-width: 760px) });
  // Конечно, мы же не можем использовать удобные штуки -_-
  function exitClick() {
    history.push('./sign-in');
    onExit();
  }

  return (
    <>
      <header className='header'>
        <img src={logo} alt='Логотип' className='logo' />          
        <Switch>
          <Route exact path='/'>
            <div className='header__user_wrapper'>
              <p className='header__user'>{user.email}</p>
              <button 
                type='button' 
                className='button-style__reset header__button header__button_exit'
                onClick={() => {
                  removeToken()
                  history.push('./sign-in')
                }}  
              >Выйти</button>
            </div>
          </Route>
          <Route path='/sign-in'>
            <button 
              type='button' 
              className='button-style__reset header__button header__button_sign-in'
              onClick={() => {history.push('./sign-up')}}
            >Регистрация</button>
          </Route>
          <Route path='/sign-up'>
            <button 
              type='button' 
              className='button-style__reset header__button header__button_sign-up'
              onClick={exitClick}
            >Войти</button>
          </Route>
        </Switch>
      </header>
    </>
  );
}
