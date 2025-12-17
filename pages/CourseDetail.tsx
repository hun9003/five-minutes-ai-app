import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { TossConfirmDialog, TossAlertDialog } from '../components/TossDialog';
import { COURSES } from '../constants';
import { markCourseComplete, getMaterialSettings } from '../firebase/services';
import { analyticsEvents } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useAd } from '../contexts/AdContext';
import { Button } from '../components/Button';
import { VideoPlayer } from '../components/VideoPlayer';
import { CompletionModal } from '../components/CompletionModal';
import { MaterialGuide } from '../components/MaterialGuide';

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loadAd, showAd: showAdFunction, isAdReady, isAdShowing } = useAd();

  const [course, setCourse] = useState(COURSES.find(c => c.id === id) || null);
  const [adCompleted, setAdCompleted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [gptsUrl, setGptsUrl] = useState('');
  const [gptsTitle, setGptsTitle] = useState('');
  const [cafeGuideText, setCafeGuideText] = useState('');

  // 다이얼로그 상태
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (course) {
      analyticsEvents.courseViewed(course.id, course.title);
      // 광고 미리 로드 (전면형 광고)
      loadAd('ait.v2.live.bcab5f51543443d9');
    }

    loadMaterialSettings();
  }, [id, course]);

  const loadMaterialSettings = async () => {
    const settings = await getMaterialSettings();
    setGptsUrl(settings.gptsUrl);
    setGptsTitle(settings.gptsTitle);
    setCafeGuideText(settings.cafeGuideText);
  };

  const handleStartCourse = () => {
    if (!course) return;

    // 첫 번째 영상(c1)은 확인 다이얼로그 없이 바로 시작
    if (course.id === 'c1') {
      analyticsEvents.courseStarted(course.id);
      setAdCompleted(true);
      return;
    }

    // 나머지 강의는 ConfirmDialog 표시
    setShowConfirmDialog(true);
  };

  const handleConfirmAd = async () => {
    if (!course) return;

    setShowConfirmDialog(false);

    // 첫 번째 영상(c1)은 광고 없이 바로 시청 가능
    if (course.id === 'c1') {
      analyticsEvents.courseStarted(course.id);
      setAdCompleted(true);
      return;
    }

    // 광고가 준비되지 않았다면 대기
    if (!isAdReady) {
      console.log('광고가 아직 준비 중입니다. 광고를 다시 로드합니다.');
      loadAd('ait.v2.live.bcab5f51543443d9');

      // 광고 로드 대기 (최대 5초)
      let waitCount = 0;
      while (!isAdReady && waitCount < 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        waitCount++;
      }

      if (!isAdReady) {
        setAlertMessage('광고를 준비하는 중입니다. 잠시 후 다시 시도해주세요.');
        setShowAlertDialog(true);
        return;
      }
    }

    analyticsEvents.courseStarted(course.id);
    analyticsEvents.adViewed(course.id);

    // 광고 표시
    const adResult = await showAdFunction();
    if (adResult) {
      setAdCompleted(true);
    } else {
      // 광고 시청 실패
      setAlertMessage('광고를 시청하지 못했습니다. 다시 시도해주세요.');
      setShowAlertDialog(true);
    }
  };

  const handleCourseComplete = async () => {
    if (!course || !user) return;

    await markCourseComplete(user.userKey.toString(), course.id);
    analyticsEvents.courseCompleted(course.id, 300); // 5분
    setShowCompletion(true);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <p className="text-gray-600 mb-4">강의를 찾을 수 없습니다</p>
          <Button onClick={() => navigate('/courses')}>강의 목록으로</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 p-4 z-10 bg-white/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={24} />
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

        {/* 교재 안내 블록 */}
        <MaterialGuide
          gptsUrl={gptsUrl}
          gptsTitle={gptsTitle}
          cafeGuideText={cafeGuideText}
        />

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
                <Button
                  onClick={handleStartCourse}
                  size="lg"
                  variant="primary"
                  loading={course.id !== 'c1' && !isAdReady}
                >
                  {course.id !== 'c1' && !isAdReady ? '' : '학습 시작하기'}
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
        {course.learningPoints && course.learningPoints.length > 0 && (
          <>
            <h3 className="font-bold text-lg mb-4">학습 포인트</h3>
            <ul className="space-y-3 mb-8">
              {course.learningPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Modals */}
      <CompletionModal
        isOpen={showCompletion}
        onClose={() => {
          setShowCompletion(false);
          navigate('/');
        }}
        title="강의 완료!"
        message="오늘의 학습을 성공적으로 마쳤어요. 교재에서 더 많은 내용을 확인해보세요!"
      />

      {/* 광고 시청 확인 다이얼로그 */}
      <TossConfirmDialog
        open={showConfirmDialog}
        title="광고를 보고 강의를 시청할까요?"
        description="광고를 시청하면 무료로 강의를 볼 수 있어요"
        onCancel={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmAd}
        cancelText="취소"
        confirmText="확인"
      />

      {/* 알림 다이얼로그 */}
      <TossAlertDialog
        open={showAlertDialog}
        title="알림"
        description={alertMessage}
        onClose={() => setShowAlertDialog(false)}
        buttonText="확인"
      />
    </div>
  );
};