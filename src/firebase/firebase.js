import * as firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA5nwHxlnseAecM_-FZga7z95VHTuLxUgo",
  authDomain: "pigpick-1358e.firebaseapp.com",
  databaseURL: "https://pigpick-1358e.firebaseio.com",
  projectId: "pigpick-1358e",
  storageBucket: "pigpick-1358e.appspot.com",
  messagingSenderId: "149194491677",
  appId: "1:149194491677:web:26667e3145ece8e46fc3f4",
  measurementId: "G-B81P38T5BP"
};

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider };
