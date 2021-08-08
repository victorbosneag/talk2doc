const firebase = require('firebase');

const firebaseConfig = {

    apiKey: "AIzaSyDKehxzlrBUZsU9cB-f75ty1GwjboGu8Zc",
  
    authDomain: "talk2doc-e5da0.firebaseapp.com",
  
    projectId: "talk2doc-e5da0",
  
    storageBucket: "talk2doc-e5da0.appspot.com",
  
    messagingSenderId: "596877997417",
  
    appId: "1:596877997417:web:926e20e96a54f6b36439f8",
  
    measurementId: "G-G1YR6WYCDX"
  
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //database 
const auth = firebaseApp.auth(); //var to handle signing in, etc. 

module.exports = {db, auth}