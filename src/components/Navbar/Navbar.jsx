import * as React from "react";

import {
  Accordion,
  Avatar,
  Collapse,
  IconButton,
  List,
  Menu,
  Navbar,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { GiAchievement, GiTeamIdea } from "react-icons/gi";
import {
  LogOut,
  Menu as MenuIcon,
  NavArrowDown,
  Xmark,
} from "iconoir-react";
import { TbCarouselHorizontal, TbCategory, TbCategoryPlus } from "react-icons/tb";
import { logout, useAuth } from "../../firebase/config"; // Import authentication functions

import { IoLocationSharp } from "react-icons/io5";
import Logo from "../Sidebar/Logo.jpg";
import { LuHandshake } from "react-icons/lu";
import { useState } from "react";

export default function ComplexNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const currentUser = useAuth();
  const isAdmin = currentUser?.email?.length > 0;

  const menuItems = [
    { name: "Achievements", icon: <GiAchievement className="h-4 w-4" />, path: "/achievements" },
    { name: "Grow With Us", icon: <LuHandshake className="h-4 w-4" />, path: "/grow-with-us" },
    { name: "Store Location", icon: <IoLocationSharp className="h-4 w-4" />, path: "/store-location" },
    { name: "Management", icon: <GiTeamIdea className="h-4 w-4" />, path: "/management" },
  ];

  const adminMenuItems = [
    { name: "Add New Collection", icon: <TbCategoryPlus className="h-4 w-4" />, path: "/admin/add-new-collection" },
    { name: "Manage Collections", icon: <TbCategory className="h-4 w-4" />, path: "/admin/manage-collections" },
    { name: "Manage Carousel", icon: <TbCarouselHorizontal className="h-4 w-4" />, path: "/admin/manage-carousel" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert("Error logging out!");
    }
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="w-screen p-0 bg-black text-gray-300">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={Logo} className={`cursor-pointer duration-500 w-10 h-10`} alt="FFTI Logo" />
          <Typography
            type="small"
            className="ml-2 font-semibold text-white"
          >
            FFTI
          </Typography>
        </div>
        <div className="hidden lg:flex items-center">
          <List className="mt-4 flex flex-col gap-1 lg:mt-0 lg:flex-row lg:items-center">
            {isAdmin && (
              <Tooltip placement="bottom" interactive>
                <Tooltip.Trigger>
                  <List.Item className="text-gray-300">
                    <List.ItemStart className="me-1.5">
                      <TbCategoryPlus className="h-4 w-4" />
                    </List.ItemStart>
                    <Typography type="small">Admin Pages</Typography>
                    <List.ItemEnd className="ps-0.5">
                      <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                    </List.ItemEnd>
                  </List.Item>
                </Tooltip.Trigger>
                <Tooltip.Content className="grid max-w-lg grid-cols-1 gap-1 rounded-lg border border-surface bg-black p-1 shadow-xl shadow-surface/5 dark:border-surface dark:bg-black">
                  <ul className="!m-0">
                    {adminMenuItems.map((menu, index) => (
                      <li key={index}>
                        <Typography onClick={() => window.location.href = menu.path} className="flex items-center p-2 hover:bg-slate-300 hover:text-stone-950 cursor-pointer">
                          <List.ItemStart className="me-1.5">
                            {menu.icon}
                          </List.ItemStart>
                          <Typography type="small">{menu.name}</Typography>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip>
            )}
            {menuItems.map((menu, index) => (
              <List.Item key={index} className="text-gray-300">
                <Typography onClick={() => window.location.href = menu.path} className="flex items-center p-2 hover:bg-slate-300 hover:text-stone-950 cursor-pointer">
                  <List.ItemStart className="me-1.5">
                    {menu.icon}
                  </List.ItemStart>
                  <Typography type="small">{menu.name}</Typography>
                </Typography>
              </List.Item>
            ))}
          </List>
        </div>
        <IconButton
          size="sm"
          variant="ghost"
          color="secondary"
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto mr-2 grid lg:hidden"
        >
          {openNav ? <Xmark className="h-4 w-4 text-white" /> : <MenuIcon className="h-4 w-4 text-white" />}
        </IconButton>
        <Menu>
          <Menu.Trigger
            as={Avatar}
            src={Logo}
            alt="profile-picture"
            size="sm"
            className="border border-primary p-0.5 lg:ml-auto"
          />
          <Menu.Content className="bg-black text-gray-300">
            <Menu.Item
              className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-[18px] w-[18px]" />
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto p-4">
          <Accordion>
            {isAdmin && (
              <Accordion.Item value="adminPages" className="mt-2 border-none bg-black text-gray-300">
                <Accordion.Trigger className="p-0">
                  <List.Item className="w-full text-gray-300">
                    <List.ItemStart className="me-1.5">
                      <TbCategoryPlus className="h-4 w-4" />
                    </List.ItemStart>
                    <Typography type="small">Admin Pages</Typography>
                    <List.ItemEnd className="ps-1">
                      <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                    </List.ItemEnd>
                  </List.Item>
                </Accordion.Trigger>
                <Accordion.Content className="bg-black text-gray-300">
                  {adminMenuItems.map((menu, index) => (
                    <Typography key={index} onClick={() => window.location.href = menu.path} className="flex items-center p-2 hover:bg-slate-300 hover:text-stone-950 cursor-pointer">
                      <List.ItemStart className="me-1.5">
                        {menu.icon}
                      </List.ItemStart>
                      <Typography type="small">{menu.name}</Typography>
                    </Typography>
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            )}
          </Accordion>
          {menuItems.map((menu, index) => (
            <List.Item key={index} className="text-gray-300">
              <Typography onClick={() => window.location.href = menu.path} className="flex items-center p-2 hover:bg-slate-300 hover:text-stone-950 cursor-pointer">
                <List.ItemStart className="me-1.5">
                  {menu.icon}
                </List.ItemStart>
                <Typography type="small">{menu.name}</Typography>
              </Typography>
            </List.Item>
          ))}
        </div>
      </Collapse>
    </Navbar>
  );
}