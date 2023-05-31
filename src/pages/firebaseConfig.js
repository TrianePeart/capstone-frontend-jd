// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhldyhf6ssw-yuli5ZkD-oEuscKuCzlOs",
  authDomain: "a-social-387800.firebaseapp.com",
  projectId: "a-social-387800",
  storageBucket: "a-social-387800.appspot.com",
  messagingSenderId: "1026548385448",
  appId: "1:1026548385448:web:755e5cfa4fc94f6281649d",
  measurementId: "G-DF6DLJGRP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

