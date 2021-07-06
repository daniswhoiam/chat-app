import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDQPor7wk0hOlrSBe6DOeM-zY4B7mOi4TI',
  authDomain: 'test-4a175.firebaseapp.com',
  projectId: 'test-4a175',
  storageBucket: 'test-4a175.appspot.com',
  messagingSenderId: '20091337538',
  appId: '1:20091337538:web:dde10fb1308cd141c366db'
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
