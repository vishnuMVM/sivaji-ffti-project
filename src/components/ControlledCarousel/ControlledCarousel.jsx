import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { db, useAuth } from "../../firebase/config";

import { Button } from "@material-tailwind/react";

export default function ControlledCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  const fetchData = async () => {
    const db = getFirestore();
    const colRef = collection(db, "Carousel Images");
    const q = query(colRef, orderBy("createdAt", "desc"));

    try {
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(docs);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCarouselImage = async (imageId) => {
    try {
      await deleteDoc(doc(db, "Carousel Images", imageId));
      setImages(images.filter((img) => img.id !== imageId));

      if (currentIndex >= images.length - 1) {
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex justify-center items-center w-full h-[500px] relative">
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div className="relative w-full max-w-[600px]">
          {images.length > 0 && (
            <div className="relative group">
              <img
                src={images[currentIndex].URL}
                alt={`Slide ${currentIndex}`}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
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

              {/* Delete Button */}
              {currentUser && (
                <button
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => deleteCarouselImage(images[currentIndex].id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
