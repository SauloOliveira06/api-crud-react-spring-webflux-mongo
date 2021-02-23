import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import Router from "./components/router/Router";
import React from "react";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Router/>
        </BrowserRouter>

    </div>
  );
}

export default App;
