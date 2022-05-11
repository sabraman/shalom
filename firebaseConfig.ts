// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCUg1B9v5nEcPMAV2QzdlWCozCx4Bfbb54",
  authDomain: "birthday-b470c.firebaseapp.com",
  databaseURL: "https://birthday-b470c.firebaseio.com",
  projectId: "birthday-b470c",
  storageBucket: "birthday-b470c.appspot.com",
  messagingSenderId: "1053816491255",
  appId: "1:1053816491255:web:8a96b68029ec27ec0457f2",
  measurementId: "G-3470KBL2JB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig) 
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, db, auth, provider };