import CollectionsSection from "../CollectionsSection/CollectionsSection";
import ControlledCarousel from "../ControlledCarousel/ControlledCarousel";
// HomePage.jsx
import React from "react";
import WelcomeScreen from "./WelcomeScreen";

const HomePage = (isSidebarOpen) => {
  return (
    <div className="flex flex-col bg-slate-300 items-center justify-center w-full h-screen overflow-auto overscroll-contain">
      <CollectionsSection isSidebarOpen={isSidebarOpen} />
    <div>
    </div>
    </div>

  );
};

  export default HomePage;

