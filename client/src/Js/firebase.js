// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDVAKGUU4GQ278a9-OSvPl9yOy8RNHsDFo",
//   authDomain: "gamestore-dc0b3.firebaseapp.com",
//   projectId: "gamestore-dc0b3",
//   storageBucket: "gamestore-dc0b3.appspot.com",
//   messagingSenderId: "942301348357",
//   appId: "1:942301348357:web:6c3965ae51a7592d41526c",
//   measurementId: "G-7QN3BZSZXZ",
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK6v1Gtne80f-sJmgviJASy_GsgQj5nCo",
  authDomain: "rawg-game-store.firebaseapp.com",
  projectId: "rawg-game-store",
  storageBucket: "rawg-game-store.appspot.com",
  messagingSenderId: "19640425427",
  appId: "1:19640425427:web:1487a361a2093c0df3ed26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const auth = getAuth(app);
export default db;

//First
// import getAuth from firebase Auth
// import getFirstore from firebase firstore

// Second
// initialize db = getFirestore();

// Third
// export const auth = getAuth(app);
// export default db;
