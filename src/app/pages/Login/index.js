import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrView, GrFormViewHide } from 'react-icons/gr';
import { IconContext } from "react-icons";
import './style.css';
import api from '../../../services/api';
import Forgot from '../../components/Forgot';

function Login({ history }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    if (token) {
      history.push(`/main/${id}`);
    }
  }, [history]);

  function forgotPassword(e){
    e.preventDefault();
    setForgot(true);
  }

  function close(){
    setForgot(false);
  }
  async function handleForgot(data){
    
    const response = await api.post('/users/forgot', data);

    if(response.data.error){
      return setMessageError(response.data.error)
    }
    setForgot(false);
    return alert('Email enviado, aguarde!');
  }

  function toggleHidden(){
    setHidden(!hidden);

    setTimeout(()=> {
      setHidden(false);
    }, 2000);
  }

  async function handleSubmit() {
    if (name === '' || password === '') {
      setError(true);
      const nono = document.querySelector('.form');
      if (nono) {
        nono.addEventListener('animationend', event => {
          if (event.animationName === 'no-no') {
            setError(false);
          }
        });
      }

      return false;
    }


    const { data } = await api.post('/sessions', { name, password });

    if(!data.error){
      const { token, user: { _id: id } } = data;

      localStorage.setItem('token', token);

      localStorage.setItem('id', id);

      history.push(`/main/${id}`);
    }
    setError(true);
    setMessageError(data.error)
    
  }
  function enterPress(key) {
    if (key.which === 13) {
      handleSubmit();
    }
  }
  return (
    <div className='container-login'>
      { forgot && <Forgot click={close} hand={handleForgot}/>}
      <div className='title'>R&R Finanças</div>
      {messageError 
        && 
          <div 
            className="error-message">
              {messageError}
          </div>}
      <div className={error ? `form form-no-no` : 'form'}>
      
        <input
          type='text'
          className='name'
          id='name'
          placeholder='Nome de usuário'
          onChange={e => setName(e.target.value)}
          value={name}
          onKeyPress={key => enterPress(key)}
        />

        <div className="input">
          <input
              type={hidden 
                    ? 'text' 
                    : 'password'
              }
              className='name'
              id='pass'
              placeholder='Sua senha'
              onChange={e => setPassword(e.target.value)}
              value={password}
              onKeyPress={key => enterPress(key)}
            />
            <div className="hidde">
            <IconContext.Provider value={{ color: "#ff483ea8", className: "global-class-name", size:"1.3em" }}>
              { hidden 
                ? <GrView 
                  
                    onClick={toggleHidden}
                  />
                : 
                    <GrFormViewHide 
                    onClick={toggleHidden}/> 
                  }
             </IconContext.Provider>     
            </div>
            
        </div>

        <button className='enter' onClick={handleSubmit}>
          Entrar
        </button>
        <div className="register">
          Não tem conta? <Link to='/register'>criar conta</Link>
        </div>
        <div className="forgot">
         <Link to='/' onClick={forgotPassword}>Esqueci minha senha</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
