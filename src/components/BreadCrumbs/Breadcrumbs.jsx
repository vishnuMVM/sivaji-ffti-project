import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb as MTBreadcrumb, Typography } from "@material-tailwind/react";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";

function Breadcrumbs({ paths }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <MTBreadcrumb separator={<ArrowRightIcon className="h-4 w-4" />} className="bg-transparent p-0">
      {paths.map((path, index) => (
        <Typography
          key={index}
          variant="small"
          color="blue-gray"
          className={`font-medium cursor-pointer ${
            index < paths.length - 1 ? "hover:text-blue-500 inline-flex items-center cursor-pointer" : "text-stone-800 cursor-pointer inline-flex items-center pointer-events-none"
          }`}
          onClick={(e) => {
            if (index < paths.length - 1) {
              e.preventDefault();
              handleNavigate(path.link);
            }
          }}
        >
          <Link to={path.link} className="hidden">
            {/* This Link is for prefetching and accessibility, but hidden */}
            {path.name}
          </Link>
          {path.name}
          {index < paths.length - 1 && <ArrowRightIcon className="h-4 w-4 ml-1" />}
        </Typography>
      ))}
    </MTBreadcrumb>
  );
}

export default Breadcrumbs;