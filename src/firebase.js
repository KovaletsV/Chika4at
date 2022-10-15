import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXhX3kjR6hxInSJVFMIwmToi3un8SM_xo",
    authDomain: "chike4at.firebaseapp.com",
    projectId: "chike4at",
    storageBucket: "chike4at.appspot.com",
    messagingSenderId: "522179346500",
    appId: "1:522179346500:web:8f915627f17aced23d3c11",
    measurementId: "G-517BLGV44X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
