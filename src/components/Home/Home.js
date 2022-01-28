import React from "react";
import Slider from "react-carousel-responsive";
import "react-carousel-responsive/dist/styles.css";
import CollectionsDiv from "../CollectionsDiv";
import ControlledCarousel from "../Carousel/ControlledCarousel";
import "./Home.css";


export default function Home() {

  return (
    <div className="home" >
         <ControlledCarousel />
      <CollectionsDiv />
     
    </div>
  );
}
