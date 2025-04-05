import './App.css';

import { BrowserRouter, useLocation } from "react-router-dom";
import { createContext, useState } from 'react';

import CollectionNameContext from './components/CollectionsSection/CollectionNameContext';
import Footer from './components/Footer/Footer.jsx';
import RoutesComponent from './Routes/routes.jsx';
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const location = useLocation();
  const hideSidebarRoutes = ["/admin"];

  const contextValue = {
    collectionName,
    changeCollectionName: setCollectionName
  };
  
  return (
    <CollectionNameContext.Provider value={contextValue}>
      <div className='w-screen flex bg-purple-200'>
        {!hideSidebarRoutes.includes(location.pathname) && <Sidebar open={open} setOpen={setOpen} />}
    <div className='flex flex-col w-full h-screen'>
        <RoutesComponent value={contextValue} isSidebarOpen={open} /> {/* Pass 'open' as 'isSidebarOpen' */}
        <Footer />
      </div>
    </div>
    </CollectionNameContext.Provider>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  );
}
