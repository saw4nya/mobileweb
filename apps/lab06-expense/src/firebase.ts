import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // นำเข้า Firestore

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

// Initialize Firestore และ export ออกไปใช้งาน
export const db = getFirestore(app);