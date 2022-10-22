// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr_pFQeS9Ladlr18-knvsWMty0wXIZkIA",
  authDomain: "hackduke2022-f87bb.firebaseapp.com",
  databaseURL: "https://hackduke2022-f87bb-default-rtdb.firebaseio.com",
  projectId: "hackduke2022-f87bb",
  storageBucket: "hackduke2022-f87bb.appspot.com",
  messagingSenderId: "249256093895",
  appId: "1:249256093895:web:96591c5528ccd4e96b76e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;