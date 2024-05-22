export const Envs = {
  apiLocal: import.meta.env.VITE_API_LOCAL,
  apiRemote: import.meta.env.VITE_API,
  apiEnv: import.meta.env.VITE_API_ENVIRONMENT,

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,

  clientId: import.meta.env.VITE_GOOGLEOAUTH_CLIENT_ID,
};
