const firebaseConfig = {
    apiKey: "AIzaSyCVmRp33lBssB0ZniF2uH2Ndg7s96fWrIo",
    authDomain: "urosanketa.firebaseapp.com",
    projectId: "urosanketa",
    storageBucket: "urosanketa.appspot.com",
    messagingSenderId: "729383564502",
    appId: "1:729383564502:web:f201b4867d7f8edc43c577"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();