import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

// Read Firebase Web API Key dynamically from environment variable
// NEVER hardcoded in source code or config files
const apiKey: string = (import.meta.env.VITE_FIREBASE_API_KEY as string) || '';

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

if (apiKey && apiKey.trim().length > 0) {
  try {
    appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    dbInstance = firebaseConfigData.firestoreDatabaseId
      ? getFirestore(appInstance, firebaseConfigData.firestoreDatabaseId)
      : getFirestore(appInstance);
  } catch (err) {
    console.warn('Firebase initialization error:', err);
  }
}

export const app = appInstance;
export const db = dbInstance;
export const isFirebaseConfigured = Boolean(apiKey && dbInstance);
export default db;

