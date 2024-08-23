// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB5gAH0EJ0RP81fCe_NsfgDCfklygFMkXs',
  authDomain: 'project-hackathon-28fb8.firebaseapp.com',
  projectId: 'project-hackathon-28fb8',
  storageBucket: 'project-hackathon-28fb8.appspot.com',
  messagingSenderId: '325960238245',
  appId: '1:325960238245:web:8218073da70fb6bf0ef94c',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export { db, auth }
