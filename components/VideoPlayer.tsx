import React, { useState, useEffect } from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface VideoPlayerProps {
  videoUrl: string;
  onComplete?: () => void;
  courseTitle: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onComplete,
  courseTitle,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  // YouTube, Vimeo 등의 URL을 임베드 URL로 변환
  const getEmbedUrl = (url: string): string => {
    // YouTube URL 처리
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : new URL(url).searchParams.get('v');

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
    }

    // Vimeo URL 처리
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      }
    }

    // 이미 임베드 URL인 경우 또는 직접 재생 가능한 URL
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  useEffect(() => {
    // 5분 후 완료 버튼 표시 (실제로는 영상 길이에 맞게 조정)
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowCompleteButton(true);
      }, 5 * 60 * 1000); // 5분

      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    setHasWatched(true);
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="video-wrapper">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <button
              onClick={handlePlay}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-6 transition-all transform hover:scale-110"
            >
              <Play size={48} fill="white" />
            </button>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            title={courseTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* 영상 컨트롤 */}
      <div className="space-y-3">
        {hasWatched && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center text-blue-700 text-sm">
              <CheckCircle size={18} className="mr-2" />
              <span>영상 시청 중입니다</span>
            </div>
          </div>
        )}

        {showCompleteButton && (
          <Button
            onClick={handleComplete}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <CheckCircle size={20} className="mr-2" />
            강의 완료하기
          </Button>
        )}

        {/* 배속 및 전체화면 가이드 */}
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>💡 플레이어 설정에서 배속을 조절할 수 있습니다</p>
          <p>전체화면 버튼을 눌러 큰 화면으로 시청하세요</p>
        </div>
      </div>
    </div>
  );
};
