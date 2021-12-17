import React from "react";
import Slider from "react-carousel-responsive";
import "react-carousel-responsive/dist/styles.css";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      {/* --------- Carousel Div ----------- */}
      <div className="carousel-Div center">
        <Slider
          autoplay="true"
          autoplaySpeed="2000"
          speed="1000"
          pauseOnHover="true"
        >
          <img
            src="https://res.cloudinary.com/leonisa/image/upload/q_auto,f_auto,w_auto,dpr_1.5,c_scale/assets/1/7/Visiture/Gym_Outfits_for_Men_Wear_Working_Out_1920x1000.jpg"
            alt=""
          />
          <img
            src="http://happyindiareadymades.weebly.com/uploads/6/1/3/7/61373427/9075673_orig.jpg"
            alt=""
          />
          <img
            src="https://www.beyoung.in/api/cache/catalog/PurvaCustomerReview/Casual%20T%20shirt/mobileView_men_graphic_category_banner_767x430.jpg"
            alt=""
          />
          <img
            src="https://img.mensxp.com/media/shop/template/2021/oct/mobile-01-1633603894.jpeg"
            alt=""
          />
        </Slider>
      </div>

      {/*-------Collections Div --------*/}

      <div className="center" style={{ width: "100%", textAlign: "center" }}>
        <h1> Our Collections </h1>
      </div>

      <div className="collections center">
        <div className="collection-items">
          <img
            className="collection-img"
            src="https://i.pinimg.com/originals/60/b0/a4/60b0a4ee7e032a6281444a82705a665c.jpg"
            alt="Shorts"
          ></img>
          <h4>Shorts</h4>
        </div>

        <div className="collection-items">
          <img
            className="collection-img"
            src="https://res.cloudinary.com/trunk-club/image/upload/f_auto,q_auto/Blog/19021_May_OutfitsForBodytypes_Blog_Inline_TCM_Rectangle_00.jpg"
            alt="Casuals"
          ></img>
          <h4>Casuals</h4>
        </div>

        <div className="collection-items">
          <img
            className="collection-img"
            src="https://cdn.shopify.com/s/files/1/0399/5513/6679/products/2_1080x.png?v=1629359182"
            alt="T-Shirts"
          ></img>
          <h4>T- shirts</h4>
        </div>

        <div className="collection-items">
          <img
            className="collection-img"
            src="https://www.thernm.com/wp-content/uploads/2021/09/Adobe_Post_20210919_1232430.9747158032219189.png"
            alt="track pants"
          ></img>

          <h4>Track Pants</h4>
        </div>

        <div className="collection-items">
          <img
            className="collection-img"
            src="https://i.pinimg.com/originals/a9/63/2e/a9632ea2bb1b0f6c45636f12b79d74f9.jpg"
            alt="Gym Wear"
          ></img>
          <h4>Gym Wear</h4>
        </div>
      </div>
    </div>
  );
}
