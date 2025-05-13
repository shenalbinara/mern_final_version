// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-42328.firebaseapp.com",
  projectId: "mern-blog-42328",
  storageBucket: "mern-blog-42328.firebasestorage.app",
  messagingSenderId: "476453195936",
  appId: "1:476453195936:web:e091511caf4f4520f7b9c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);