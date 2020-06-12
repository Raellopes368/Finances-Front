import React,{ useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import './style.css';

function Debt({ handleFilter,close }){

const [options, setOptions ] = useState({});
const [dateOption, setDateOption ] = useState(false);
const [paidOption, setPaidOption ] = useState(false);
const [typeOption, setTypeOption ] = useState(false);
const [descriptionOption, setDescriptionOption ] = useState(false);

function getDate(){
  const curr = new Date();
  
  curr.setDate(curr.getDate() + 3);

  const date = curr.toISOString().substr(0,10);

  return date;
}

  return (
    <div className="filterContainer">
      <div className="block">
        <FontAwesomeIcon icon={faWindowClose} className='close' onClick={close} size='2x'/>
        <div className="title">Adicionar Filtro</div>
        <div className="filters">
          <label htmlFor="paid" className="container-filter">
            Situação 
            <input type="checkbox" name="paid" id="paid" onChange={(e)=> setPaidOption(e.target.checked)}/>
            <span className="checkmark"></span>
          </label>

          
          {paidOption && (
              <div className="filter">
                <select onChange={(e)=> setOptions({...options, paid: e.target.value})}>
                  <option value="selecione">-- Selecione --</option>
                  <option value={false}>Em aberto</option>
                  <option value={true}>Pagos</option>
                </select>
              </div>
          )}
          <label htmlFor="date" className="container-filter">
            Data 
            <input type="checkbox" name="date" id="date" onChange={(e)=> setDateOption(e.target.checked)}/>
            <span className="checkmark"></span>
          </label>
          {dateOption && (
              <div className="filter">
                De :<input 
                      type="date" 
                      onChange={(e)=> setOptions({...options, init: e.target.value})}
                      value={options.init ? options.init : getDate()}
                    />
                Até :<input 
                        type="date" 
                        onChange={(e)=> setOptions({...options, final: e.target.value})}
                        value={options.final ? options.final : getDate()}
                      />
              </div>
          )}
          <label htmlFor="type" className="container-filter">
            Tipo 
            <input type="checkbox" name="type" id="type" onChange={(e)=> setTypeOption(e.target.checked)}/>
            <span className="checkmark"></span>
          </label>
          {typeOption && (
              <div className="filter">
              <select onChange={(e)=> setOptions({...options, type: e.target.value})}>
                <option value="">--Selecione --</option>
                <option value="outros">Outros</option>
                <option value="cartão">Cartão</option>
                <option value="despesas">Despesas</option>
              </select>
            </div>
          )}
          <label htmlFor="description" className="container-filter">
            Descrição 
            <input type="checkbox" name="description" id="description" onChange={(e)=> setDescriptionOption(e.target.checked)}/>
            <span className="checkmark"></span>
          </label>
          {descriptionOption && (
              <div className="filter">
               <input type="text" name="description" onChange={(e)=> setOptions({...options, description: e.target.value})} placeholder="Descrição"/>
              </div>
          )}

          <div className="search">
            <input type="submit" value="Buscar" onClick={(e)=> {
              e.preventDefault();

              handleFilter(options);

              close();
            }}/>
          </div>
          
        </div>
        
        
      </div>
    </div>
  );
}

export default Debt;