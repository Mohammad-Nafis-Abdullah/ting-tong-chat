// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOCN1gwCvYIbAFxtVgxwRAWcdshU-63Hc",
  authDomain: "ting-tong-chat.firebaseapp.com",
  projectId: "ting-tong-chat",
  storageBucket: "ting-tong-chat.appspot.com",
  messagingSenderId: "333928471527",
  appId: "1:333928471527:web:c1ca017060427fdaedfb42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);