import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./app/pages/Login";
import Main from "./app/pages/Main";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/main/:id" exact component={Main} />
    </BrowserRouter>
  );
}
