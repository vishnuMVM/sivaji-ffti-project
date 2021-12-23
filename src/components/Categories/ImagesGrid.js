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
import { db, timestamp } from "../firebase/config";
import "./ImagesGrid.css"
import UpdateCollections from "./UpdateCollections";

const ImagesGrid = (props) => {
  const [documents, setDocuments] = useState([]);
  var [loading, setLoading] = useState(true);
  const [productName,setProductName] = useState([])
  

  useEffect(() => {
    const unsub = getData();
    return unsub;
  }, [props]);

  const getData = async () => {
    const db = getFirestore();
    const colRef = collection(db, props.name);
    console.log(props.name)
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

  const enterProductName =(e)=>{
    setProductName(e.target.value)
  }

  const onDeleteItem =async (id) => {

    const docRef = doc(db, props.name, id)
    console.log(docRef)
    await deleteDoc(docRef);

  }

  return (
    <div>
      <UpdateCollections name={props.name} />
      <h1 className="center">{props.name}</h1>
      <div className="collections center">
     
        {documents &&
          documents.map((doc) => {
            return (
              <div className="collection-items">
                <img
                  className="collection-img"
                  src={doc.URL}
                  alt="Shorts"
                ></img>

                <div className="update-Details" style={{paddingTop : "20px" ,display:"flex", justifyContent:"space-evenly" , gap:"10px"}}>
                     {/* <input onChange={enterProductName} type="text" name="product-name"/> */}
                    <button onClick={()=>onDeleteItem(doc.id)}> <i class="fas fa-trash"></i> delete</button>
                    {/* <button> <i class="fas fa-edit"></i> edit </button> */}
                </div>
             
                <h4>{doc.name}</h4>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImagesGrid;
