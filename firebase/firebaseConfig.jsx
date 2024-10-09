import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vacancy-portal-e5e55.firebaseapp.com",
  projectId: "vacancy-portal-e5e55",
  storageBucket: "vacancy-portal-e5e55.appspot.com",
  messagingSenderId: "640524029464",
  appId: "1:640524029464:web:242cab5db0b50d5f0d7d6d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
