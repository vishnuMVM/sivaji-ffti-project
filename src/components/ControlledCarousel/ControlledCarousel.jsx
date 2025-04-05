import React, { useEffect, useState } from "react";

import { fetchCarouselImages } from "../../services/getCarouselImages";

export default function ControlledCarousel({ isSidebarOpen }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCarouselImages = async () => {
      const {images,loading} = await fetchCarouselImages();
      setImages(images);
      setLoading(loading);
    }
    getCarouselImages()
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={`flex flex-1 justify-center mb-4 relative max-h-screen`}>
      {loading ? (
        <div className="text-center text-lg flex justify-center font-semibold">Loading...</div>
      ) : (
        <div className="relative m-4 pt-10">
          {images?.length > 0 && (
            <div className="relative group mt-2 max-w-2xl">
              <img
                src={images[currentIndex].URL}
                alt={`Slide ${currentIndex}`}
                className="rounded-lg shadow-lg max-w-lg max-h-lg"
              />

              {/* Previous Button */}
              <button
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-900 text-white p-3 rounded-full transition-transform duration-200 ease-in-out"
                onClick={prevSlide}
              >
                &#10094;
              </button>

              {/* Next Button */}
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-900 text-white p-3 rounded-full transition-transform duration-200 ease-in-out"
                onClick={nextSlide}
              >
                &#10095;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
