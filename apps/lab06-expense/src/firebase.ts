import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ต้องมีอันนี้

const firebaseConfig = {
  apiKey: "AIzaSyDtOsKfIclyCHYyZPefG8JXQIHqstcFT3U",
  authDomain: "mobileweb-9071d.firebaseapp.com",
  projectId: "mobileweb-9071d",
  storageBucket: "mobileweb-9071d.firebasestorage.app",
  messagingSenderId: "320251108260",
  appId: "1:320251108260:web:636176a14fafd559da3f31",
  measurementId: "G-5CPLN2GWPC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);