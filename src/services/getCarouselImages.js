import { collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";

export const fetchCarouselImages = async () => {
  const db = getFirestore();
  const colRef = collection(db, "Carousel Images");
  const q = query(colRef, orderBy("createdAt", "desc"));

  try {
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return {images:docs,loading:false};
  } catch (error) {
    console.error("Error fetching images:", error);
    return {images:[],loading:true,error:"Error Fetching Images"};
  } 
};