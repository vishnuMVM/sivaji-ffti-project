import { Route, Routes } from "react-router-dom";

import Achievements from "../components/Achievements/Achievements";
import CollectionsSection from "../components/CollectionsSection/CollectionsSection"; // Import CollectionsSection
import ControlledCarousel from "../components/ControlledCarousel/ControlledCarousel";
import GrowWithUs from "../components/GrowWithUs/GrowWithUs";
import HomePage from "../components/HomePage/HomePage";
import Login from "../components/LoginScreen/Login";
import ManageCarousel from "../components/ControlledCarousel/ManageCarousel";
import StoreLocation from "../components/StoreLocation/StoreLocation";
import { useAuth } from "../firebase/config";

const RoutesComponent = ({ isSidebarOpen }) => { // Accept isSidebarOpen prop
  const currentUser = useAuth();
  const isAdmin = currentUser?.email?.length > 0;

  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route path="/" element={<HomePage isSidebarOpen={isSidebarOpen}/>} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/grow-with-us" element={<GrowWithUs isSidebarOpen={isSidebarOpen}/>} />
      <Route path="/store-location" element={<StoreLocation />} />
      <Route path="/management" element={<div>Management Page</div>} />
      <Route path="/admin/add-new-collection" element={<div>Add New Collection Page</div>} />
      <Route path="/admin/manage-collections" element={<div>Manage Collections Page</div>} />
      <Route path="/admin/manage-carousel" element={<ManageCarousel isAdmin={isAdmin} isSidebarOpen={isSidebarOpen}/>} />
      <Route path="/collections" element={<CollectionsSection isSidebarOpen={isSidebarOpen} />} /> {/* Render CollectionsSection */}
    </Routes>
  );
};

export default RoutesComponent;