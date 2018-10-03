import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAoAHcxNjY4Ce3CamaHQwQ74_EwUz9Ucvw",
  authDomain: "luisterlijst.firebaseapp.com",
  databaseURL: "https://luisterlijst.firebaseio.com",
  projectId: "luisterlijst",
  storageBucket: "luisterlijst.appspot.com",
  messagingSenderId: "168719932423"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
