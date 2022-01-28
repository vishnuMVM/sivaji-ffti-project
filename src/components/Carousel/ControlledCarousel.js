import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarouselStyles.css";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db, timestamp, useAuth } from "../firebase/config";
import { TailSpin } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default function ControlledCarousel() {
  const [count, setCount] = useState(0);
  const [documents, setDocuments] = useState([]);
  var [loading, setLoading] = useState(true);
  const currentUser = useAuth();

  useEffect(() => {
    const unsub = getData();
    return unsub;
  }, []);

  useEffect(() => {
    if (count > 0) {
      setTimeout(handleReset, 2000);
    }
  }, [count]);

  const handleReset = (e) => {
    window.location.reload();
    console.log("reset");
  };

  const getData = async () => {
    const db = getFirestore();
    const colRef = collection(db, "Carousel Images");
    const q = query(colRef, orderBy("createdAt", "desc"));
    getDocs(q)
      .then((snapshot) => {
        let docs = [];
        snapshot.docs.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return { documents };
  };

  const deleteCarouselImage = async (imgIndex) => {
    const imageRef = doc(db, "Carousel Images", imgIndex);
    await deleteDoc(imageRef);
    setCount((prev) => prev + 5);
  };

  return ( 
    <>

 {
  loading?<div className="loader"><TailSpin  color="#00BFFF" height={100} width={100} /></div>:
  <div className="offers-carousel carousel-center">
      <Carousel autoPlay={true} pause="hover" interval={2000}>
        {documents.map((image, idx) => (
          <Carousel.Item key={idx}>
            {currentUser && (
              <div className="carousel-img-delete center">
                <button onClick={() => deleteCarouselImage(image.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            )}

            <img className="d-block w-100" src={image.URL} alt="offers" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div> }

     </>  
  );
          
}
