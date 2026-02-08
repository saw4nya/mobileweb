// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtOsKfIclyCHYyZPefG8JXQIHqstcFT3U",
  authDomain: "mobileweb-9071d.firebaseapp.com",
  projectId: "mobileweb-9071d",
  storageBucket: "mobileweb-9071d.firebasestorage.app",
  messagingSenderId: "320251108260",
  appId: "1:320251108260:web:636176a14fafd559da3f31",
  measurementId: "G-5CPLN2GWPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);