import React,{ useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import './style.css';

function Debt({ handleDebt,close }){

  
const [ type , setType ] = useState('');
const [ value,setValue ] = useState(0);
const [ description, setDescription ] = useState('');

  return (
    <div className="debtContainer">
      <div className="block">
        <FontAwesomeIcon icon={faWindowClose} className='close' onClick={close} size='2x'/>
        <div className="title">Adicionar Débito</div>
        <input type="text" placeholder="Tipo (cartão, despesas,outros)" onChange={(e)=> setType(e.target.value)}/>
        <input type="text" placeholder="Valor" value={ value > 0 ? value:''} onChange={(e)=> setValue(e.target.value.replace(',','.'))}/>
        <textarea name="" placeholder="Descrição" id="" cols="30" rows="3"
          onKeyPress={(e)=> {     
            if(e.which === 13){
              e.preventDefault();
              handleDebt({type,value:Number(value),description})
              close()
            }
          }}
          onChange={(e)=> setDescription(e.target.value)}/>
        <button className='enter'  onClick={()=> {
          handleDebt({type,value:Number(value),description})
          close()}}>Adicionar</button>
      </div>
    </div>
  );
}

export default Debt;