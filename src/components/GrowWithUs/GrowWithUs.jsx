import { Card, Chip, Typography } from "@material-tailwind/react";

import React from 'react';

export default function GrowWithUsTimeline() {
  const growthSteps = [
    {
      title: "Initial Partnership",
      description: "Begin your journey with us. We'll guide you through the initial setup and onboarding process.",
      date: "Phase 1",
    },
    {
      title: "Strategic Planning",
      description: "Develop a tailored business strategy with our experts. We'll help you identify market opportunities and set achievable goals.",
      date: "Phase 2",
    },
    {
      title: "Operational Support",
      description: "Receive ongoing operational support, including training, marketing resources, and access to our network.",
      date: "Phase 3",
    },
    {
      title: "Growth & Expansion",
      description: "Scale your business with our proven strategies. We'll assist you in expanding your reach and maximizing profitability.",
      date: "Phase 4",
    },
    {
      title: "Advanced Growth",
      description: "Further optimize and expand your business with advanced strategies and tools.",
      date: "Phase 5",
    },
    {
      title: "Leadership & Innovation",
      description: "Become a leader in your market with innovative approaches and continuous improvement.",
      date: "Phase 6",
    },
  ];

  const existingStores = [
    {
      name: "Tadipatri",
      imageUrl: "https://tringcity.in/oc-content/uploads/34/30391.jpg",
    },
    {
      name: "Dharmavaram",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEpYIOPFSm2p-u4_F5T9b2Fye1Fn6ZbVbkAw&s",
    },
    {
      name: "Jagityal",
      imageUrl: "https://images.jdmagicbox.com/comp/jagtial/y2/9999p8724.8724.190722101002.w4y2/catalogue/ffti-sportswear-jagtial-lysj9vbtwz.jpg",
    },
    {
      name: "Proddatur",
      imageUrl: "https://content3.jdmagicbox.com/comp/tadipatri/m9/9999p8558.8558.180208111642.m7m9/catalogue/ffti-sports-wear-reddivaripalem-tadipatri-sportswear-manufacturers-1dbkjxe7sh.jpg",
    },
    {
      name: "Papely, Kurnool",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KexRFFsj1Xnr9msjxUWuU_M4Xdsvtce43Q&s",
    },
    {
      name: "Dilsuknagar, Hyderabad",
      imageUrl: "https://images.jdmagicbox.com/v2/comp/hyderabad/y2/040pxx40.xx40.221117171446.h6y2/catalogue/ffti-sports-wear-dilsukh-nagar-hyderabad-t-shirt-manufacturers-dosa1e16zf.jpg",
    },
  ];

  return (
    <div className="w-full h-screen p-10 overflow-y-auto">
      <div className="text-center mb-12">
        <Typography variant="h1" className="text-4xl font-extrabold text-blue-800 mb-4">
          Your Growth Journey with Us
        </Typography>
        <Typography variant="lead" className="text-lg text-gray-700 max-w-3xl mx-auto">
          Discover the steps to success with our comprehensive franchise support system. We're committed to your growth every step of the way.
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {growthSteps.map((step, index) => (
          <div key={index} className="p-4">
            <Card className="p-6 bg-white shadow-xl rounded-2xl transition-transform hover:scale-105 flex flex-col justify-between">
              <div>
                <Typography variant="h5" className="text-xl font-semibold text-blue-700 mb-2">
                  {step.title}
                </Typography>
                <Typography className="text-gray-600 mb-4">{step.description}</Typography>
              </div>
              <Chip value={step.date} color="blue" className="rounded-full mt-auto" />
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Typography variant="h4" className="text-2xl font-semibold text-blue-800 mb-4">
          Ready to Grow?
        </Typography>
        <Typography className="text-gray-600 mb-6">
          Join our network and start your journey to success.
        </Typography>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors">
          Become a Partner
        </button>
      </div>

      <div className="mt-16">
        <Typography variant="h4" className="text-2xl font-semibold text-blue-800 mb-8 text-center">
          Our Existing Stores
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
          {existingStores.map((store, index) => (
            <div key={index} className="p-4">
              <Card className="p-4 shadow-md rounded-lg flex flex-col items-center">
                <img
                  src={store.imageUrl}
                  alt={store.name}
                  className="w-32 h-32 object-fit mb-4"
                />
                <Typography variant="h6" className="font-semibold">
                  {store.name}
                </Typography>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}