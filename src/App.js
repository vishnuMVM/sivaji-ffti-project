import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Achievements from "./components/Achievements/Achievements";
import AddCollection from "./components/Categories/AddCollection";
import Footer from "./components/Footer/Footer";
import GrowWithUs from "./components/GrowWithUs/GrowWithUs";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Management from './components/Management/Management'
import PageFooter from "./components/PageFooter/PageFooter";
import StoreLocation from "./components/StoreLocation/StoreLocation";
import UpdateCollections from './components/Categories/UpdateCollections';
import ImagesGrid from './components/Categories/ImagesGrid';
import AllCategories from './components/Categories/AllCategories';


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/admin/add-collection" element={<AddCollection />}/>
    {/* <Route exact path="/collection:name" element={<ImagesGrid name={name}/>}/> */}
    <Route exact path="/admin/all-categories" element={<AllCategories />}/>
    <Route exact path="/admin/update-collections" element={<UpdateCollections />}/>
    <Route exact path="/admin/images-grid" element={<ImagesGrid />}/>
    <Route exact path="/management" element={<Management />}/>
    <Route exact path="/grow-with-us" element={<GrowWithUs />}/>
    <Route exact path="/achievements" element={<Achievements />}/>
    <Route exact path="/storelocation" element={<StoreLocation />}/>
    </Routes>
    {/* <Footer /> */}
    <PageFooter />
    </BrowserRouter>
  );
}

export default App;
