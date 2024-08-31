import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyB4fYTTFXvh0BcdfCP5Kj4eD8gsRSrExXI",
  authDomain: "todoapponreact-c6f01.firebaseapp.com",
  projectId: "todoapponreact-c6f01",
  storageBucket: "todoapponreact-c6f01.appspot.com",
  messagingSenderId: "534762881607",
  appId: "1:534762881607:web:5394f8a380bbd6d521e762"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db= getFirestore(app);

export default db