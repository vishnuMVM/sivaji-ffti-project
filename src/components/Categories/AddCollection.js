import React, { useState, useRef,useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Storage, db, timestamp } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCollection() {
  const [categoryImage, setCategoryImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  var [isFileSelected, setIsFileSelected] = useState(false);
  const [count,setCount] = useState(0)

  const nameRef = useRef();

  const handleCategoryName = (e) => {
    var name = e.target.value;
    setCategoryName(name);
  };
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
    if (categoryImage.length !== 0 && categoryName !== "") {
      const storageRef = ref(Storage, `All Categories/${categoryImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, categoryImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "All Categories"), {
              URL: downloadURL,
              createdAt: timestamp,
              name: categoryName,
              // name:categoryImage
            });
            nameRef.current.value = "";
            // alert("Your Image is Uploaded");
            setLoading(true);
            setIsFileSelected(false);
            console.log(categoryImage);
            setCount(prev=>prev+=5)
          });
        }
      );
    } else {
      toast.error("Upload both File & Category Name", {
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
        src={categoryImage.preview}
        style={{ width: "200px" }}
        alt="preview"
      />
    </div>
  );

  return (
    <div className="dropzone-div">
    <div style={{padding:"10px"}}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          var obj = Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          });
          setIsFileSelected(true);
          console.log(isFileSelected);
          setCategoryImage(obj);
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
      <label>
      <span> <strong>Enter Category Name Here : </strong></span> 
      <input className="input-field" type="text" placeholder="Enter Category Name" required ref={nameRef} onChange={handleCategoryName} />
      </label>
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
