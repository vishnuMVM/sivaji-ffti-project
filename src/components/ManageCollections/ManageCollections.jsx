import {
  Button,
  Card,
  IconButton,
  Progress,
  Select,
  Tooltip,
  Typography
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Storage, db, timestamp } from "../../firebase/config";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";

export default function ManageCollections(props) {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const {collectionName} = useParams()
  const [categories,setCategories] = useState([]);
  const [collectionNameToBeUpdated, setCollectionNameToBeUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const disableUploadButton = files.length === 0 ;
  const navigate = useNavigate()
  useEffect(() => {
      const getData = async () => {
        try {
          const colRef = collection(db, "All Categories");
          const q = query(colRef, orderBy("createdAt", "desc"));
          const snapshot = await getDocs(q);
          const docs = snapshot.docs.map((doc) => ({
            name: doc.data().name,
            id: doc.id,
          }));  
          setCategories(docs);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching documents:", err.message);
        }
      };
      if(!collectionName) {
        getData();
      }else {
        setCollectionNameToBeUpdated(collectionName);
      }
  
  },[]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });
  const handleCollectionChange = (value) => {
    setCollectionNameToBeUpdated(value);
  };

  const uploadMultipleImages = () => {
    if (files.length > 0 && !isUploading) {
      setIsUploading(true);
      setUploadProgress(0);
      const totalFiles = files.length;
      let uploadedCount = 0;

      files.forEach((image) => {
        const storageRef = ref(Storage, `${collectionName}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(
              (prevProgress) => prevProgress + progress / totalFiles
            );
          },
          (error) => {
            console.error("Upload Error:", error);
            setIsUploading(false);
            // Optionally show an error message to the user
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(
                uploadTask.snapshot.ref
              );
              await addDoc(collection(db, collectionNameToBeUpdated), {
                name: image.name,
                URL: downloadURL,
                createdAt: timestamp,
              });
              uploadedCount++;
              if (uploadedCount === totalFiles) {
                setIsUploading(false);
                setFiles([]);
                setUploadProgress(0);
                console.log(collectionNameToBeUpdated, "collectionNameToBeUpdated");
                
                navigate(`/collections`);
                // Optionally show a success message to the user
              }
            } catch (error) {
              console.error("Firestore Error:", error);
              setIsUploading(false);
              // Optionally show an error message to the user
            }
          }
        );
      });
    } else if (files.length === 0) {
      alert("Please select images to upload.");
    }
  };

  const imagePreviews = files.map((file) => (
    <Card key={file.name} className="relative w-48 h-48 shadow-md">
      <img
        src={file.preview}
        alt="preview"
        className="object-cover w-full h-full rounded-md"
      />
      <Tooltip content="Remove">
        <IconButton
          size="sm"
          color="red"
          className="absolute top-2 right-2"
          onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </Tooltip>
    </Card>
  ));

  return (
    <Card className="p-6 shadow-lg w-full overflow-auto bg-purple-100">
      <Typography variant="h5" color="blue-gray" className="mb-4">
        Manage {collectionNameToBeUpdated} Collection
      </Typography>

      {!collectionName && (
        <div className="mb-4 flex justify-end items-center gap-4 border-purple-300">
          <Typography variant="small" color="blue-gray" className=" font-medium">
            Select Collection
          </Typography>
          <Select value={collectionNameToBeUpdated} onValueChange={(val)=>handleCollectionChange(val)}>
            <Select.Trigger className="w-72" placeholder="Select Collection" />
            <Select.List>
              {loading ? (
                <Select.Option disabled>Loading Collections...</Select.Option>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <Select.Option className="hover:bg-purple-300" key={category.id} value={category.name}>
                    {category.name}
                  </Select.Option>
                ))
              ) : (
                <Select.Option disabled>No collections found</Select.Option>
              )}
            </Select.List>
          </Select>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-purple-600 rounded-md p-6 text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-gray-50" : "border-blue-gray-300 hover:bg-blue-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <PlusIcon className="h-10 w-10 mx-auto text-blue-gray-400 mb-2" />
        <Typography variant="body2" color="blue-gray">
          {isDragActive
            ? "Drop the images here..."
            : "Drag and drop images here or click to select"}
        </Typography>
        <Typography variant="caption" className="text-blue-purple-500">
          (Multiple image files are allowed)
        </Typography>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">{imagePreviews}</div>

      <div className="mt-6">
        <Button className="bg-purple-700" onClick={uploadMultipleImages} disabled={disableUploadButton}>
          {isUploading ? "Uploading..." : "Upload Images"}
        </Button>
      </div>

      {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-4">
          <Typography variant="body2" color="blue-gray" className="mb-1">
            Upload Progress: {Math.round(uploadProgress)}%
          </Typography>
          <Progress value={uploadProgress} color="blue" />
        </div>
      )}

      {isUploading && uploadProgress === 100 && (
        <Typography variant="body2" color="green" className="mt-4">
          Upload complete!
        </Typography>
      )}
    </Card>
  );
}