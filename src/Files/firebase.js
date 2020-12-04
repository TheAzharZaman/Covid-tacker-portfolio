import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyBspJgGt0tjmXDdRo8V3qFepAXC5UwyjUw",
  authDomain: "covid-19-tracker-399c9.firebaseapp.com",
  projectId: "covid-19-tracker-399c9",
  storageBucket: "covid-19-tracker-399c9.appspot.com",
  messagingSenderId: "621127039140",
  appId: "1:621127039140:web:bd8bc72bcb93ecfecd0e31",
});

export const db = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
