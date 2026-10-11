import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

/* ------------------------------------------------------------------
   FIREBASE CONFIG.
------------------------------------------------------------------- */
const firebaseConfig = {
  apiKey: "AIzaSyD6TKIHTp685iLwe-hrMhyfl3RlVtGFh0s",
  authDomain: "portfolio-5bba1.firebaseapp.com",
  projectId: "portfolio-5bba1",
  storageBucket: "portfolio-5bba1.firebasestorage.app",
  messagingSenderId: "9658028104",
  appId: "1:9658028104:web:d94b158e67d0547ecb487d",
  measurementId: "G-CPCXFE8E0S"
};

export const CLOUDINARY = {
  cloudName: "dirodoa8x",
  uploadPreset: "xkqrTycW1a8", 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
isSupported().then((ok) => {
  if (ok) getAnalytics(app);
});