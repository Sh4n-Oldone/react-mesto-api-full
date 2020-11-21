import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Register({registerFetchOnSubmit}) {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name,  value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (!email || !password){
      return;
    }
    if (email && password){
      return registerFetchOnSubmit(password, email);
    }
  }


  return (
    <>
      <section className='login'>
        <form className='login__form'>
            <h2 className='login__title'>Регистрация</h2>
            <input 
              className='input-style__reset login__form_input login__form_email' 
              name='email' 
              value={state.email || ''}
              placeholder='Email' 
              type='email' 
              onChange={handleChange} 
              required
            ></input>
            <input 
              className='input-style__reset login__form_input login__form_password' 
              placeholder='Пароль' 
              name='password' 
              value={state.password || ''}
              type='password' 
              onChange={handleChange} 
              required
            ></input>
          <button 
            type='submit'
            className='login__form_button button-style__reset'
            onClick={handleSubmit}
          >Зарегистрироваться</button>
        </form>
        <button 
          className='login__redirect_button button-style__reset' 
          onClick={() => {history.push('./sign-in')}}
        >Уже зарегистрированы? Войти</button>
      </section>
    </>
  )
};