import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCb7rEqEwx48ZLpODSIQFXpMDI-F6hbroc",
    authDomain: "expense-tracker-9180f.firebaseapp.com",
    projectId: "expense-tracker-9180f",
    storageBucket: "expense-tracker-9180f.firebasestorage.app",
    messagingSenderId: "696955529446",
    appId: "1:696955529446:web:fa8c5f4c475d7f9c777327"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
