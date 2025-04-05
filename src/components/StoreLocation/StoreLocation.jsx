import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";

import React from "react";

export default function StoreLocation() {
  const locations = [
    {
      title: "FACTORY LOCATION",
      address: `KRISHNAPURAM 7th ROAD,
BESIDE MANASA SCHOOL LANE,
TADIPATRI,
ANANTAPUR DISTRICT,
Andhra Pradesh, 515411`,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1435.7703883920758!2d78.00912591239586!3d14.902463821202243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xafb5c77aaecd34be!2zMTTCsDU0JzA5LjMiTiA3OMKwMDAnMzMuNSJF!5e0!3m2!1sen!2sin!4v1640076664290!5m2!1sen!2sin",
    },
    {
      title: "OFFICE LOCATION",
      address: `D.No: 16-11-511/C/27
SHALIVAHANA NAGAR,
MOOSARAMBAGH,
MALAKPET,
HYDERABAD,
Telangana, 500036`,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.817026120139!2d78.52201761479614!3d17.372535388087503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98f9da916c19%3A0x6450713303501a5c!2sFFTI%20Sports%20Wear!5e0!3m2!1sen!2sin!4v1640002286131!5m2!1sen!2sin",
    },
  ];

  return (
    <div className="min-h-screen w-full p-8 flex items-center justify-center">
      <div className="container mx-auto max-w-5xl">
        <Typography variant="h2" className="text-center mb-8 text-blue-800 font-bold">
          Our Locations
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <Card key={index} className="shadow-2xl rounded-2xl overflow-hidden">
              <CardBody className="p-6">
                <Typography variant="h4" className="text-center mb-4 text-blue-700 font-semibold">
                  {location.title}
                </Typography>
                <Typography className="text-gray-700 whitespace-pre-line text-center">
                  {location.address}
                </Typography>
              </CardBody>
              <CardFooter className="p-0">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={location.mapUrl}
                    className="w-full h-64" // Set a fixed height for the iframe
                    allowFullScreen=""
                    loading="lazy"
                    title={`${location.title} map`}
                    style={{ border: "0" }} // Remove default iframe border
                  ></iframe>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}