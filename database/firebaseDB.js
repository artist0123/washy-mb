// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrKepIYYjhXMylM5gS9EVqq-F2FqqlLMg",
  authDomain: "washy-mb.firebaseapp.com",
  projectId: "washy-mb",
  storageBucket: "washy-mb.appspot.com",
  messagingSenderId: "1008506317149",
  appId: "1:1008506317149:web:d4c1a4615a5601466260b4",
  measurementId: "G-8G2763ZGY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
