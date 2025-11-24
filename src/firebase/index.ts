'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getPerformance, type FirebasePerformance } from 'firebase/performance';
import { getRemoteConfig, type RemoteConfig } from 'firebase/remote-config';


// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  let firebaseApp: FirebaseApp;
  if (!getApps().length) {
    try {
      firebaseApp = initializeApp();
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }
  } else {
    firebaseApp = getApp();
  }

  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  const isBrowser = typeof window !== 'undefined';
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    analytics: isBrowser ? getAnalytics(firebaseApp) : null,
    performance: isBrowser ? getPerformance(firebaseApp) : null,
    remoteConfig: isBrowser ? getRemoteConfig(firebaseApp) : null,
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
export { type Analytics, type FirebasePerformance, type RemoteConfig };
