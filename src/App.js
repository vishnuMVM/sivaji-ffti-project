import React from "react";
import { Component } from "react";
import CollectionnameContext from "./components/CollectionnameContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Achievements from "./components/Achievements/Achievements";
import AddCollection from "./components/Categories/AddCollection";
import GrowWithUs from "./components/GrowWithUs/GrowWithUs";
import Home from "./components/Home/Home";
import Management from "./components/Management/Management";
import PageFooter from "./components/PageFooter/PageFooter";
import StoreLocation from "./components/StoreLocation/StoreLocation";
import UpdateCollections from "./components/Categories/UpdateCollections";
import ImagesGrid from "./components/Categories/ImagesGrid";
import AllCategories from "./components/Categories/AllCategories";
import PageHeader from "./components/Header/PageHeader";
import Login from "./components/Login/Login";
import ManageCarousel from './components/Carousel/ManageCarousel';
import {useAuth} from "./components/firebase/config"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import NavBar from "./components/Header/NavBar";
class App extends Component {
  state = { collectionname: "" ,currentUser:""};

  Changecollectionname = (collectionname) => {
    this.setState({ collectionname });
  };

  getCurrentUser = () => {
    this.setState({currentUser:useAuth()})
    console.log(this.state.currentUser)
  }
  componentDidMount=()=> {

  }

  render() {
    const { collectionname } = this.state;

    return (
      <BrowserRouter>
        <CollectionnameContext.Provider
          value={{
            collectionname,
            Changecollectionname: this.Changecollectionname,
          }}
        >
          {/* <Header/> */}
          {/* <NavBar /> */}
          <PageHeader />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/admin" element={<Login />} />
            <Route
              exact
              path="/admin/add-collection"
              element={<AddCollection />}
            />
            <Route
              exact
              path={`/collection/${collectionname.replace(/\s+/g, "-")}`}
              element={<ImagesGrid name={collectionname} />}
            />
            <Route
              exact
              path="/admin/all-categories"
              element={<AllCategories />}
            />
            <Route
              exact
              path="/admin/update-collections"
              element={<UpdateCollections />}
            />
            <Route
              exact
              path="/admin/images-grid"
              element={<ImagesGrid name="T-Shirts" />}
            />
            <Route exact path="/management" element={<Management />} />
            <Route exact path="/grow-with-us" element={<GrowWithUs />} />
            <Route exact path="/achievements" element={<Achievements />} />
            <Route exact path="/storelocation" element={<StoreLocation />} />
            <Route exact path="/admin/manage-carousel" element={<ManageCarousel />} />
          </Routes>
          {/* <Footer /> */}
          <PageFooter />
        </CollectionnameContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
