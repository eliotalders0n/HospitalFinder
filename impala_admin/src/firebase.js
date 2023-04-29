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
  appId: "1:191621205095:web:f99af874b009d70f9e58c2",
  measurementId: "G-RD65MK33RC"
};

firebase.initializeApp(firebaseConfig);
export default firebase;