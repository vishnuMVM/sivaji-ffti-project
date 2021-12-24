import React, { useState, useEffect } from "react";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import "./Categories/ImagesGrid.css"
import AddCollection from "./Categories/AddCollection";
import { Link } from "react-router-dom";

export default function CollectionsDiv (props){
  const [documents, setDocuments] = useState([]);
  var [loading, setLoading] = useState(true);
  const [productName,setProductName] = useState([])
  

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


  return(

    <div>
     <AddCollection />
    <div className="center ">
      <h2>Our Collections</h2> 
    </div>
    
    <div className="collections center">
   
      {documents &&
        documents.map((doc) => {
          return (
            <Link to={`/collection/${doc.name}`} >
            <div key={doc.id} className="collection-items">
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
           
              <h4>{doc.name}</h4>
            </div>
            </Link>
          );
        })}
    </div>
  </div>

  )

}