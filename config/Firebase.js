// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "onlinemeeting-437b2.firebaseapp.com",
  projectId: "onlinemeeting-437b2",
  storageBucket: "onlinemeeting-437b2.appspot.com",
  messagingSenderId: "960603851448",
  appId: "1:960603851448:web:58043e522ada4a8571024d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);