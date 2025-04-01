import {
  Button,
  Card,
  CardBody,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Storage, db, timestamp } from "../../firebase/config";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import CustomDialog from "../CustomAlert/CustomDialog";
import Dropzone from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { fetchCarouselImages } from "../../services/getCarouselImages";
import { useAuth } from "../../firebase/config";

export default function ManageCarousel({ isSidebarOpen }) {
  const [carouselImage, setCarouselImage] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [existingCarouselImages, setExistingCarouselImages] = useState([]);
  const [deleteImageId, setDeleteImageId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [count]);

  useEffect(() => {
    const getCarouselImages = async () => {
      const { images } = await fetchCarouselImages();
      setExistingCarouselImages(images);
    };
    getCarouselImages();
  }, []);

  const handleUpload = async () => {
    if (!carouselImage) return;

    setUploadingStatus(true);
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
        setUploadingStatus(false);
        setCarouselImage(null);
        setCount((prev) => prev + 5);
      }
    );
  };

  const deleteCarouselImage = async (imageId) => {
    try {
      await deleteDoc(doc(db, "Carousel Images", imageId));
      setExistingCarouselImages(
        existingCarouselImages.filter((image) => image.id !== imageId)
      );
      setShowDialog(false);
    } catch (error) {
      console.error("Error deleting image:", error);
      setShowDialog(false);
    }
  };

  const confirmDelete = () => {
    deleteCarouselImage(deleteImageId);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-screen overflow-auto bg-gray-100`}
    >
      <CustomDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        title="Confirm Delete"
        content="Are you sure you want to delete this image?"
        onConfirm={confirmDelete}
      />
      <div className="w-full text-center pt-32 mb-8">
        <Typography variant="h3" color="blue-gray" className="font-bold">
          Add New Carousel Images Here
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-2 text-lg">
          Upload high-quality widescreen images to display in the carousel.
          You can drag & drop or select only single image at once.
        </Typography>
      </div>
      <div className="flex gap-8 justify-around ">
          <Card className="w-full max-w-4xl p-6 bg-white h-48 shadow-xl rounded-xl">
            <CardBody className="text-center">
              <Dropzone
                onDrop={(acceptedFiles) => {
                  setCarouselImage(
                    Object.assign(acceptedFiles[0], {
                      preview: URL.createObjectURL(acceptedFiles[0]),
                    })
                  );
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
            </CardBody>
          </Card>
        <div>
          {carouselImage && (
            <div className="mt-6 flex flex-col gap-4 items-center">
            <Card className="p-3 items-center text-center bg-white shadow-xl rounded-xl">

              <Typography variant="h6" color="blue-gray" className=" mb-4">
                Preview Image{" "}
              </Typography>
              <img
                src={carouselImage.preview}
                alt="Preview"
                className="w-64 max-h-64 object-fit rounded-lg shadow-md mx-auto"
              />
            </Card>
            </div>
          )}
        </div>

      </div>
        {progress > 0 && !uploadingStatus && (
          <Typography variant="small" color="blue-gray" className="mt-2">
            Upload Progress: {Math.round(progress)}%
          </Typography>
        )}

      <div className="mt-6 p-4">
        <Button
          onClick={handleUpload}
          color="blue"
          disabled={!carouselImage || uploadingStatus}
          className="w-full bg-amber-500 text-black"
        >
          {uploadingStatus ? <Spinner className="h-5 w-5" /> : "Upload Image"}
        </Button>
      </div>

      <div class="border-solid h-0.5 bg-slate-300 w-full m-3"> .</div>

      <Typography variant="h5" color="blue-gray" className="font-bold mt-8">
        Manage The Existing Carousel Images Here
      </Typography>
      <div className="w-full justify-center flex flex-wrap isolate items-center mt-8">
        {existingCarouselImages?.map((image, index) => (
          <div key={index} className="relative m-2">
            <img
              src={image?.URL}
              alt={`Carousel Image ${index}`}
              className="object-cover rounded-lg shadow-md w-48 h-48"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white"
              onClick={() => {
                setDeleteImageId(image.id);
                setShowDialog(true);
              }}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
