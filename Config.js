import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyCm02ZgLxQfpp51CMrPhlPa6H3SiHVRODU",
    authDomain: "extra-ai.firebaseapp.com",
    databaseURL: "https://extra-ai.firebaseio.com",
    projectId: "extra-ai",
    storageBucket: "extra-ai.appspot.com",
    messagingSenderId: "1088704001157",
    //appId: "1:431321070097:web:4cf9af907da3e7d9158fb0"
};
let app = Firebase.initializeApp(config);
export const db = app.database();