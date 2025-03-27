import { Route, Routes } from "react-router-dom";

import ControlledCarousel from "../components/ControlledCarousel/ControlledCarousel";
import Login from "../components/LoginScreen/Login";
import ManageCarousel from "../components/ControlledCarousel/ManageCarousel";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/achievements" element={<ControlledCarousel />} />
      <Route path="/grow-with-us" element={<div>Grow With Us Page</div>} />
      <Route path="/store-location" element={<div>Store Location Page</div>} />
      <Route path="/management" element={<div>Management Page</div>} />
      <Route path="/admin/add-new-collection" element={<div>Add New Collection Page</div>} />
      <Route path="/admin/manage-collections" element={<div>Manage Collections Page</div>} />
      <Route path="/admin/manage-carousel" element={<ManageCarousel />} />
    </Routes>
  );
};

export default RoutesComponent;
