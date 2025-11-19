import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Share2 } from 'lucide-react';
import { getCourse, markCourseComplete, getWebinarSettings } from '../firebase/services';
import { Course } from '../types';
import { Button } from '../components/Button';
import { VideoPlayer } from '../components/VideoPlayer';
import { AdModal } from '../components/AdModal';
import { CompletionModal } from '../components/CompletionModal';

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const [adCompleted, setAdCompleted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [webinarUrl, setWebinarUrl] = useState('');
  const [webinarTitle, setWebinarTitle] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCourseData();
    loadWebinarSettings();
  }, [id]);

  const loadCourseData = async () => {
    if (!id) return;
    setLoading(true);
    const data = await getCourse(id);
    setCourse(data);
    setLoading(false);
  };

  const loadWebinarSettings = async () => {
    const settings = await getWebinarSettings();
    setWebinarUrl(settings.url);
    setWebinarTitle(settings.title);
  };

  const handleStartCourse = () => {
    setShowAd(true);
  };

  const handleAdComplete = () => {
    setAdCompleted(true);
  };

  const handleCourseComplete = async () => {
    if (!id) return;

    // 임시 사용자 ID (실제로는 토스 로그인 연동 필요)
    const userId = 'demo_user_' + Date.now();
    await markCourseComplete(userId, id);
    setShowCompletion(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">강의를 찾을 수 없습니다</p>
          <Button onClick={() => navigate('/courses')}>강의 목록으로</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-white/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Share2 size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 pb-24">
        <div className="flex space-x-2 mb-3">
          <span className="badge badge-secondary">{course.category}</span>
          <span className="badge badge-primary">{course.duration}</span>
          {course.difficulty && (
            <span className="badge bg-gray-200 text-gray-700">{course.difficulty}</span>
          )}
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{course.title}</h1>
        <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>

        {/* Video Player or Start Button */}
        {!adCompleted ? (
          <div className="mb-6">
            <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button onClick={handleStartCourse} size="lg" variant="primary">
                  학습 시작하기
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <VideoPlayer
              videoUrl={course.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
              onComplete={handleCourseComplete}
              courseTitle={course.title}
            />
          </div>
        )}

        {/* Learning Points */}
        <h3 className="font-bold text-lg mb-4">학습 포인트</h3>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">AI 도구의 기본 개념 이해하기</span>
          </li>
          <li className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">실무에서 바로 쓰는 프롬프트 3가지</span>
          </li>
          <li className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">5분 안에 실습까지 완료</span>
          </li>
        </ul>
      </div>

      {/* Modals */}
      <AdModal
        isOpen={showAd}
        onClose={() => setShowAd(false)}
        onAdComplete={handleAdComplete}
      />

      <CompletionModal
        isOpen={showCompletion}
        onClose={() => {
          setShowCompletion(false);
          navigate('/');
        }}
        title="강의 완료!"
        message="오늘의 학습을 성공적으로 마쳤어요. 더 깊이 배우고 싶다면 무료 공개특강에 참여해보세요!"
        webinarUrl={webinarUrl}
        webinarTitle={webinarTitle}
      />
    </div>
  );
};