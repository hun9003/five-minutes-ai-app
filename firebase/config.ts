import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "AIzaSyBbDqT2F5E_xGlC8L7MZv3tN0XQ6vJYZKw",
  authDomain: "five-minutes-ai.firebaseapp.com",
  projectId: "five-minutes-ai",
  storageBucket: "five-minutes-ai.firebasestorage.app",
  messagingSenderId: "711151880376",
  appId: "1:711151880376:web:YOUR_APP_ID",
  measurementId: "G-YOUR_MEASUREMENT_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 데이터베이스
export const db = getFirestore(app);

// Analytics (선택사항)
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

export { analytics };
export default app;
