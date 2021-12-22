// import * as firebase from 'firebase/app';
// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import 'firebase/storage';
import 'firebase/firestore';
// import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";


import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtrZrq_IkaihA5D9WKgMHpQ5jTFN4AHb0",
  authDomain: "shivaji-ffti-sports.firebaseapp.com",
  projectId: "shivaji-ffti-sports",
  databaseURL:"https://console.firebase.google.com/project/shivaji-ffti-sports/storage/shivaji-ffti-sports.appspot.com/files",
  storageBucket: "shivaji-ffti-sports.appspot.com",
  messagingSenderId: "1044881636434",
  appId: "1:1044881636434:web:f085aca84189003545f38b",
  measurementId: "G-2L4MX3GPNL"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const timestamp = serverTimestamp();
// const firebaseApp = getApp();
const Storage = getStorage(app);



export { Storage, db ,timestamp,app};




// LoginFunctionality 

const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}





