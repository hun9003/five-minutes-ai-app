import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { Course, ChallengeDay, UserStats } from '../types';

// 컬렉션 참조
const COLLECTIONS = {
  COURSES: 'courses',
  CHALLENGES: 'challenges',
  USERS: 'users',
  SETTINGS: 'settings',
  USER_PROGRESS: 'userProgress',
};

// 강의 목록 가져오기
export async function getCourses(): Promise<Course[]> {
  try {
    const coursesRef = collection(db, COLLECTIONS.COURSES);
    const q = query(coursesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return [];
  }
}

// 특정 강의 가져오기
export async function getCourse(courseId: string): Promise<Course | null> {
  try {
    const courseRef = doc(db, COLLECTIONS.COURSES, courseId);
    const snapshot = await getDoc(courseRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Course;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch course:', error);
    return null;
  }
}

// 챌린지 목록 가져오기
export async function getChallenges(): Promise<ChallengeDay[]> {
  try {
    const challengesRef = collection(db, COLLECTIONS.CHALLENGES);
    const q = query(challengesRef, orderBy('day', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data() } as ChallengeDay));
  } catch (error) {
    console.error('Failed to fetch challenges:', error);
    return [];
  }
}

// 사용자 통계 가져오기
export async function getUserStats(userId: string): Promise<UserStats> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      return snapshot.data() as UserStats;
    }
    return {
      completedCourses: 0,
      challengeProgress: 0,
      totalStudyTime: 0,
    };
  } catch (error) {
    console.error('Failed to fetch user stats:', error);
    return {
      completedCourses: 0,
      challengeProgress: 0,
      totalStudyTime: 0,
    };
  }
}

// 강의 완료 기록
export async function markCourseComplete(userId: string, courseId: string): Promise<void> {
  try {
    const progressRef = doc(db, COLLECTIONS.USER_PROGRESS, `${userId}_${courseId}`);
    await setDoc(progressRef, {
      userId,
      courseId,
      completedAt: new Date().toISOString(),
      type: 'course',
    });
  } catch (error) {
    console.error('Failed to mark course complete:', error);
  }
}

// 챌린지 완료 기록
export async function markChallengeComplete(userId: string, day: number): Promise<void> {
  try {
    const progressRef = doc(db, COLLECTIONS.USER_PROGRESS, `${userId}_challenge_${day}`);
    await setDoc(progressRef, {
      userId,
      day,
      completedAt: new Date().toISOString(),
      type: 'challenge',
    });
  } catch (error) {
    console.error('Failed to mark challenge complete:', error);
  }
}

// 웨비나 설정 가져오기 (하위 호환성 유지)
export async function getWebinarSettings(): Promise<{ url: string; title: string }> {
  try {
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'webinar');
    const snapshot = await getDoc(settingsRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        url: data.url || '',
        title: data.title || '무료 공개특강 신청하기',
      };
    }
    return {
      url: 'https://example.com/webinar',
      title: '🎉 챗사피엔스 무료 공개특강 신청하기',
    };
  } catch (error) {
    console.error('Failed to fetch webinar settings:', error);
    return {
      url: 'https://example.com/webinar',
      title: '🎉 챗사피엔스 무료 공개특강 신청하기',
    };
  }
}

// 교재 설정 가져오기
export async function getMaterialSettings(): Promise<{
  gptsUrl: string;
  gptsTitle: string;
  cafeGuideText: string;
}> {
  try {
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'materials');
    const snapshot = await getDoc(settingsRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        gptsUrl: data.gptsUrl || '',
        gptsTitle: data.gptsTitle || '5분 AI 교재 GPTs',
        cafeGuideText: data.cafeGuideText || '챗사피엔스 네이버 카페에서 더 많은 학습 자료를 확인하세요',
      };
    }
    return {
      gptsUrl: '',
      gptsTitle: '5분 AI 교재 GPTs',
      cafeGuideText: '챗사피엔스 네이버 카페에서 더 많은 학습 자료를 확인하세요',
    };
  } catch (error) {
    console.error('Failed to fetch material settings:', error);
    return {
      gptsUrl: '',
      gptsTitle: '5분 AI 교재 GPTs',
      cafeGuideText: '챗사피엔스 네이버 카페에서 더 많은 학습 자료를 확인하세요',
    };
  }
}

// 사용자 진행상황 가져오기
export async function getUserProgress(userId: string) {
  try {
    const progressRef = collection(db, COLLECTIONS.USER_PROGRESS);
    const q = query(progressRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);

    const completed = {
      courses: [] as string[],
      challenges: [] as number[],
    };

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.type === 'course') {
        completed.courses.push(data.courseId);
      } else if (data.type === 'challenge') {
        completed.challenges.push(data.day);
      }
    });

    return completed;
  } catch (error) {
    console.error('Failed to fetch user progress:', error);
    return { courses: [], challenges: [] };
  }
}
