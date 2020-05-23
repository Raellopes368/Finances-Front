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
          <label htmlFor="title">Retirar dízimo?</label>
          <div className="select" onClick={()=>setSelected(selected ? false: true)} >
            <div className="selected" style={{
              background: selected? '#ff261b': '#fff'
            }}></div>
          </div>
        </div>
       
        <button className='enter' onClick={()=>hand({balance:Number(value),tithe:selected})}>Adicionar</button>
      </div>
    </div>
  );
}

export default Balance;