import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Management from "./components/Management/Management";


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Switch>
        <Route exact path="/management" component={Management}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
