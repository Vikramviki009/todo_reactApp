import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCPYZ2t9_p_uRYqeYogMGHgsUWly_6kh2A",
    authDomain: "todo-react-app-e485a.firebaseapp.com",
    projectId: "todo-react-app-e485a",
    storageBucket: "todo-react-app-e485a.appspot.com",
    messagingSenderId: "985611625341",
    appId: "1:985611625341:web:876a2e58638bb597cae214",
    measurementId: "G-B2EW42G5JN"
  });

  const db = firebaseApp.firestore();

  export default db;