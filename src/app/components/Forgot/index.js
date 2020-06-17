import React,{useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import './style.css';

function Forgot({click,hand}){
  const [email, setEmail] = useState('');

  return (
    <div className="forgotContainer">
      <div className="block">
        <FontAwesomeIcon icon={faWindowClose} className='close' size='2x' onClick={click}/>
        <div className="title"></div>
        <input type="email" className="value" placeholder='Informe Seu email' value={email} onChange={e=> setEmail(e.target.value.replace(',','.'))}/>
       
        <button className='enter' onClick={()=>hand({ email })}>Enviar</button>
      </div>
    </div>
  );
}

export default Forgot;