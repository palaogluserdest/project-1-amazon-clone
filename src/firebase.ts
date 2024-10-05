import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

type firebaseConfigProps = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

const firebaseConfig: firebaseConfigProps = {
  apiKey: 'AIzaSyDAtZfFUY2TxtPTmUMdpB_ypGhY3hghohQ',
  authDomain: 'clone-project-1-ca263.firebaseapp.com',
  databaseURL: 'https://clone-project-1-ca263-default-rtdb.firebaseio.com',
  projectId: 'clone-project-1-ca263',
  storageBucket: 'clone-project-1-ca263.appspot.com',
  messagingSenderId: '213047236470',
  appId: '1:213047236470:web:b5e3360a2226e5b66e0c57',
  measurementId: 'G-RF4WEYT12G',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

export { db, auth };
