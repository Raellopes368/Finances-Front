import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiRefreshCcw } from 'react-icons/fi';
import {
  faBars,
  faWindowClose,
  faCreditCard,
  faHome,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../../services/api";
import Balance from "../../components/Balance";
import Debt from "../../components/Debt";
import Filters from "../../components/Filters";

import "./style.css";

function Main({ match, history }) {
  const [view, setView] = useState(false);
  const [windowDebt,setWindowDebt] = useState(false);
  const [windowFilters,setWindowFilters] = useState(false);
  const [windowBalance,setWindow] = useState(false);
  const [filtered,setFiltered] = useState(false);
  const [all,setAll] = useState({
    balance: 0,
    finances: [],
    name: '',
    totalDebit: 0
  });

  function closeBalance(){
    setWindow(false);
  }
  function openBalance(){
    setWindow(true);
  }
  function closeDebt(){
    setWindowDebt(false);
  }

  function openFilters(){
    setWindowFilters(true);
  }

  function closeFilters(){
    setWindowFilters(false);
  }

  function openDebt(){
    setWindowDebt(true);
  }

  async function newDebt(data){
    const { id } = match.params;
    const token = localStorage.getItem('token');

    data.user = id;
    const response = await api.post('/finances',{
      data
    },
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    
    const {value} = response.data;
    setAll({
        ...all, 
        finances: 
          [...all.finances, response.data] , 
        totalDebit: all.totalDebit + value});
  }

  async function handleFilter(data){
    const { id } = match.params;
    const token = localStorage.getItem('token');
    // console.log(data);
    const response = await api.get(`/filters/${id}`, {
      params: data,
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    // console.log(response.data)
    if(response.data.length){
      // setDebts(response.data);
      setAll({...all, finances: response.data})
    }else{
      alert('Não houve resultados');
    }
    setFiltered(true);
  }


  async function handleBalance(data){
    const updateBalance = data;
    const { id } = match.params;
    const token = localStorage.getItem('token');
    updateBalance.userId = id;
    const response = await api.put('/balance',updateBalance, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
    setAll({...all, balance: response.data.balance});

    setWindow(false);
  }

  async function paidDebit(financeId){
    const { id } = match.params;
    const token = localStorage.getItem('token');
    const response = await api.put('/paid',{
      userId: id,
      financeId:financeId,
      paid:true
    },{
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    
    const { finance , user} = response.data;

    setAll({...all, 
        finances: all.finances.map(debt=> 
            debt._id === finance._id ? 
                finance 
              : debt) ,
        balance: user.balance , 
        totalDebit: all.totalDebit - finance.value})

    // setDebts(debts.map(debt=> debt._id === finance._id ? finance : debt));

    // setBalance(user.balance);
  }

  function getTypeOrigin(typeOrigin) {
    if (typeOrigin.match(/cartão|cartao/gim)) return "card";
    if (typeOrigin.match(/despesas/gim)) return "home";
    if (typeOrigin.match(/boleto/gim)) return "billet";
    if (typeOrigin.match(/outros/gim)) return "others";
    return "others"
  }
  function getType(type) {
    const types = {
      card: faCreditCard,
      home: faHome,
      billet: faReceipt,
      others:faReceipt
    };
    return types[type] || types.billet;
  }

  async function reload(){
    const token = localStorage.getItem("token");
      const { id } = match.params;
      const { data } = await api.get(`/login/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      // setBalance(data.balance);
      // setDebts(data.finances);
      setAll(data.user);
  }

  useEffect(() => {
    async function sendFirst() {
      const token = localStorage.getItem("token");
      if(!token) history.push('/');
      else{
        const { id } = match.params;
        const { data } = await api.get(`/login/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        if(data){
          const { user } = data;
          // console.log(user);
          setAll(user);
          // setBalance(user.balance);
          // setDebts(user.finances);
        }else{
          alert('Houve um erro ao carregar dados do servidor, por favor, clique em sair, e entre novamente!');
        }
        // 
        // 
      }
     
      
    }
    sendFirst();
  }, [history, match]);

  function viewOtions() {
    const options = document.querySelector(".options");
    const optionView = document.querySelector(".optionView");

    if (view) {
      options.style.left = "-100%";
      setView(false);
    } else {
      setView(true);
      options.style.left = "0";
      optionView.style.left = "-100%";
    }
  }
  function closeView() {
    const options = document.querySelector(".options");
    const optionView = document.querySelector(".optionView");
    options.style.left = "-100%";
    optionView.style.left = "0";
    setView(false);
  }

  function loggout(){
    localStorage.clear();
    history.push('/');
  }
  return (
    <div className="container" style={{
      overflow: (windowBalance || windowDebt || windowFilters ) ? 'hidden': '' 
    }}>
      {
        filtered && (
          <div className="reload" onClick={()=> {
            reload();
            setFiltered(false);
          }}>
            Recarregar dados <FiRefreshCcw />
          </div>
        )
      }
      <div className="menu">
        <div className="optionView" onClick={() => viewOtions()}>
          <FontAwesomeIcon icon={faBars} size="3x" />
        </div>
        <div className="options">
          <div className="close" onClick={() => closeView()}>
            <FontAwesomeIcon icon={faWindowClose} size="2x" />
          </div>
          <div className="option" onClick={()=>{
            closeView()
            openBalance();
          }}>Adicionar saldo</div>
          <div className="option" onClick={()=>{
            closeView();
            openDebt();
          }}>Adicionar débito</div>
          <div className="option" onClick={()=> {
            closeView();
            openFilters();
          }
          }>Filtrar</div>
          <div className="option" onClick={loggout}>Sair</div>
        </div>
      </div>

      <div className="debts">
        <div className="balance">
          Saldo: <div className="value">R$ {all.balance.toFixed(2).replace(/\./,',')}</div>
        </div>
        <div className="all-debts">
          Débitos: <div className="value">R$ {all.totalDebit.toFixed(2).replace(/\./,',')}</div>
        </div>
        {windowBalance && <Balance hand={handleBalance} click={closeBalance}/>}
        {windowDebt && <Debt close={closeDebt} handleDebt={newDebt}/>}
        {windowFilters && <Filters close={closeFilters} handleFilter={handleFilter}/>}
        
        {all.finances.map(debt => (
          
          <div className="debt" key={debt._id}>
            <div className="title">
              <div className="icon">
                <FontAwesomeIcon
                  icon={getType(getTypeOrigin(debt.type))}
                  size="2x"
                />
              </div>
              <div className="type">{debt.type}</div>
            </div>
            <div className="description">{debt.description}</div>
            <div
              className="paid"
              style={{
                color: debt.paid ? "#008000" : "#ff0000"
              }}
            >
              Status: {debt.paid ? "pago" : "Em aberto"}
            </div>
            <div className="debtValue" >Valor: R$ {debt.value.toFixed(2).replace(/\./,',')}</div>
            {!debt.paid && <button className="pay" onClick={()=> paidDebit(debt._id)}>PAGAR</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
