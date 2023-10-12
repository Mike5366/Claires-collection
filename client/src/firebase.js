// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-e-commerce-75335.firebaseapp.com",
  projectId: "mern-e-commerce-75335",
  storageBucket: "mern-e-commerce-75335.appspot.com",
  messagingSenderId: "917993108566",
  appId: "1:917993108566:web:631f16c8137e2cbcd1f7f7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);