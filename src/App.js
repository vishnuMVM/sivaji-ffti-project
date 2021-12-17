import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Management from './components/Management/Management'


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/management" element={<Management />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
