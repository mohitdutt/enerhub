/* eslint-disable */
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: "AIzaSyBAxB-JtALVqi6UlfISlSC5aHxWtaylAjs",
  authDomain: "emerhub-form-aa3fb.firebaseapp.com",
  databaseURL: "https://emerhub-form-aa3fb-default-rtdb.firebaseio.com",
  projectId: "emerhub-form-aa3fb",
  storageBucket: "emerhub-form-aa3fb.appspot.com",
  messagingSenderId: "720701381770",
  appId: "1:720701381770:web:048806c44e54896ba52173",
  measurementId: "G-LBSTLLN6XS"
});

const db = firebaseApp.firestore();

// Export the database to use
export { db };
