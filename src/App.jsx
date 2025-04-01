import './App.css';

import { BrowserRouter, useLocation } from "react-router-dom";

import RoutesComponent from './Routes/routes.jsx';
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "@material-tailwind/react";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const hideSidebarRoutes = ["/admin"];
  

  return (
    <div className='w-screen flex'>
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar open={open} setOpen={setOpen} />}
      <RoutesComponent isSidebarOpen={open} /> {/* Pass 'open' as 'isSidebarOpen' */}
    </div>
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