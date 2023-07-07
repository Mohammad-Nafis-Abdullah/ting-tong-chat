// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCleRuvVLAzd1xjWuBhmf_cZF-wr1RYBrs",
  authDomain: "ting-tong-chatting.firebaseapp.com",
  projectId: "ting-tong-chatting",
  storageBucket: "ting-tong-chatting.appspot.com",
  messagingSenderId: "225154435724",
  appId: "1:225154435724:web:86404685da2a7dc595c9a9",
  databaseURL: "https://ting-tong-chatting-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);