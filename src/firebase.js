import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {

  apiKey: "AIzaSyD8fXAPYZvg7cbcYtWYhFUWBMCBYtD0L7g",

  authDomain: "egs-todo-app.firebaseapp.com",

  projectId: "egs-todo-app",

  storageBucket: "egs-todo-app.appspot.com",

  messagingSenderId: "919019482882",

  appId: "1:919019482882:web:8ba4421dc1729c0aad5c1b"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);