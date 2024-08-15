// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlnUPxW1Bn33_rPfytUMNOV9YfJwyfPOQ",
  authDomain: "appointment-544a5.firebaseapp.com",
  projectId: "appointment-544a5",
  storageBucket: "appointment-544a5.appspot.com",
  messagingSenderId: "198244259036",
  appId: "1:198244259036:web:75727ef5114b530f94d019",
  measurementId: "G-X44HGJ5W3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)