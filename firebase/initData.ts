/**
 * Firebase 초기 데이터 설정 스크립트
 *
 * 이 파일을 실행하여 Firestore에 초기 데이터를 업로드할 수 있습니다.
 *
 * 실행 방법:
 * npx ts-node firebase/initData.ts
 */

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './config';
import { COURSES, CHALLENGES } from '../constants';

async function initializeData() {
  console.log('🚀 Firebase 데이터 초기화 시작...');

  try {
    // 강의 데이터 업로드
    console.log('📚 강의 데이터 업로드 중...');
    for (const course of COURSES) {
      const courseRef = doc(db, 'courses', course.id);
      await setDoc(courseRef, {
        ...course,
        videoUrl: course.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        createdAt: new Date().toISOString(),
      });
      console.log(`✅ 강의 업로드 완료: ${course.title}`);
    }

    // 챌린지 데이터 업로드
    console.log('\n🎯 챌린지 데이터 업로드 중...');
    for (const challenge of CHALLENGES) {
      const challengeRef = doc(db, 'challenges', `day_${challenge.day}`);
      await setDoc(challengeRef, challenge);
      console.log(`✅ 챌린지 업로드 완료: Day ${challenge.day}`);
    }

    // 웨비나 설정 업로드
    console.log('\n🎓 웨비나 설정 업로드 중...');
    const webinarRef = doc(db, 'settings', 'webinar');
    await setDoc(webinarRef, {
      url: 'https://example.com/webinar',
      title: '🎉 챗사피엔스 무료 공개특강 신청하기',
      updatedAt: new Date().toISOString(),
    });
    console.log('✅ 웨비나 설정 업로드 완료');

    console.log('\n✨ 모든 데이터 초기화 완료!');
  } catch (error) {
    console.error('❌ 데이터 초기화 실패:', error);
  }
}

// 스크립트 실행
initializeData();
