import { GiAchievement, GiTeamIdea } from "react-icons/gi";

import { IoArrowForwardSharp } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import Logo from '../Sidebar/Logo.jpg'
import { LuHandshake } from "react-icons/lu";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const menuItems = [
    { name: "Achievements", icon: <GiAchievement className="h-6 w-6 group-hover:text-stone-950" /> },
    { name: "Grow With Us", icon: <LuHandshake className="h-6 w-6 group-hover:text-stone-950" /> },
    { name: "Store Location", icon: <IoLocationSharp className="h-6 w-6 group-hover:text-stone-950" /> },
    { name: "Management", icon: <GiTeamIdea className="h-6 w-6 group-hover:text-stone-950" /> },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20"
        } bg-black h-screen p-5 pt-8 relative duration-300`}
      >
      <div className={`bg-stone-900 text-black absolute cursor-pointer -right-3 top-9 w-7 rounded-full border-dark-purple ${
            !open && "rotate-180"
          }`} onClick={() => setOpen(!open)}>
      <IoArrowForwardSharp className="text-white h-6 w-6" /> 
      </div>
        <div className="flex gap-x-4 items-center">
          <img
          src={Logo}
            className={`cursor-pointer duration-500 w-10 h-10 ${
              open && "rotate-[360deg]"
            }`}
            alt="Smiley"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            FFTI
          </h1>
        </div>
        <ul className="pt-6">
          {menuItems.map((Menu, index) => (
            <div
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-300 hover:text-stone-950 text-gray-300 text-sm items-center gap-x-4 mt-2 group ${
                index === 0 && "bg-light-white"
              }`}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.name}
              </span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
