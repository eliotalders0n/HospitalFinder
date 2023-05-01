import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth"

// Import the functions you need from the SDKs you need
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Q8VQJ2kAvfw9e7uAmaWWGhO25f43rds",
  authDomain: "girlcode-2867d.firebaseapp.com",
  projectId: "girlcode-2867d",
  storageBucket: "girlcode-2867d.appspot.com",
  messagingSenderId: "191621205095",
  appId: "1:191621205095:web:41b52dec3145e1cf9e58c2",
  measurementId: "G-T63DMHJMX8"
};

firebase.initializeApp(firebaseConfig);
export default firebase;