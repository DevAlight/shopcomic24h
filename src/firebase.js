// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDM6QnZcTzBeqi_vYBH4m55ll7MoGPU2sE",
    authDomain: "nodal-time-344313.firebaseapp.com",
    projectId: "nodal-time-344313",
    storageBucket: "nodal-time-344313.appspot.com",
    messagingSenderId: "295061794176",
    appId: "1:295061794176:web:7ebad576cfca6164432565",
    measurementId: "G-EGC13FB8LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);
auth.languageCode = 'it';

export default auth