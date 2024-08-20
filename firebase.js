// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi7rN0-i9In9WmQQLgALtUwY4BriZimHA",
  authDomain: "flashcardsass.firebaseapp.com",
  projectId: "flashcardsass",
  storageBucket: "flashcardsass.appspot.com",
  messagingSenderId: "552549736688",
  appId: "1:552549736688:web:5fe5c619ed395eb274a235",
  measurementId: "G-150VJMHYGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
  db
}