import { Avatar, Card, IconButton, Typography } from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

import { FaWhatsapp } from "react-icons/fa"; // For WhatsApp icon
import React from "react";
import Tooltip from "../GenericComponents/ToolTip"; // Assuming you have this Tooltip component

const ManagementCard = ({ name, title, description, email, phone, whatsapp, image }) => {
  return (
    <Card className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800">
      <Avatar
        src={image}
        alt={name}
        size="xxl"
        className="!border-2 !border-blue-gray-100 shadow-lg cursor-pointer" // Make Avatar clickable
        onClick={() => whatsapp && window.open(`https://wa.me/${whatsapp}`, "_blank")} // Open WhatsApp on click
      />
      <div className="flex-1 text-center md:text-left">
        <Typography variant="h5"  className="mb-2 font-bold text-purple-800">
          {name}
        </Typography>
        <Typography variant="subtitle1" className="mb-4 text-sm text-purple-600">
          {title}
        </Typography>
        <Typography variant="body2"  className="mb-6 italic">
          {description}
        </Typography>
        <div className="flex items-center justify-center md:justify-start gap-4">
          {email && (
            <Tooltip text={`Email ${name}`} placement="top">
              <IconButton
                size="sm"
                color="blue"
                onClick={() => window.open(`mailto:${email}`, "_blank")}
              >
                <EnvelopeIcon className="h-5 w-5 text-red-500" />
              </IconButton>
            </Tooltip>
          )}
          {phone && (
            <Tooltip text={`Call ${name}`} placement="top">
              <IconButton
                size="sm"
                color="green"
                onClick={() => window.open(`tel:${phone}`, "_blank")}
              >
                <PhoneIcon className="h-5 w-5 text-blue-500 font-bold" />
              </IconButton>
            </Tooltip>
          )}
          {whatsapp && (
            <Tooltip text={`WhatsApp ${name}`} placement="top">
              <IconButton
                size="sm"
                color="green"
                onClick={() => window.open(`https://wa.me/${whatsapp}`, "_blank")}
              >
                <FaWhatsapp className="h-5 w-5 text-green-500 font-bold" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </Card>
  );
};

const Management = () => {
  const managementTeam = [
    {
      name: "Reddipalli Sivaji",
      title: "Founder & CEO, FFTI Sports Wear & HCS Solutions",
      description:
        "A visionary leader with a B.Tech in Mechanical Engineering from Osmania University, Hyderabad, Telangana. Driving innovation and growth across FFTI Sports Wear and HCS SOLUTIONS in California, USA.",
      email: "ffti650@gmail.com",
      phone: "+917032014474",
      whatsapp: "+919666614474",
      image: "https://mahimamuralarts.netlify.app/static/media/sivaji.c46f8607b4c245c6320a.jpg",
    },
    {
      name: "Chandagani Mahendra",
      title: "Founder & CEO, FFTI Sports Wear & HCS Solutions",
      description:
        "A strategic thinker holding a Master's degree (MCA). Co-founder and CEO leading FFTI Sports Wear and HCS SOLUTIONS in California, USA. Passionate about technology and sports innovation.",
      email: "mahendrababu699@gmail.com",
      whatsapp: "+919966499915",
      image: "https://mahimamuralarts.netlify.app/static/media/sivaji.c46f8607b4c245c6320a.jpg",
    },
  ];

  return (
    <div className=" w-full h-screen bg-blue-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <Typography variant="h2"  className="text-center mb-12 font-extrabold dark:text-white">
          Our Leadership Team
        </Typography>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2">
          {managementTeam.map((member, index) => (
            <ManagementCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Management;