import {
  Alert,
  Button,
  Card,
  Input,
  Progress,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Storage, db, timestamp } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Dropzone from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function AddCollection() {
  const [categoryImage, setCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);


  const navigate = useNavigate();

  const handleCategoryName = (e) => {
    setCategoryName(e.target.value.replace(/\s+/g, "-"));
  };

  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => {
        navigate("/collections"); // Redirect after successful upload
      }, 2000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [uploadSuccess, navigate]);

  const handleUpload = async () => {
    if (categoryImage && categoryName) {
      setLoading(true);
      setUploadError(null);
      const storageRef = ref(Storage, `All Categories/${categoryImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, categoryImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload Error:", error);
          setUploadError("Failed to upload image. Please try again.");
          setLoading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, "All Categories"), {
              URL: downloadURL,
              createdAt: timestamp,
              name: categoryName,
            });

            setLoading(false);
            setIsFileSelected(false);
            setUploadSuccess(true);
            setCategoryImage(null);
            setUploadProgress(0);
          } catch (error) {
            console.error("Firestore Error:", error);
            setUploadError("Failed to save category details. Please try again.");
            setLoading(false);
          }
        }
      );
    } else {
      setUploadError("Please select an image and enter a category name.");
    }
  };

  
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setCategoryImage(
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setIsFileSelected(true);
      setUploadError(null);
    }
  };

  const previewImage = categoryImage && (
    <img
      src={categoryImage.preview}
      alt="preview"
      className="mt-4 max-w-xs rounded-md shadow-md"
    />
  );

  return (
    <div className="container bg-purple-200 mx-auto py-8">
      <Card className="p-8 shadow-lg">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Add New Collection
        </Typography>

        <Dropzone onDrop={handleDrop} multiple={false} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-purple-400 rounded-md p-6 text-center cursor-pointer hover:bg-blue-gray-50"
            >
              <input {...getInputProps()} />
              <PhotoIcon className="h-10 w-10 mx-auto text-blue-gray-400 mb-2" />
              <Typography variant="body2" color="blue-gray">
                Drag and drop an image here or click to select one
              </Typography>
              <Typography variant="caption" color="blue-gray">
                (Only single image files are allowed)
              </Typography>
            </div>
          )}
        </Dropzone>

        {previewImage}

        <div className="mt-6">
          <Input
            label="Category Name"
            type="text"
            color="purple"
            required
            placeholder="Enter category name"
            className="justify-start w-48 border-2 border-purple-300 focus:border-purple-500"
            value={categoryName}
            highlighted

            onChange={handleCategoryName}
          />
        </div>

        <div className="mt-6">
          <Button
            className="justify-end bg-purple-600"
            onClick={handleUpload}
            disabled={loading || !categoryName}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && !uploadError && (
          <div className="mt-4">
            <Typography variant="body2" color="blue-gray" className="mb-1">
              Upload Progress: {Math.round(uploadProgress)}%
            </Typography>
            <Progress value={uploadProgress} color="blue" />
          </div>
        )}

        {uploadError && (
          <Alert color="red" className="mt-4">
            {uploadError}
          </Alert>
        )}

        {uploadSuccess && (
          <Alert color="green" className="mt-4">
            Collection added successfully! Redirecting...
          </Alert>
        )}
      </Card>
    </div>
  );
}