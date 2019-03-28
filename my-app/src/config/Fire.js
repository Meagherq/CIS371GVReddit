import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyBBS8PfyQFcBtXCoVlT2Cx1rfRief_7GGc",
    authDomain: "gvreddit.firebaseapp.com",
    databaseURL: "https://gvreddit.firebaseio.com",
    projectId: "gvreddit",
    storageBucket: "gvreddit.appspot.com",
    messagingSenderId: "838422064047"
};
const fire = firebase.initializeApp(config);
export default fire;