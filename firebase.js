import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDzsdlW8RD8On69GT0b8SXJJDKJZZzu8og",
    authDomain: "signal-clone-9d1e3.firebaseapp.com",
    projectId: "signal-clone-9d1e3",
    storageBucket: "signal-clone-9d1e3.appspot.com",
    messagingSenderId: "427102826559",
    appId: "1:427102826559:web:d831e250092400c46ec88a"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }