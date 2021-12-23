import React , {useEffect,useState} from 'react';
import { db, timestamp } from "../firebase/config";
import ImagesGrid from './ImagesGrid';
import "./AllCategories.css"
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import {
  doc,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  orderBy,
  query
} from "firebase/firestore";


export default function AllCategories (){
  const [categories,setCategories] = useState([])
  const [colname,setColName]= useState("")
  const [count,setCount] = useState(0)

  const handleCategoriesClick = async (categoryName) => {
    setColName(categoryName)
    const db = getFirestore();
    const colRef = collection(db, "All Categories");
    const docRef = doc(db, "All Categories", categoryName)
    const docSnap = await getDoc(docRef);
    console.log(docSnap)
    console.log(categoryName)
  }

  const handleDeleteCategory = (colName,id) => {
    confirmAlert({
  customUI: ({ onClose }) => {
    return (
      <div className='custom-ui'>
        <h1>Are you sure?</h1>
        <p>You want to delete entire {colName} collection?</p>
        <button onClick={onClose}>No</button>
        <button
          onClick={async () => {
            setCount(prev=>prev+=1)
            console.log(count)
            const docRef = doc(db, "All Categories", id);
            console.log(docRef)
             await deleteDoc(docRef)
             console.log(`Btn Clicked ${id} and ${colName}`)
            onClose();
           
          }}
        >
          Yes, Delete it!
        </button>
      </div>
    );
  }
});
    }
  


  useEffect(() => {
    const unsub = getCategories();
    return unsub;
  }, [count]);

  const getCategories = async () => {
    const db = getFirestore();
    const colRef = collection(db, "All Categories");
    const q = query(colRef,orderBy("createdAt","desc"))
    getDocs(q)
      .then((snapshot) => {
        let docs = [];
        snapshot.docs.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setCategories(docs);
        // setLoading(false)
      })
      .catch((err) => {
        console.log(err.message);
      });
    return { categories };

  };

  return(
    <>
    <div className='categories-div'>
    <div className='sidebar-categories'>

    {categories.map((item)=> {
      return <div className='sidebar-items'>
      <h4 onClick={()=>handleCategoriesClick(item.name)} >{item.name}</h4>
      <button className="delete-btn" style={{zIndex:"2"}} onClick={()=>handleDeleteCategory(item.name,item.id)}><i class="fas fa-trash"></i></button>
      </div>
    })}
    </div>

    <div className='gallery-view'>
    <ImagesGrid name={colname} />

    </div>


    </div>

    </>
  )

}