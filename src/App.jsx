import './App.css';

import { BrowserRouter, useLocation } from "react-router-dom";

import RoutesComponent from './Routes/routes.jsx';
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/admin"]; // Add routes where you don't want the sidebar

  return (
    <div style={{ display: "flex" }}>
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div style={{ flexGrow: 1 }}>
        <RoutesComponent />
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}