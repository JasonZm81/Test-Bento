// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKfzDjv9HTnEdUsC8sc4LaQLeltcteUwA",
  authDomain: "testing-75857.firebaseapp.com",
  projectId: "testing-75857",
  storageBucket: "testing-75857.firebasestorage.app",
  messagingSenderId: "996673653542",
  appId: "1:996673653542:web:7895c16e3752ce5ccd4fe7",
  measurementId: "G-NCMY94R1CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db, doc, setDoc, getDoc, onSnapshot, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc };