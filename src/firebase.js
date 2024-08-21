// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBW8LaQ521_6EJbZWZcl1P78F0YnGYkHFU",
    authDomain: "hackathon-e2557.firebaseapp.com",
    projectId: "hackathon-e2557",
    storageBucket: "hackathon-e2557.appspot.com",
    messagingSenderId: "1093653055584",
    appId: "1:1093653055584:web:61e5431144bdaa8e809b05"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db ,auth};