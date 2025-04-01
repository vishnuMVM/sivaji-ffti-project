import * as React from "react";

import { GiAchievement, GiTeamIdea } from "react-icons/gi";
import { IoArrowForwardSharp, IoLocationSharp } from "react-icons/io5";
import { TbCarouselHorizontal, TbCategory, TbCategoryPlus } from "react-icons/tb";
import { logout, useAuth } from "../../firebase/config";

import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import Logo from "../Sidebar/Logo.jpg";
import { LuHandshake } from "react-icons/lu";

const Sidebar = ({ open, setOpen }) => {
  const currentUser = useAuth();
  const isAdmin = currentUser?.email?.length > 0;

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
        <div className="relative">
          <div className={`bg-stone-900 text-black absolute cursor-pointer -right-4 top-9 w-7 rounded-full border-dark-purple ${!open && "rotate-180"}`} onClick={() => { console.log("Toggle clicked, current state:", open); setOpen(!open); }}>
            <IoArrowForwardSharp className="text-white h-6 w-6" />
          </div>
          <Link to='/'>
            <div className="flex gap-x-4 items-center">
              <img src={Logo} className={`cursor-pointer duration-500 w-10 h-10 ${open && "rotate-[360deg]"}`} alt="FFTI Logo" />
              <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>FFTI</h1>
            </div>
          </Link>

          <ul className="pt-6">
            {menuItems.map((Menu, index) => (
              <li key={index} className="flex rounded-md p-2 cursor-pointer hover:bg-slate-300 hover:text-stone-950 text-gray-300 text-sm items-center gap-x-4 mt-2 group relative">
                <Link to={Menu.path} className="flex items-center w-full text-inherit">
                  {React.cloneElement(Menu.icon, { className: `h-6 w-6 mr-2 group-hover:text-stone-950 ${!open && "h-8 w-8"}` })}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.name}</span>
                </Link>
                {!open && (
                  <div className="absolute left-12 bg-gray-800 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {Menu.name}
                  </div>
                )}
              </li>
            ))}

            {isAdmin &&
              adminMenuItems.map((Menu, index) => (
                <li key={index} className="flex rounded-md p-2 cursor-pointer hover:bg-slate-300 hover:text-stone-950 text-gray-300 text-sm items-center gap-x-4 mt-2 group relative">
                  <Link to={Menu.path} className="flex items-center w-full text-inherit">
                    {React.cloneElement(Menu.icon, { className: `h-6 w-6 mr-2 group-hover:text-stone-950 ${!open && "h-8 w-8"}` })}
                    <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.name}</span>
                  </Link>
                  {!open && (
                    <div className="absolute left-12 bg-gray-800 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {Menu.name}
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-auto">
         {isAdmin && <button onClick={handleLogout} className="flex items-center p-2 w-full text-left text-black hover:bg-red-600 hover:text-white rounded-md relative group">
            <BiLogOut className={`h-6 w-6 mr-2 ${!open && "h-8 w-8"}`} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
            {!open && (
              <div className="absolute left-12 bg-gray-800 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Logout
              </div>
            )}
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;