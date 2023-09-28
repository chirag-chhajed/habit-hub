import { type FirebaseApp, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

// console.log(process.env.NEXT_PUBLIC_MEASUREMENT_ID);

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi3yRQwFJQA44sb6FfuzLdA42j0SZQurs",
  authDomain: "habithub-32850.firebaseapp.com",
  projectId: "habithub-32850",
  storageBucket: "habithub-32850.appspot.com",
  messagingSenderId: "898823675615",
  appId: "1:898823675615:web:bc428c179ea9cd04f2536a",
  measurementId: "G-9Z7H8S0TG6",
};

let app: FirebaseApp; // Declare the app variable outside the if statement

// Check if Firebase app has already been initialized
if (firebase.getApps().length === 0) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
} else {
  // If Firebase app already exists, use the existing instance
  app = firebase.getApp();
}

export const auth: Auth = getAuth(app);

export const analytics = () => {
  if (typeof window !== undefined) {
    return getAnalytics(app);
  } else {
    console.log("Analytics not supported");
    return null;
  }
};

export const db = getFirestore(app);

export default app;
