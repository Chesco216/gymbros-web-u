// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FB_API_KEY,
	authDomain: "gymbros-f0bab.firebaseapp.com",
	projectId: "gymbros-f0bab",
	storageBucket: "gymbros-f0bab.appspot.com",
	messagingSenderId: "755742057940",
	appId: "1:755742057940:web:bf0b71ba42f8a39c662241",
	measurementId: "G-QVSYN80TR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
const analytics = getAnalytics(app);
