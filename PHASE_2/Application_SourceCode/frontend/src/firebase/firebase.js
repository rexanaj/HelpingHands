import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgYWt3eWZqkwdCDcihnorfggyV7xFG3zA",
  authDomain: "seng3011-dwen.firebaseapp.com",
  projectId: "seng3011-dwen",
  storageBucket: "seng3011-dwen.appspot.com",
  messagingSenderId: "303673053349",
  appId: "1:303673053349:web:495164a3ee5b3da58dbd4c",
  measurementId: "G-6PMRJ4ER6J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
