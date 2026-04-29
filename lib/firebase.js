import { apps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDfnZC9WYqscMiq8kprdOCDPoA6xHiLu3c',
  authDomain: 'puzzle-koushik-49.firebaseapp.com',
  databaseURL:
    'https://puzzle-koushik-49-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'puzzle-koushik-49',
  storageBucket: 'puzzle-koushik-49.appspot.com',
  messagingSenderId: '729780575224',
  appId: '1:729780575224:web:ebbf30cb716dfe2dae540d',
  measurementId: 'G-9ZMEG19MZC',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
