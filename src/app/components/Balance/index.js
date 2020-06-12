import React,{useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import './style.css';

function Balance({click,hand}){
  const [value,setValue] = useState('');
  const [selected,setSelected] = useState(false);

  return (
    <div className="balanceContainer">
      <div className="block">
        <FontAwesomeIcon icon={faWindowClose} className='close' size='2x' onClick={click}/>
        <div className="title">Adicionar Saldo</div>
        <input type="text" className="value" placeholder='Valor' value={value} onChange={e=> setValue(e.target.value.replace(',','.'))}/>
        <div className="tithe">
          <label htmlFor="date" className="container-filter">
              Retirar Dízimo? 
              <input type="checkbox" name="date" id="date" onChange={(e)=>{setSelected(e.target.checked)}}/>
              <span className="checkmark"></span>
            </label>
        </div>
       
        <button className='enter' onClick={()=>hand({balance:Number(value),tithe:selected})}>Adicionar</button>
      </div>
    </div>
  );
}

export default Balance;