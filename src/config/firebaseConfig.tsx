import { getAuth, Auth } from 'firebase/auth';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { IFirebaseConfig } from '../types/firebase.types';

/**
 * Fetches the Firebase configuration from environment variables.
 * @returns The Firebase configuration object.
 */
const getFirebaseConfig = (): IFirebaseConfig => {
  return {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
  };
};

/**
 * Initializes the Firebase app and returns instances of Firestore and Authentication.
 * @returns An object containing the Firestore and Authentication instances.
 */
const initializeFirebase = (): { db: Firestore; auth: Auth } => {
  const firebaseConfig = getFirebaseConfig();
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(app);
  const auth: Auth = getAuth(app);

  return { db, auth };
};

const { db, auth } = initializeFirebase();

export { db, auth };
