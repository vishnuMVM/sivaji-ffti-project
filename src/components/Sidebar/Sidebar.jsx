import * as React from "react";

import { GiAchievement, GiTeamIdea } from "react-icons/gi";
import { IoArrowForwardSharp, IoLocationSharp } from "react-icons/io5";
import { TbCarouselHorizontal, TbCategory, TbCategoryPlus } from "react-icons/tb";
import { logout, useAuth } from "../../firebase/config"; // Import authentication functions

import { BiLogOut } from "react-icons/bi"; // Logout icon
import { Link } from "react-router-dom";
import Logo from "../Sidebar/Logo.jpg";
import { LuHandshake } from "react-icons/lu";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const currentUser = useAuth();

  const isAdmin = currentUser?.email?.length > 0 // Check if the user has email value

  const menuItems = [
    { name: "Achievements", icon: <GiAchievement className="h-6 w-6 mr-2 group-hover:text-stone-950" />, path: "/achievements" },
    { name: "Grow With Us", icon: <LuHandshake className="h-6 w-6 mr-2 group-hover:text-stone-950" />, path: "/grow-with-us" },
    { name: "Store Location", icon: <IoLocationSharp className="h-6 w-6 mr-2 group-hover:text-stone-950" />, path: "/store-location" },
    { name: "Management", icon: <GiTeamIdea className="h-6 w-6 mr-2 group-hover:text-stone-950" />, path: "/management" },
  ];

  const adminMenuItems = [
    { name: "Add New Collection", icon: <TbCategoryPlus className="h-6 w-6 mr-2 group-hover:text-stone-950" />, path: "/admin/add-new-collection" },
    { name: "Manage Collections", icon: <TbCategory className="h-6 w-6 mr-2 group-hover:text-stone-950" />, path: "/admin/manage-collections" },
    { name: "Manage Carousel", icon: <TbCarouselHorizontal className="h-6 w-6 mr-2 group-hover:text-stone-950" />, path: "/admin/manage-carousel" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert("Error logging out!");
    }
  };

  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-20"} bg-black h-screen p-5 pt-8 relative duration-300 flex flex-col justify-between`}>
        {/* Toggle Button */}
        <div className="relative">
          <div className={`bg-stone-900 text-black absolute cursor-pointer -right-4 top-9 w-7 rounded-full border-dark-purple ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}>
            <IoArrowForwardSharp className="text-white h-6 w-6" />
          </div>
          {/* Logo and Title */}
          <div className="flex gap-x-4 items-center">
            <img src={Logo} className={`cursor-pointer duration-500 w-10 h-10 ${open && "rotate-[360deg]"}`} alt="FFTI Logo" />
            <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>FFTI</h1>
          </div>

          {/* Menu Items */}
          <ul className="pt-6">
            {menuItems.map((Menu, index) => (
              <li key={index} className="flex rounded-md p-2 cursor-pointer hover:bg-slate-300 hover:text-stone-950 text-gray-300 text-sm items-center gap-x-4 mt-2 group">
                <Link to={Menu.path} className="flex items-center w-full text-inherit">
                  {Menu.icon}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.name}</span>
                </Link>
              </li>
            ))}

            {/* Show Admin Menu Only If User Is Admin */}
            {isAdmin &&
              adminMenuItems.map((Menu, index) => (
                <li key={index} className="flex rounded-md p-2 cursor-pointer hover:bg-slate-300 hover:text-stone-950 text-gray-300 text-sm items-center gap-x-4 mt-2 group">
                  <Link to={Menu.path} className="flex items-center w-full text-inherit">
                    {Menu.icon}
                    <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center p-2 w-full text-left text-black hover:bg-red-600 hover:text-white rounded-md">
            <BiLogOut className="h-6 w-6 mr-2" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
