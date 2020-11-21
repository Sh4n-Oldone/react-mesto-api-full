import React, { useState } from 'react';

export default function Login({handleLogin}) {
  const [state, setState] = useState({
    email: '',
    password: '',
    message: ''
  });
  const handleChange = (e) => {
    const { name,  value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = state;
    if (!email || !password){
      return;
    }
    handleLogin(email, password, state);
    setState({ email: '', password: '', message: '' });
  }

  return (
    <>
      <section className='login'>
        <form className='login__form'>
            <h2 className='login__title'>Вход</h2>
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
              name='password' 
              value={state.password || ''} 
              placeholder='Пароль' 
              type='password' 
              onChange={handleChange} 
              required
            ></input>
          <button 
            type='submit'
            className='login__form_button button-style__reset' 
            onClick={handleSubmit}
          >Войти</button>
        </form>
      </section>
    </>
  )
};