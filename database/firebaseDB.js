// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCganVxF58dNB7WEfI9l8_tPmobnsG-fj8",
  authDomain: "washy-mb-2f660.firebaseapp.com",
  projectId: "washy-mb-2f660",
  storageBucket: "washy-mb-2f660.appspot.com",
  messagingSenderId: "682434852349",
  appId: "1:682434852349:web:99e3abeb079000d746d594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
