import { Route, Routes } from "react-router-dom";
import { useContext, useState } from "react";

import Achievements from "../components/Achievements/Achievements";
import AddCollection from "../components/ManageCollections/AddCollection";
import CollectionNameContext from "../components/CollectionsSection/CollectionNameContext";
import CollectionsSection from "../components/CollectionsSection/CollectionsSection"; // Import CollectionsSection
import ControlledCarousel from "../components/ControlledCarousel/ControlledCarousel";
import GrowWithUs from "../components/GrowWithUs/GrowWithUs";
import HomePage from "../components/HomePage/HomePage";
import ItemsGrid from "../components/CollectionsSection/ItemsGrid";
import Login from "../components/LoginScreen/Login";
import ManageCarousel from "../components/ControlledCarousel/ManageCarousel";
import ManageCollections from "../components/ManageCollections/ManageCollections";
import Management from "../components/Management/Management";
import OrderForm from "../components/OrderYourJersey/OrderForm";
import StoreLocation from "../components/StoreLocation/StoreLocation";
import WelcomeScreen from "../components/HomePage/WelcomeScreen";
import { useAuth } from "../firebase/config";
import JerseyOrdersTable from "../components/OrderYourJersey/JerseyOrdersTable";

const RoutesComponent = ({ isSidebarOpen }) => { // Accept isSidebarOpen prop
  const currentUser = useAuth();
  const isAdmin = currentUser?.email?.length > 0;
  const { collectionName, changeCollectionName } = useContext(CollectionNameContext);
const LOCAL_STORAGE_KEY = "jerseyOrders";
const [orderedPersons, setOrderedPersons] = useState(() => {
    const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  });
  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/collections" element={<HomePage isSidebarOpen={isSidebarOpen} />} />
      <Route path="/collection/:collectionName" element={<ItemsGrid isSidebarOpen={isSidebarOpen} />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/jersey-details" element={<JerseyOrdersTable data={orderedPersons}/>} />
      <Route path="/grow-with-us" element={<GrowWithUs isSidebarOpen={isSidebarOpen}/>} />
      <Route path="/order-your-jersey" element={<OrderForm isSidebarOpen={isSidebarOpen}/>} />
      <Route path="/store-location" element={<StoreLocation />} />
      <Route path="/management" element={<Management />} />
      <Route path="/admin/add-new-collection" element={<AddCollection /> } />
      <Route path="/admin/manage-collections" element={<ManageCollections />} />
      <Route path="/admin/manage-carousel" element={<ManageCarousel isAdmin={isAdmin} isSidebarOpen={isSidebarOpen}/>} />
      <Route path="/collections" element={<CollectionsSection isSidebarOpen={isSidebarOpen} />} /> {/* Render CollectionsSection */}
    </Routes>
  );
};

export default RoutesComponent;
