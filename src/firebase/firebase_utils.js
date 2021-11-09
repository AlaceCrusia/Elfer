import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLezT2ulmLBF93EMRnKBRGBiddCh1zsz0",
  authDomain: "elfer10.firebaseapp.com",
  projectId: "elfer10",
  storageBucket: "elfer10.appspot.com",
  messagingSenderId: "346248342778",
  appId: "1:346248342778:web:8778c33d713a9629d3ed43",
  measurementId: "G-2PCL88Y578",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
