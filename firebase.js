import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD7c76QW3Zvt6vP84WZCPVD7SoGSxt_gOo",
    authDomain: "signal-clone-7c733.firebaseapp.com",
    projectId: "signal-clone-7c733",
    storageBucket: "signal-clone-7c733.appspot.com",
    messagingSenderId: "404178463621",
    appId: "1:404178463621:web:e7a341ea58738f523ef2ec"
  };


  let app;

  // const firebaseApp = firebase.initializeApp(firebaseConfig)
  if (firebase.apps.lengh ===0){
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app()
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};