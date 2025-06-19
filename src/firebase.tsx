import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } = "firebase/firestore";

interface AppFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // Якщо ви використовуєте Google Analytics з Firebase
}

const rawFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function validateFirebaseConfig(config: typeof rawFirebaseConfig): AppFirebaseConfig {
  // 1. Створюємо об'єкт з типом AppFirebaseConfig.
  //    Спочатку ми призначаємо undefined, якщо змінна відсутня,
  //    а потім перевіряємо наявність.
  const validatedConfig: AppFirebaseConfig = {
    apiKey: config.apiKey as string, // Тимчасове приведення, буде перевірено нижче
    authDomain: config.authDomain as string,
    projectId: config.projectId as string,
    storageBucket: config.storageBucket as string,
    messagingSenderId: config.messagingSenderId as string,
    appId: config.appId as string,
    // measurementId: config.measurementId, // Додайте, якщо використовуєте
  };

  const requiredKeys: Array<keyof AppFirebaseConfig> = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  for (const key of requiredKeys) {
    if (validatedConfig[key] === undefined) { // Перевіряємо властивості нового об'єкта
      throw new Error(`Missing Firebase environment variable: REACT_APP_FIREBASE_${key.toUpperCase()}`);
    }
  }

  return validatedConfig; // Тепер TypeScript впевнений у типі
}

const firebaseConfig: AppFirebaseConfig = validateFirebaseConfig(rawFirebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const db = getFirestore(app);

export default app;