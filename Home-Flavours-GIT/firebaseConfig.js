// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbG359dXUdB7eITxZvgybBWe2ccfRtIo4",
  authDomain: "homeflavors-11fe4.firebaseapp.com",
  projectId: "homeflavors-11fe4",
  storageBucket: "homeflavors-11fe4.appspot.com",
  messagingSenderId: "435418591055",
  appId: "1:435418591055:web:cc7f3dd636936b9d579f3a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Services (database, auth, etc)
const db = getFirestore(app);
const auth = getAuth(app)
export { db, auth }