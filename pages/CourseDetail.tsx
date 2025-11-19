import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Share2 } from 'lucide-react';
import { COURSES, WEBINAR_URL } from '../constants';
import { Button } from '../components/Button';

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === id);
  
  // States for video player logic
  const [isPlaying, setIsPlaying] = useState(false);
  const [adPlaying, setAdPlaying] = useState(false);
  const [adTimer, setAdTimer] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Reset scrolling on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Ad timer effect
  useEffect(() => {
    let interval: any;
    if (adPlaying && adTimer > 0) {
      interval = setInterval(() => {
        setAdTimer((prev) => prev - 1);
      }, 1000);
    } else if (adPlaying && adTimer === 0) {
      setAdPlaying(false);
      setIsPlaying(true);
    }
    return () => clearInterval(interval);
  }, [adPlaying, adTimer]);

  if (!course) return <div>Course not found</div>;

  const handleStart = () => {
    setAdPlaying(true);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setShowPopup(true);
  };

  const handleWebinarRedirect = () => {
    window.open(WEBINAR_URL, '_blank');
    setShowPopup(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white z-50 relative">
      {/* Nav Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <button onClick={() => navigate(-1)} className="bg-white/80 backdrop-blur p-2 rounded-full shadow-sm">
          <ArrowLeft size={24} />
        </button>
        <button className="bg-white/80 backdrop-blur p-2 rounded-full shadow-sm">
          <Share2 size={24} />
        </button>
      </div>

      {/* Video Player Area */}
      <div className="w-full aspect-video bg-gray-900 relative flex items-center justify-center overflow-hidden">
        {!isPlaying && !adPlaying && (
          <>
            <img src={course.thumbnail} alt="thumbnail" className="w-full h-full object-cover opacity-60" />
            <button 
              onClick={handleStart}
              className="absolute inset-0 flex items-center justify-center flex-col text-white"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Play size={32} fill="currentColor" className="ml-1" />
              </div>
              <span className="mt-4 font-bold text-lg shadow-black drop-shadow-md">학습 시작하기</span>
            </button>
          </>
        )}

        {adPlaying && (
          <div className="bg-black text-white flex flex-col items-center justify-center w-full h-full z-20">
            <p className="text-xl font-bold mb-2">광고 재생 중...</p>
            <p className="text-sm text-gray-400">강의가 곧 시작됩니다: {adTimer}초</p>
          </div>
        )}

        {isPlaying && (
          <div className="w-full h-full bg-black flex items-center justify-center relative group">
            {/* Placeholder for actual iframe */}
            <p className="text-white font-medium">영상 재생 중... (Demo)</p>
            
            {/* Controls Overlay Sim */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full bg-gray-600 h-1 rounded-full mb-2">
                    <div className="bg-blue-500 h-1 w-1/3 rounded-full"></div>
                </div>
                <div className="flex justify-between text-white text-xs">
                   <span>01:42 / 05:00</span>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 pb-24">
        <div className="flex space-x-2 mb-3">
           <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">{course.category}</span>
           <span className="px-2 py-1 bg-blue-50 rounded text-xs font-bold text-blue-600">{course.duration}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{course.title}</h1>
        <p className="text-gray-600 leading-relaxed mb-8">{course.description}</p>

        {/* Learning Checkpoints (Static for Demo) */}
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
        </ul>

        {isPlaying && !isCompleted && (
           <Button fullWidth size="lg" onClick={handleComplete}>
             강의 완료 체크하기
           </Button>
        )}
        {isCompleted && (
             <Button fullWidth size="lg" variant="secondary" disabled>
                학습 완료됨
            </Button>
        )}
      </div>

      {/* Completion Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl scale-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">강의 완료!</h2>
            <p className="text-gray-500 mb-6">
              오늘의 학습을 성공적으로 마쳤어요.<br/>
              더 깊이 배우고 싶다면?
            </p>
            <Button fullWidth onClick={handleWebinarRedirect} className="mb-3">
              무료 공개특강 신청하기
            </Button>
            <button 
              onClick={() => { setShowPopup(false); navigate(-1); }}
              className="text-gray-400 text-sm underline p-2"
            >
              다음에 하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};