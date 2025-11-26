import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Flame, ChevronRight } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { COURSES, CHALLENGES } from '../constants';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { analyticsEvents } from '../firebase/config';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, login, isAuthenticated } = useAuth();

  const todayCourse = COURSES[0];
  const recommendedCourses = COURSES.slice(1, 4);
  const activeChallenge = CHALLENGES.find(c => c.status === 'active') || CHALLENGES[0];

  useEffect(() => {
    analyticsEvents.pageView('home');

    // 자동 로그인 시도 (개발/테스트용)
    if (!isAuthenticated) {
      login();
    }
  }, []);

  const userName = user?.name || '김토스';

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="bg-white p-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              안녕하세요, <br/>{userName}님 👋
            </h1>
          </div>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Bell size={20} className="text-gray-600" />
          </button>
        </div>
        <p className="text-gray-500">오늘도 5분만 투자해서 AI와 친해져봐요!</p>
      </header>

      {/* Main Hero - Today's Pick */}
      <section className="px-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <Flame className="text-orange-500 mr-2" size={20} fill="currentColor" />
            오늘의 5분 강의
          </h2>
        </div>
        <div 
            onClick={() => navigate(`/courses/${todayCourse.id}`)}
            className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden cursor-pointer"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-bold mb-3">
                추천
            </span>
            <h3 className="text-2xl font-bold mb-2 leading-tight">{todayCourse.title}</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{todayCourse.description}</p>
            <div className="flex items-center text-sm font-medium text-blue-300">
                지금 바로 시작하기 <ChevronRight size={16} className="ml-1" />
            </div>
        </div>
      </section>

      {/* Challenge Status */}
      <section className="px-6">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-emerald-700 font-bold text-sm mb-1">14일 챌린지 진행중 🔥</div>
                    <h3 className="text-lg font-bold text-gray-900">Day {activeChallenge.day}. {activeChallenge.title}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-white border-4 border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-sm">
                    14%
                </div>
            </div>
            <Button 
                variant="secondary" 
                size="sm" 
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={() => navigate('/challenge')}
            >
                오늘 미션 인증하기
            </Button>
        </div>
      </section>

      {/* Recommended Horizontal List */}
      <section className="pl-6 pb-6">
        <div className="flex justify-between items-center pr-6 mb-3">
          <h2 className="text-lg font-bold text-gray-900">추천 강의</h2>
          <button onClick={() => navigate('/courses')} className="text-sm text-gray-500 font-medium">전체보기</button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar pb-4 pr-6">
          {recommendedCourses.map(course => (
            <CourseCard key={course.id} course={course} layout="horizontal" />
          ))}
        </div>
      </section>
    </div>
  );
};