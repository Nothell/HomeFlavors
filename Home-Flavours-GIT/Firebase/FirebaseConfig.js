import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAbG359dXUdB7eITxZvgybBWe2ccfRtIo4",
  authDomain: "homeflavors-11fe4.firebaseapp.com",
  projectId: "homeflavors-11fe4",
  storageBucket: "homeflavors-11fe4.appspot.com",
  messagingSenderId: "435418591055",
  appId: "1:435418591055:web:cc7f3dd636936b9d579f3a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db , auth }