import { Card, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";
import ManageCollections from "../ManageCollections/ManageCollections";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { db } from "../../firebase/config";
import { useAuth } from "../../firebase/config";

const ItemsGridSkeleton = () => {
  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="shadow-md animate-pulse">
              <div className="w-full h-48 rounded-t-md bg-gray-300 dark:bg-gray-700" />
              <div className="p-4 flex items-center justify-between">
                <Tooltip content="Loading...">
                  <Typography variant="h6" className="truncate w-32">
                    <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Loading...">
                  <IconButton size="sm" disabled>
                    <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full" />
                  </IconButton>
                </Tooltip>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const ItemsGrid = (props,) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const currentUser = useAuth();
  const navigate = useNavigate();
  const { collectionName } = useParams();

  useEffect(() => {
    
    console.log(collectionName, "collectionName");
    const getData = async () => {
      setLoading(true);
      const db = getFirestore();
      
      const colRef = collection(db, collectionName); // Use prop or route param
      const q = query(colRef, orderBy("createdAt", "desc"));
      try {
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDocuments(docs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching documents:", err.message);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const onDeleteItem = async (id) => {
    const docRef = doc(db, collectionName, id);
    try {
      await deleteDoc(docRef);
      setCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };

  // Define the breadcrumb paths
  const breadcrumbPaths = [
    { name: "Collections", link: "/collections" },
    { name: collectionName, link: `/collection/${collectionName}` },
  ];
console.log(documents,"documents");

  return (
    <div className="py-8 px-4 h-screen w-full overflow-auto">
      <div className="container mx-auto">
        <Breadcrumbs paths={breadcrumbPaths} /> {/* Render the Breadcrumbs component */}
        {loading ? (
          <ItemsGridSkeleton />
        ) : (
          <div className="p-5 mt-3 flex flex-col w-full hscreen overflow-auto">
          <div className="flex justify-between items-center mb-4">
          {currentUser && <ManageCollections name={collectionName} />}

          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {documents?.map((doc) => (
              <Card key={doc.id} className="shadow-md">
                <img
                  src={doc.URL}
                  alt={collectionName}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="p-4 flex items-center justify-between">
                  <Tooltip content={ collectionName}>
                    <Typography variant="h6" className="truncate w-32">
                      { collectionName}
                    </Typography>
                  </Tooltip>
                  {currentUser && (
                    <Tooltip content="Delete">
                      <IconButton size="sm" color="red" onClick={() => onDeleteItem(doc.id)}>
                        <TrashIcon className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </Card>
            ))}
          </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsGrid;
