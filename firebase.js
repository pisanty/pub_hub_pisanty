// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDatabase, push, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGKtrsU6gelADNlJQHrofZgsjktDaSAkw",
  authDomain: "pubhubpisanty.firebaseapp.com",
  databaseURL:
    "https://pubhubpisanty-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pubhubpisanty",
  storageBucket: "pubhubpisanty.appspot.com",
  messagingSenderId: "430922283877",
  appId: "1:430922283877:web:dac6584838cc4b655c7f8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { auth };
