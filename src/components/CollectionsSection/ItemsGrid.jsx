import { Card, Checkbox, IconButton, Typography } from "@material-tailwind/react";
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
                  <Typography variant="h6" className="truncate w-32">
                    <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                  </Typography>
                  <IconButton size="sm" disabled>
                    <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full" />
                  </IconButton>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const ItemsGrid = (props) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const currentUser = useAuth();
  const { collectionName } = useParams();
  const [showAdminControls, setShowAdminControls] = useState(true);

  useEffect(() => {
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
  }, [collectionName]); // Make sure to include collectionName in the dependency array

  const onDeleteItem = async (id) => {
    const docRef = doc(db, collectionName, id);
    try {
      await deleteDoc(docRef);
      setCount((prev) => prev + 1);
      // Optionally, you might want to refetch the data or update the documents state
      // to reflect the deletion immediately.
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };

  // Define the breadcrumb paths
  const breadcrumbPaths = [
    { name: "Collections", link: "/collections" },
    { name: collectionName, link: `/collection/${collectionName}` },
  ];
  const isAdmin = currentUser?.email?.length > 0;

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
            <div className="flex justify-end items-center mb-4">
        {isAdmin && (
          <div className="flex items-center gap-2 m-2">
            <Checkbox
              defaultChecked
              color="info"
              id="show-admin-controls"
              onChange={() => setShowAdminControls(!showAdminControls)}
            >
              <Checkbox.Indicator />
            </Checkbox>
            <Typography
              as="label"
              htmlFor="show-admin-controls"
              className="cursor-pointer text-foreground"
            >
              Show Admin Controls
            </Typography>
          </div>
        )}
      </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
              {documents?.map((doc) => (
                <Card key={doc.id} className="shadow-md">
                  <img
                    src={doc.URL}
                    alt={collectionName}
                    className="w-full h-48 object-contain rounded-t-md hover:scale-105"
                  />
                  <div className="p-4 flex items-center justify-between">
                      <Typography variant="h6" className="truncate w-72">
                        {collectionName}
                      </Typography>
                    {!showAdminControls && (
                        <IconButton
                          size="sm"
                          color="red"
                          onClick={() => onDeleteItem(doc.id)}
                        >
                          <TrashIcon className="h-5 w-5 hover:text-red-600" />
                        </IconButton>
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