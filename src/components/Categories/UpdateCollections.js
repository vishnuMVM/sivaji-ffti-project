import React, { useState } from "react";
import { useDropzone } from "react-dropzone"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Storage, db, timestamp } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../firebase/config";

export default function UpdateCollections (props){

  const [files,setFiles] = useState([])
  const [progress, setProgress] = useState(0);


  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const uploadMultipleImages = () =>{
   if (files.length !== 0 ) {
    files.map((image)=>{
    const storageRef = ref(Storage, `${props.name}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
     uploadTask.on(
      "state_changed",
      (snapshot) => {
        let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => console.log(error),

      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, props.name), {
            name: image.name,
            URL: downloadURL,
            createdAt: timestamp,
          });
          // console.log(progress);
          // addDocWithID()
          setFiles([])
        });
      },
    );

   })
} else {
  alert('No File Found')
}

}



  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))


  return(
    <div className="dropzone-div">

    <h2>Update {props.name} Collection Here</h2>

    <div className="input-div" {...getRootProps()} style={{"width" : "100%", "height" : "100px", "border" : "1px dashed black","textAlign":"center"}} >
        <input {...getInputProps()} />
        <br></br>
        <h3>Drop files here</h3>
      
      </div>
      <div className='preview-Images'>{images}</div>

      <button className="upload-btn" onClick={uploadMultipleImages}>Upload Images</button>


    </div>


  )

}