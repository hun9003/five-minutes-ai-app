import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent as firebaseLogEvent, Analytics } from 'firebase/analytics';

// Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "AIzaSyBbDqT2F5E_xGlC8L7MZv3tN0XQ6vJYZKw",
  authDomain: "five-minutes-ai.firebaseapp.com",
  projectId: "five-minutes-ai",
  storageBucket: "five-minutes-ai.firebasestorage.app",
  messagingSenderId: "711151880376",
  appId: "1:711151880376:web:a5b4c3d2e1f0g9h8",
  measurementId: "G-XXXXXXXXXX"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 데이터베이스
export const db = getFirestore(app);

// Analytics
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('Firebase Analytics initialized');
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

// Analytics 헬퍼 함수
export const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
  } else {
    console.log(`[Analytics] ${eventName}`, eventParams);
  }
};

// 커스텀 이벤트
export const analyticsEvents = {
  // 강의 관련
  courseViewed: (courseId: string, courseTitle: string) =>
    logEvent('course_viewed', { course_id: courseId, course_title: courseTitle }),

  courseStarted: (courseId: string) =>
    logEvent('course_started', { course_id: courseId }),

  courseCompleted: (courseId: string, duration: number) =>
    logEvent('course_completed', { course_id: courseId, duration_seconds: duration }),

  // 광고 관련
  adViewed: (courseId: string) =>
    logEvent('ad_viewed', { course_id: courseId }),

  // 챌린지 관련
  challengeStarted: (day: number) =>
    logEvent('challenge_started', { day }),

  challengeCompleted: (day: number) =>
    logEvent('challenge_completed', { day }),

  // 웨비나 관련
  webinarClicked: (source: string) =>
    logEvent('webinar_clicked', { source }),

  // 사용자 행동
  pageView: (pageName: string) =>
    logEvent('page_view', { page_name: pageName }),
};

export { analytics };
export default app;
