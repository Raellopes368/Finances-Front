import React, { useState } from 'react';
import './style.css';
import api from '../../../services/api';

function Forgot({ match,history }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  

  async function handleSubmit() {
    if ( password === '' || confirmPassword === '' || password !== confirmPassword) {
      setError(true);
      if(password !== confirmPassword){
        setMessageError('As senhas não coincidem');
      }
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
    const { id, token } = match.params;

    const { data } = await api.put('/users/forgot', { id,password },{
      headers: {
        authorization: `Bearer ${token}`
      } 
    });

    if(!data.error){
      const { token, user: { _id: id } } = data;

    
      localStorage.setItem('token', token);
      
      localStorage.setItem('id', id);

      history.push(`/main/${id}`);
    }
    setError(true);
    setMessageError(data.error);
    
  }
  function enterPress(key) {
    if (key.which === 13) {
      handleSubmit();
    }
  }
  return (
    <div className='container-login'>
      <div className='title'>R&R Finanças</div>

      {messageError 
        && 
          <div 
            className="error-message">
              {messageError}
          </div>}
      
      <div className={error ? `form form-no-no` : 'form'}>
      
        
        <div className="input">
          <input
              type='password'
              className='name'
              placeholder='Sua nova senha'
              onChange={e => setPassword(e.target.value)}
              value={password}
              onKeyPress={key => enterPress(key)}
            />
            
            
        </div>

        <div className="input">
          <input
              type='password'
              className='name'
              placeholder='Repita sua senha'
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              onKeyPress={key => enterPress(key)}
            />
            
        </div>

        <button className='enter' onClick={handleSubmit}>
          Salvar
        </button>
        
        
      </div>
    </div>
  );
}

export default Forgot;
