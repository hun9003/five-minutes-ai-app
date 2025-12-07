export enum Category {
  ALL = '전체',
  BASIC = '기초',
  OFFICE = '직장인',
  SENIOR = '시니어',
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string; // YouTube, Vimeo 등의 영상 URL
  duration: string; // e.g., "5분"
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: Category;
  isPopular?: boolean;
  learningPoints?: string[]; // 학습 포인트 배열
}

export interface ChallengeDay {
  day: number;
  title: string;
  description: string;
  status: 'locked' | 'active' | 'completed';
}

export interface UserStats {
  completedCourses: number;
  challengeProgress: number; // 0 to 100
  totalStudyTime: number; // in minutes
}