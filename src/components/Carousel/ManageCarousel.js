
import React, { useState, useRef,useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Storage, db, timestamp } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Categories/AllCategories.css"

export default function ManageCarousel() {
  const [carouselImage, setCarouselImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  var [isFileSelected, setIsFileSelected] = useState(false);
  const [count,setCount] = useState(0)

  const nameRef = useRef();

  useEffect(()=>{
    if (count>0){
      setTimeout(handleReset,2000)

    }
  },[count])

  const handleReset = (e) => {
    window.location.reload();
    console.log('reset')
  };

  const handleUpload = async () => {
    if (carouselImage.length !== 0) {
      const storageRef = ref(Storage, `Carousel Images/${carouselImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, carouselImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "Carousel Images"), {
              URL: downloadURL,
              createdAt: timestamp,
              // name:carouselImage
            });
            setLoading(true);
            setIsFileSelected(false);
            console.log(carouselImage);
            setCount(prev=>prev+=5)
          });
        }
      );
    } else {
      toast.error("Upload your File ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert("Upload File and Enter Category Name");
    }
  };

  const previewImage = (
    <div style={isFileSelected ? { display: "block" } : { display: "none" }}>
      <img
        src={carouselImage.preview}
        style={{ width: "200px" }}
        alt="preview"
      />
    </div>
  );

  return (
    <div className="dropzone-div">
    <h2>Add Carousel Images Here</h2>
    <div style={{padding:"10px"}}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          var obj = Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          });
          setIsFileSelected(true);
          console.log(isFileSelected);
          setCarouselImage(obj);
        }}
      >
        {({ getRootProps, getInputProps }) => (
            <div className="input-div"
              {...getRootProps()}
            >
            <div className="center">
              <input className="input-field" {...getInputProps()} />
              <p><em>Add only Single Image or Drag/Drop a single Image</em></p>
              </div>
           
            </div>

        )}
      </Dropzone>
      </div>
      <div className="preview-Images">{previewImage}</div>
      <button className="upload-btn" onClick={handleUpload}>
          Upload Image
        </button>
      {/* {loading ? (
        <Link to="/">
        <button className="upload-btn">
          View Collections
        </button>  </Link>
      ) : (
        <button className="upload-btn" onClick={handleUpload}>
          Upload Image
        </button>
      )} */}
      <ToastContainer />
    </div>
  );
}
