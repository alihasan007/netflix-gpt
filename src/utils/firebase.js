import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQOPNemJL_sWnPIcCq1LdmZlKnWMFrS_k",
    authDomain: "netflix-gpt-01.firebaseapp.com",
    projectId: "netflix-gpt-01",
    storageBucket: "netflix-gpt-01.appspot.com",
    messagingSenderId: "43097745427",
    appId: "1:43097745427:web:cc6953850e32037527b7e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
