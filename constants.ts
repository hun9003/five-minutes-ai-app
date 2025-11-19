import { Category, ChallengeDay, Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'AI 문서 자동화 시작하기',
    description: '복잡한 보고서 작성을 5분 만에 끝내는 비법을 알려드립니다.',
    thumbnail: 'https://picsum.photos/400/225?random=1',
    duration: '5분',
    difficulty: 'Easy',
    category: Category.OFFICE,
    isPopular: true,
  },
  {
    id: 'c2',
    title: '스마트폰으로 AI 그림 그리기',
    description: '손재주가 없어도 괜찮아요. 말하는 대로 그려주는 AI 체험.',
    thumbnail: 'https://picsum.photos/400/225?random=2',
    duration: '6분',
    difficulty: 'Easy',
    category: Category.SENIOR,
    isPopular: true,
  },
  {
    id: 'c3',
    title: '챗GPT 회원가입부터 첫 대화까지',
    description: '가장 기초적인 AI 사용법, 천천히 따라해 보세요.',
    thumbnail: 'https://picsum.photos/400/225?random=3',
    duration: '4분',
    difficulty: 'Easy',
    category: Category.BASIC,
  },
  {
    id: 'c4',
    title: '엑셀 함수, AI에게 물어보기',
    description: '직장인 필수 스킬! 엑셀 수식을 AI가 대신 짜줍니다.',
    thumbnail: 'https://picsum.photos/400/225?random=4',
    duration: '5분',
    difficulty: 'Medium',
    category: Category.OFFICE,
  },
  {
    id: 'c5',
    title: '건강 정보, AI로 쉽게 찾기',
    description: '복잡한 검색 대신 AI에게 건강 상식을 물어보세요.',
    thumbnail: 'https://picsum.photos/400/225?random=5',
    duration: '5분',
    difficulty: 'Easy',
    category: Category.SENIOR,
  },
];

export const CHALLENGES: ChallengeDay[] = [
  { day: 1, title: 'AI에게 "안녕" 인사하기', description: '아무 AI 챗봇을 열고 인사를 건네보세요.', status: 'completed' },
  { day: 2, title: '저녁 메뉴 추천받기', description: '오늘 냉장고에 있는 재료를 알려주고 메뉴를 추천받으세요.', status: 'active' },
  { day: 3, title: '감사 이메일 초안 쓰기', description: '동료에게 보낼 감사 메일을 AI에게 써달라고 하세요.', status: 'locked' },
  { day: 4, title: '여행 계획 세우기', description: '가고 싶은 여행지의 1일 코스를 짜달라고 해보세요.', status: 'locked' },
  { day: 5, title: '시 한 편 짓기', description: '좋아하는 단어 3개를 주고 시를 써달라고 하세요.', status: 'locked' },
  { day: 6, title: '영어 문장 번역하기', description: '간단한 한국어 문장을 영어로 번역해달라고 하세요.', status: 'locked' },
  { day: 7, title: 'AI 그림 생성해보기', description: '무료 이미지 생성 도구를 사용해 그림을 만들어보세요.', status: 'locked' },
  // ... extended to 14
];

export const WEBINAR_URL = "https://example.com/webinar-registration";
export const WEBINAR_TITLE = "🎉 챗사피엔스 무료 공개특강 신청하기";