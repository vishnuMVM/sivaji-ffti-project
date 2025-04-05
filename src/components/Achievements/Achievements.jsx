import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import React from "react";
import article from "./article.jpg";

export default function Achievements() {
  const achievementText = [
    {
      title: "Leadership & Vision",
      text: "Leaders forge their own path, unlike followers. Reddipalli Sivaji and Chandagani Mahendra epitomize this spirit.",
    },
    {
      title: "Self-Made Success",
      text: "From student earnings to entrepreneurial heights, their journey from Hyderabad is a testament to their ambition.",
    },
    {
      title: "Industry Pioneers",
      text: "Recognizing the enduring nature of textiles, they launched FFTI in 2012, becoming market leaders while empowering women.",
    },
    {
      title: "Employment Creators",
      text: "Their entrepreneurial mindset has directly and indirectly created jobs for 200 people, fostering community growth.",
    },
  ];

  return (
    <div className="h-screen w-full p-8 overflow-y-auto">
      <div className="container mx-auto max-w-5xl">
        <Typography
          variant="h1"
          className="text-center mb-12 text-blue-800 font-extrabold"
        >
          Futures First Texties India Achievements
        </Typography>

        <div className="mb-12">
          {achievementText.map((item, index) => (
            <Card key={index} className="mb-6 p-4 shadow-md rounded-lg bg-white">
              <CardBody>
                <Typography variant="h5" className="mb-2 text-blue-700 font-semibold">
                  {item.title}
                </Typography>
                <Typography variant="body2" className="text-gray-700 leading-relaxed">
                  {item.text}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>

        <a
          href="https://www.youtube.com/watch?v=qYu7bOXI0bk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="p-3 mb-12 max-w-2xl mx-auto ">
            <Card className="shadow-2xl rounded-2xl overflow-hidden">
              <CardBody>
                <Typography
                  variant="h5"
                  className="mb-4 text-blue-700 font-semibold"
                >
                  Founders Interview on Signature Studio
                </Typography>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="https://img.youtube.com/vi/qYu7bOXI0bk/0.jpg"
                    alt="Founders Interview"
                    className="w-full h-full"
                  />
                </div>
              </CardBody>
              <CardFooter className="pt-2">
                <Typography variant="body2">
                  Interviewed by: Signature Studio (1.08M Subscribers)
                </Typography>
              </CardFooter>
            </Card>
          </div>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 h-60 mb-12 gap-4">
          <Card className="shadow-2xl rounded-2xl overflow-hidden">
            <CardBody>
              <Typography
                variant="h5"
                className="mb-4 text-blue-700 font-semibold"
              >
                Media Recognized FFTI Services (Pandemic)
              </Typography>
              <div className="aspect-w-16 aspect-h-9">
                <embed
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/tz171FyvwO4"
                  title="Media Recognition"
                />
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-2xl rounded-2xl overflow-hidden">
            <CardBody>
              <Typography
                variant="h5"
                className="mb-4 text-blue-700 font-semibold"
              >
                Enclothed Sports Outfit for YCP Cricket Cup
              </Typography>
              <div className="aspect-w-16 aspect-h-9">
                <embed
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/h1wAmA68bqI"
                  title="YCP Cricket Cup"
                />
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="shadow-2xl rounded-2xl overflow-hidden">
          <CardBody>
            <Typography
              variant="h5"
              className="mb-4 text-blue-700 font-semibold"
            >
              Featured in Research Article
            </Typography>
            <img src={article} alt="Article Preview" className="w-full mb-4" />
            <Typography variant="body2">
              Featured in a Research Article by journalijcir.com. They made a
              case study on our FFTI Sports.{" "}
              <a
                href="https://firebasestorage.googleapis.com/v0/b/lokesh-vishnu-consignment.appspot.com/o/Article%2F00581-A-2017.pdf?alt=media&token=9e9f8f9f-1220-4844-8cbd-b4afc7a5c378"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Read here
              </a>
              .
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}