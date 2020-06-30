import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { IconContext } from "react-icons";
import './style.css';
import logo from '../../../assets/logo.svg';
import api from '../../../services/api';

function Register({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  

  function toggleHidden(){
    setHidden(!hidden);

    setTimeout(()=> {
      setHidden(false);
    }, 2000);
  }

  async function handleSubmit() {
    if (name === '' || password === '' || email === '') {
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


    const { data } = await api.post('/users', { name, password, email });

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
      <div className='title'>
        <img src={logo} alt="R&R Technology"/>
      </div>
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

        <input
          type='text'
          className='name'
          id='email'
          placeholder='Seu email'
          onChange={e => setEmail(e.target.value)}
          value={email}
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
            <IconContext.Provider value={{ color: "#333", className: "global-class-name", size:"1.3em" }}>
              { hidden 
                ? <MdVisibility 
                  
                    onClick={toggleHidden}
                  />
                : 
                    <MdVisibilityOff 
                    onClick={toggleHidden}/> 
                  }
             </IconContext.Provider>     
            </div>
            
        </div>

        <button className='enter' onClick={handleSubmit}>
          Criar
        </button>
        <div className="register">
          Já tenho conta <Link to='/'>entrar</Link>
        </div>
        
      </div>
    </div>
  );
}

export default Register;
