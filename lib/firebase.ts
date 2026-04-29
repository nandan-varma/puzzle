import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirebaseAuth = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirebaseDb = any;

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: FirebaseAuth = getAuth(app);
const db: FirebaseDb = getDatabase(app);

export { auth, db };
export type { FirebaseAuth, FirebaseDb };