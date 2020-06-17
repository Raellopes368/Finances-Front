import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./app/pages/Login";
import Main from "./app/pages/Main";
import Register from "./app/pages/Register";
import Forgot from "./app/pages/Forgot";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/main/:id" exact component={Main} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgot/:id/:token" exact component={Forgot} />
    </BrowserRouter>
  );
}
