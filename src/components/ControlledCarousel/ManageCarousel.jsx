// import { Button, Card, CardBody, Spinner, Typography } from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import { Storage, db, timestamp } from "../../firebase/config";
// import { addDoc, collection } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// import Dropzone from "react-dropzone";

// export default function ManageCarousel() {
//   const [carouselImage, setCarouselImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (count > 0) {
//       setTimeout(() => window.location.reload(), 2000);
//     }
//   }, [count]);

//   const handleUpload = async () => {
//     if (!carouselImage) return;

//     setLoading(true);
//     const storageRef = ref(Storage, `Carousel Images/${carouselImage.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, carouselImage);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setProgress(prog);
//       },
//       (error) => console.log(error),
//       async () => {
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//         await addDoc(collection(db, "Carousel Images"), {
//           URL: downloadURL,
//           createdAt: timestamp,
//         });
//         setLoading(false);
//         setCarouselImage(null);
//         setCount((prev) => prev + 5);
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <Card className="w-full max-w-lg p-6 bg-white shadow-xl rounded-xl">
//         <CardBody className="text-center">
//           <Typography variant="h4" color="blue-gray" className="mb-4 font-bold">
//             Manage Carousel
//           </Typography>

//           <Dropzone
//             onDrop={(acceptedFiles) => {
//               setCarouselImage(Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) }));
//             }}
//             accept="image/*"
//             multiple={false}
//           >
//             {({ getRootProps, getInputProps }) => (
//               <div
//                 {...getRootProps()}
//                 className="border-2 border-dashed border-blue-500 p-6 text-center cursor-pointer bg-blue-50 rounded-lg hover:bg-blue-100"
//               >
//                 <input {...getInputProps()} />
//                 <Typography variant="small" color="blue-gray">
//                   Drag & drop an image here, or click to select one
//                 </Typography>
//               </div>
//             )}
//           </Dropzone>

//           {carouselImage && (
//             <div className="mt-4">
//               <img src={carouselImage.preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto" />
//             </div>
//           )}

//           <div className="mt-6">
//             <Button onClick={handleUpload} color="blue" disabled={!carouselImage || loading} className="w-full">
//               {loading ? <Spinner className="h-5 w-5" /> : "Upload Image"}
//             </Button>
//           </div>

//           {progress > 0 && !loading && (
//             <Typography variant="small" color="blue-gray" className="mt-2">
//               Upload Progress: {Math.round(progress)}%
//             </Typography>
//           )}
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

import { Button, Card, CardBody, Spinner, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Storage, db, timestamp } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Dropzone from "react-dropzone";

export default function ManageCarousel() {
  const [carouselImage, setCarouselImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [count]);

  const handleUpload = async () => {
    if (!carouselImage) return;

    setLoading(true);
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
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "Carousel Images"), {
          URL: downloadURL,
          createdAt: timestamp,
        });
        setLoading(false);
        setCarouselImage(null);
        setCount((prev) => prev + 5);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* User Guide Section */}
      <div className="w-full text-center mb-8">
        <Typography variant="h3" color="blue-gray" className="font-bold">
          Manage Carousel Images
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-2 text-lg">
          Upload high-quality widescreen images to display in the carousel. You can drag & drop or select multiple images at once.
        </Typography>
      </div>

      {/* Main Upload Section */}
      <Card className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-xl">
        <CardBody className="text-center">
          <Dropzone
            onDrop={(acceptedFiles) => {
              setCarouselImage(Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) }));
            }}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-blue-500 p-8 text-center cursor-pointer bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
              >
                <input {...getInputProps()} />
                <Typography variant="h6" color="blue-gray">
                  Drag & drop an image here, or click to select one
                </Typography>
                <Typography variant="small" color="gray" className="mt-1">
                  Supports JPG, PNG, and other common formats.
                </Typography>
              </div>
            )}
          </Dropzone>

          {/* Image Preview (Widescreen) */}
          {carouselImage && (
            <div className="mt-6">
              <img
                src={carouselImage.preview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg shadow-md mx-auto"
              />
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-6">
            <Button onClick={handleUpload} color="blue" disabled={!carouselImage || loading} className="w-full">
              {loading ? <Spinner className="h-5 w-5" /> : "Upload Image"}
            </Button>
          </div>

          {/* Upload Progress */}
          {progress > 0 && !loading && (
            <Typography variant="small" color="blue-gray" className="mt-2">
              Upload Progress: {Math.round(progress)}%
            </Typography>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
