// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-shivi.firebaseapp.com",
  projectId: "real-estate-shivi",
  storageBucket: "real-estate-shivi.appspot.com",
  messagingSenderId: "306430523649",
  appId: "1:306430523649:web:85c5a1028f1438ea9c8300"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);