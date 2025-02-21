
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,signOut } from "firebase/auth";  
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoGP-kFqqLYqvTCAiLTP_i8h5LwJ5PORw",
  authDomain: "practice-reactjs-42953.firebaseapp.com",
  projectId: "practice-reactjs-42953",
  storageBucket: "practice-reactjs-42953.firebasestorage.app",
  messagingSenderId: "501408921977",
  appId: "1:501408921977:web:84ee5f6c09b320a5fb97a8",
  measurementId: "G-B5EK4PPJX0"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  
const analytics = getAnalytics(app);

export { db, auth, analytics };

