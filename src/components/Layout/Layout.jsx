import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <div className={` ${open ? "w-72" : "w-20"} bg-black h-screen p-5 pt-8 relative duration-300`}>
        <Sidebar open={open} setOpen={setOpen} />
      </div>
      <div className={`flex-1 h-full overflow-hidden ${open ? "ml-72" : "ml-20"} w-full`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;