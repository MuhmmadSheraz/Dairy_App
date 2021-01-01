import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from 'jquery';

import MainRouter from "./config/router";

function App() {
  return (
    <div className="App">
      <MainRouter />  
    </div>
  );
}

export default App;
