import { Button, Card, Spinner, Typography } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

import CollectionNameContext from './CollectionNameContext';
import ControlledCarousel from "../ControlledCarousel/ControlledCarousel";
import { Link } from "react-router-dom";
import Tooltip from "../GenericComponents/ToolTip";
import { db } from "../../firebase/config"; // Import your Firebase db instance

export default function CollectionsSection({ isSidebarOpen:{isSidebarOpen} }) {
  const { changeCollectionName } = useContext(CollectionNameContext);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("latest");

  useEffect(() => {
    const getData = async () => {
      try {
        const colRef = collection(db, "All Categories");
        const q = query(colRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDocuments(docs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching documents:", err.message);
      }
    };
    getData();
  }, []);

  const sortedCollections = [...documents].sort((a, b) => {
    if (sortOption === "latest") {
      return b.createdAt.seconds - a.createdAt.seconds;
    } else if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });


  return (
    loading ? (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="h-16 w-16 " color="black" />
        Loading....
      </div>
    ) :  // If loading is true, show the spinner
    (<div className={`flex w-full h-screen transition-all duration-300`}>
     <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 to-indigo-100p-4">
        <ControlledCarousel  isSidebarOpen={isSidebarOpen}/>
        {/* <Spinner color="red"/> */}
        <section className="container mx-auto py-8">
          <div className="flex justify-end items-center  mr-5 mb-6">
          <Typography variant="h6" className="mr-2 ">Sort By : </Typography>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="latest">Latest</option>
              <option value="name">Name</option>
            </select>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">Available Collections</h1>  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
            {sortedCollections?.map((collection) => (
              <Link 
              className="text-slate-600 hover:text-slate-900"
               key={collection?.id}
               to={`/collection/${collection?.name.replace(/\s+/g, "-")}`}
               onClick={() => changeCollectionName(collection?.name)}
              >
              <Card key={collection.id} className="max-w-xs hover:scale-110">
                <img src={collection?.URL} alt={collection.name} className="w-full h-60 object-center rounded-t-lg" />
                <div className="p-4 flex justify-between items-center">
                  <Tooltip text={collection?.name} placement="top">
                    <Typography variant="h6" className="truncate w-40">
                      {collection?.name}
                    </Typography>
                  </Tooltip>
                </div>
              </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>)
  );
}
