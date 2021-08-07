const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyB5Rlps1lTRGGvpSqbxWgV3oJkRaJgyYBA",
    authDomain: "talk2doc-51f16.firebaseapp.com",
    projectId: "talk2doc-51f16",
    storageBucket: "talk2doc-51f16.appspot.com",
    messagingSenderId: "33482042994",
    appId: "1:33482042994:web:6f91b15623135b4da85ceb",
    measurementId: "G-VGRV2GCSGM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //database 
const auth = firebaseApp.auth(); //var to handle signing in, etc. 

export { db, auth };