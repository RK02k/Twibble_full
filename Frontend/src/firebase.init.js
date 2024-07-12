import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCgqzOg65c9jc2PFx_FckMqzcEDrCPUQ58",
  authDomain: "social-tracer.firebaseapp.com",
  projectId: "social-tracer",
  storageBucket: "social-tracer.appspot.com",
  messagingSenderId: "386745378494",
  appId: "1:386745378494:web:38c7dbe55a111604db60ef",
  measurementId: "G-GL6DBCYN1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;