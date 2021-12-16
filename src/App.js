import React from "react";
import {BrowserRouter,Switch} from "react-router-dom";
import Header from "./components/Header/Header";


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Switch>
   
    </Switch>
    </BrowserRouter>
  );
}

export default App;
