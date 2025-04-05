import React from "react";
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="fixed bottom-0 left-0 w-full bg-purple-50 text-purple-800 pt-5 z-10"
      style={{ lineHeight: "1.2", padding: "0.5rem 0" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center flex-col sm:flex-row">
          <Typography
            variant="small"
            className="text-xs text-center sm:text-left mb-1 sm:mb-0"
          >
            FFTI Sports Hyd Dilsukhnagar
          </Typography>
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
            <Typography variant="small" color="blue-gray" className="text-xs mr-4">
              &copy; {currentYear}
            </Typography>
            <Typography
              variant="small"
              className="text-xs text-purple-700 mr-4"
            >
              Developed by Lokesh and Vishnu
            </Typography>
            <Typography
              variant="small"
              className="text-xs text-purple-700 hover:text-blue-700 transition-colors mr-4"
            >
              Email:{" "}
              <a href="mailto:ffti650@gmail.com" className="inline-block">
                ffti650@gmail.com
              </a>
            </Typography>
            <Typography variant="small" className="text-xs text-purple-700">
              Phone: 9848022338
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;