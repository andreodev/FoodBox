import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzcLhTmA6Bp3KfIpJ0QwgzW5NV99of44A",
  authDomain: "foodboxd-ab81a.firebaseapp.com",
  projectId: "foodboxd-ab81a",
  storageBucket: "foodboxd-ab81a.appspot.com",
  messagingSenderId: "452247743691",
  appId: "1:452247743691:android:bd9fb0c9469ef440d8bf4e",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
