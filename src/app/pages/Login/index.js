import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../services/api";

function Login({ history }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (token) {
      history.push(`/main/${id}`);
    }
  }, [history]);

  async function handleSubmit() {
    if (name === "") {
      setError(true);
      const nono = document.querySelector(".form");
      if (nono) {
        nono.addEventListener("animationend", event => {
          if (event.animationName === "no-no") {
            setError(false);
          }
        });
      }

      return false;
    }

    const { data } = await api.post("/users", { name });

    const { token, user } = data;

    const { _id: id } = user;
    
    await localStorage.setItem("token", token);

    await localStorage.setItem("id", id);

    history.push(`/main/${id}`);
  }
  function enterPress(key) {
    if (key.which === 13) {
      handleSubmit();
    }
  }
  return (
    <div className="container-login">
      <div className="title">R&R Finanças</div>
      <div className={error ? `form form-no-no` : "form"}>
      
        <input
          type="text"
          className="name"
          id="name"
          placeholder="Nome de usuário"
          onChange={e => setName(e.target.value)}
          value={name}
          onKeyPress={key => enterPress(key)}
        />
        <button className="enter" onClick={handleSubmit}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
