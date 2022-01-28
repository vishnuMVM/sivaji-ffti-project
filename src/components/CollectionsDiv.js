import React, { useState, useEffect } from "react";
import CollectionnameContext from "./CollectionnameContext";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import "./Categories/ImagesGrid.css";
import AddCollection from "./Categories/AddCollection";
import { Link } from "react-router-dom";
import { TailSpin } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default function CollectionsDiv() {
  const [documents, setDocuments] = useState([]);
  var [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState([]);
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    const unsub = getData();
    return unsub;
  }, []);

  const getData = async () => {
    const db = getFirestore();
    const colRef = collection(db, "All Categories");
    const q = query(colRef, orderBy("createdAt", "desc"));
    getDocs(q)
      .then((snapshot) => {
        let docs = [];
        snapshot.docs.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return { documents };
  };

  const getCategoryName = (colName) => {
    setCollectionName(colName);
    console.log(colName);
  };

  return (
    <CollectionnameContext.Consumer>
      {(value) => {
        const { Changecollectionname } = value;
        const Onchangecollectionname = (name) => {
          Changecollectionname(name);
        };
        return (
          <>
         {loading?<div className="loader"><TailSpin  color="#00BFFF" height={100} width={100} /></div>: <div>
            <div className="center ">
              <h2>Our Collections</h2>
            </div>

            <div className="collections center">
              {documents &&
                documents.map((doc) => {
                  return (
                    <Link
                      key={doc.id}
                      to={`/collection/${doc.name.replace(/\s+/g, "-")}`}
                      onClick={() =>
                        Onchangecollectionname(doc.name)
                      }
                      style={{textDecoration:"none"}}
                    >
                      <div className="collection-items">
                        <img
                          className="collection-img"
                          src={doc.URL}
                          alt="Shorts"
                        ></img>

                        {/* <div className="update-Details" style={{paddingTop : "20px" ,display:"flex", justifyContent:"space-evenly" , gap:"10px"}}>
                         <input onChange={enterProductName} type="text" name="product-name"/>
                        <button> <i class="fas fa-trash"></i> delete</button>
                        <button> <i class="fas fa-edit"></i> edit </button>
                    </div> */}

                        <h4 id="collection-name">{doc.name}</h4>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>}
          </>
        );
      }}
    </CollectionnameContext.Consumer>
  );
}
