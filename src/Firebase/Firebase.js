import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBi6f5-CHzzIjpgVw3Ls3HIjkAKIXgV3iE",
  authDomain: "vendor-web-b8e2b.firebaseapp.com",
  projectId: "vendor-web-b8e2b",
  storageBucket: "vendor-web-b8e2b.appspot.com",
  messagingSenderId: "165251852377",
  appId: "1:165251852377:web:9ae8b42623b1335e72a948",
  measurementId: "G-TTHKM60HZZ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
