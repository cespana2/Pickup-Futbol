import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAtj6621uv5LbOzYPnC7ozX1FbK6QtrEwM",
  authDomain: "pickup-futbol.firebaseapp.com",
  databaseURL: "https://pickup-futbol-default-rtdb.firebaseio.com",
  projectId: "pickup-futbol",
  storageBucket: "pickup-futbol.appspot.com",
  messagingSenderId: "950393325921",
  appId: "1:950393325921:web:5bb039ed92a52eaefe5d20",
  measurementId: "G-N6263PM8FZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}