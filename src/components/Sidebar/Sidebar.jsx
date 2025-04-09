import * as React from "react";

import { GiAchievement, GiClothes, GiTeamIdea } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { TbCarouselHorizontal, TbCategory, TbCategoryPlus } from "react-icons/tb";
import { logout, useAuth } from "../../firebase/config";

import { BiLogOut } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import Logo from "../Sidebar/Logo.jpg";
import { LuHandshake } from "react-icons/lu";

const Sidebar = () => {
  const currentUser = useAuth();
  const isAdmin = currentUser?.email?.length > 0;
  const location = useLocation();
  const currentPath = location.pathname;

  const [hovered, setHovered] = React.useState(false);

  // Common classes
  const menuItemClasses =
    "flex rounded-md cursor-pointer text-gray-300 text-sm items-center gap-x-4 group relative transition-all duration-200";
  const iconClass = `h-6 w-6 mr-2 group-hover:text-stone-950`;
  const tooltipClass =
    "absolute left-12 bg-gray-800 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200";
  const activeMenuClasses = "bg-purple-300 text-stone-950";

  const menuItems = [
    { name: "Collections", icon: <GiClothes />, path: "/collections" },
    { name: "Achievements", icon: <GiAchievement />, path: "/achievements" },
    { name: "Grow With Us", icon: <LuHandshake />, path: "/grow-with-us" },
    { name: "Store Location", icon: <IoLocationSharp />, path: "/store-location" },
    { name: "Management", icon: <GiTeamIdea />, path: "/management" },
  ];

  const adminMenuItems = [
    { name: "Add New Collection", icon: <TbCategoryPlus />, path: "/admin/add-new-collection" },
    { name: "Manage Collections", icon: <TbCategory />, path: "/admin/manage-collections" },
    { name: "Manage Carousel", icon: <TbCarouselHorizontal />, path: "/admin/manage-carousel" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert("Error logging out!");
    }
  };

  const renderMenuItem = (Menu) => {
    const isActive = currentPath === Menu.path;
    return (
      <li
        key={Menu.name}
        className={`${menuItemClasses} ${hovered ? "p-2 mb-1" : "p-1 mb-2"} ${
          isActive ? activeMenuClasses : "hover:bg-purple-300 hover:text-purple-950"
        }`}
      >
        <Link to={Menu.path} className="flex items-center w-full text-inherit">
          {React.cloneElement(Menu.icon, {
            className: `${iconClass} ${!hovered ? "h-8 w-8" : ""}`,
          })}
          <span className={`${!hovered && "hidden"} origin-left duration-200`}>{Menu.name}</span>
        </Link>
        {!hovered && <div className={tooltipClass}>{Menu.name}</div>}
      </li>
    );
  };

  return (
    <div className="flex z-50">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`${
          hovered ? "w-72" : "w-20"
        } bg-purple-950 h-screen p-5 pt-8 relative duration-300 flex flex-col justify-between`}
      >
        {/* Sidebar Header */}
        <div className="relative">
          <Link to="/">
            <div className="flex gap-x-4 items-center">
              <img
                src={Logo}
                className={`cursor-pointer duration-500 rounded-full w-10 h-10 ${
                  hovered && "rotate-[360deg]"
                }`}
                alt="FFTI Logo"
              />
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !hovered && "scale-0"
                }`}
              >
                FFTI
              </h1>
            </div>
          </Link>

          {/* Menu Items */}
          <ul className="pt-6">
            {menuItems.map(renderMenuItem)}
            {isAdmin && adminMenuItems.map(renderMenuItem)}
          </ul>
        </div>

        {/* Logout */}
        <div className="mt-auto">
          {isAdmin && (
            <button
              onClick={handleLogout}
              className="flex items-center p-2 w-full text-left text-black hover:bg-red-600 hover:text-white rounded-md relative group"
            >
              <BiLogOut className={`h-6 w-6 mr-2 ${!hovered && "h-8 w-8"}`} />
              <span className={`${!hovered && "hidden"} origin-left duration-200`}>Logout</span>
              {!hovered && <div className={tooltipClass}>Logout</div>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;