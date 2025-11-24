"use client";

import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported as isAnalyticsSupported, Analytics, logEvent as logAnalyticsEvent } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// IMPORTANT: Replace with your own Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

// Use a promise to handle async analytics support check
const analytics: Promise<Analytics | null> = typeof window !== 'undefined' 
  ? isAnalyticsSupported().then(yes => yes ? getAnalytics(app) : null) 
  : new Promise(resolve => resolve(null));

// Wrapper for logging events to Analytics
const logEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  analytics.then(an => {
    if (an) {
      logAnalyticsEvent(an, eventName, eventParams);
    }
  });
};


export { app, auth, firestore, analytics, logEvent };
