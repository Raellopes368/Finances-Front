import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faWindowClose,
  faCreditCard,
  faHome,
  faReceipt
} from "@fortawesome/free-solid-svg-icons";
import api from "../../../services/api";
import Balance from "../../components/Balance";
import Debt from "../../components/Debt";

import "./style.css";

function Main({ match }) {
  const [view, setView] = useState(false);
  const [balance, setBalance] = useState(0);
  const [debts, setDebts] = useState([]);
  const [windowDebt,setWindowDebt] = useState(false);
  const [windowBalance,setWindow] = useState(false);

  function closeBalance(){
    setWindow(false);
  }
  function openBalance(){
    setWindow(true);
  }
  function closeDebt(){
    setWindowDebt(false);
  }

  function openDebt(){
    setWindowDebt(true);
  }
  

  async function newDebt(data){
    const { id } = match.params;
    data.user = id;
    const response = await api.post('/finances',{ data });
    setDebts([...debts,  response.data ]);
  }

  async function handleBalance(data){
    const updateBalance = data;
    const { id } = match.params;
    updateBalance.userId = id;
    const response = await api.put('/balance',updateBalance);
    setBalance(response.data.balance);
    setWindow(false);
  }

  async function paidDebit(financeId){
    const { id } = match.params;
    const response = await api.put('/paid',{
      userId: id,
      financeId:financeId,
      paid:true
    });
    
    const { finance , user} = response.data;

    setDebts(debts.map(debt=> debt._id === finance._id ? finance : debt));

    setBalance(user.balance);
  }

  function getTypeOrigin(typeOrigin) {
    if (typeOrigin.match(/Cartão/gim)) return "card";
    if (typeOrigin.match(/Despesas/gim)) return "home";
    if (typeOrigin.match(/Boleto/gim)) return "billet";
    if (typeOrigin.match(/Outros/gim)) return "others";
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

  useEffect(() => {
    async function sendFirst() {
      const { id } = match.params;
      const { data } = await api.get(`/login/${id}`);
      setBalance(data.balance);
      setDebts(data.finances);
    }
    sendFirst();
  }, [match]);

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
  return (
    <div className="container">
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
          <div className="option">Filtrar</div>
          <div className="option">Pagos</div>
        </div>
      </div>

      <div className="debts">
        <div className="balance">
          Saldo: <div className="value">R$ {balance.toFixed(2).replace(/\./,',')}</div>
        </div>
        {windowBalance && <Balance hand={handleBalance} click={closeBalance}/>}
        {windowDebt && <Debt close={closeDebt} handleDebt={newDebt}/>}
        
        {debts.map(debt => (
          
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
