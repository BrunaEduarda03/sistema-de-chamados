import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyA0x_v_CsyIftRBhqKEOmaEGRkXRpdqJdU",
  authDomain: "sistema-chamados-69279.firebaseapp.com",
  projectId: "sistema-chamados-69279",
  storageBucket: "sistema-chamados-69279.appspot.com",
  messagingSenderId: "111999225555",
  appId: "1:111999225555:web:2b7805d2e64a3d7d560e26",
  measurementId: "G-TZ0MBXYFYS"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };