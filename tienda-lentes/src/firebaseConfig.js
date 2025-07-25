// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByc2Wn1GFH3S5G-3blBmYcYSEBP8pX49M",
  authDomain: "proyecto-lentes.firebaseapp.com",
  projectId: "proyecto-lentes",
  storageBucket: "proyecto-lentes.firebasestorage.app",
  messagingSenderId: "410869937928",
  appId: "1:410869937928:web:b1121b2b0e64e20cd7debd",
  measurementId: "G-QFD1HN8KD0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
