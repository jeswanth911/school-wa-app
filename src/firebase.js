// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeBpQcUMO8ldhCmM3KmLUwn_w1FNSAcJg",
  authDomain: "school-wa-auth.firebaseapp.com",
  projectId: "school-wa-auth",
  storageBucket: "school-wa-auth.appspot.com",
  messagingSenderId: "144565665526",
  appId: "1:144565665526:web:73dc95ff86e3044d10b6d7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
