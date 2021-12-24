import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  var imagesArray = [
    "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHVwcHl8ZW58MHx8MHx8&w=1000&q=80",
    "https://hips.hearstapps.com/countryliving.cdnds.net/17/47/1511194376-cavachon-puppy-christmas.jpg",
    "https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1133605325-scaled-e1617227898456.jpg",

  ];

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    console.log(index);
  };
  return (
    <div className="center" style={{width:"80%"}}>
      <Carousel style={{zIndex:"-1"}} autoPlay={true} interval={1000}>
        {imagesArray.map((image,idx) => (
          <Carousel.Item key={idx}>
            <img key={idx} onClick={()=>{console.log(idx)}} className="d-block w-100" src={image} alt="offers" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
