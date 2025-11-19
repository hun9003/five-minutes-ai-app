import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
}

export const AdModal: React.FC<AdModalProps> = ({
  isOpen,
  onClose,
  onAdComplete,
}) => {
  const [countdown, setCountdown] = useState(5); // 5초 광고
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      setCanClose(false);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (canClose) {
      onAdComplete();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 slide-up">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">광고</h3>
          {canClose && (
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          )}
        </div>

        {/* 광고 내용 (실제로는 광고 SDK를 여기에 통합) */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center space-y-4 mb-4">
          <div className="text-4xl">📺</div>
          <h4 className="text-xl font-bold">광고 시청 중</h4>
          <p className="text-sm opacity-90">
            잠시만 기다려주세요
          </p>
          {!canClose && (
            <div className="text-2xl font-bold">
              {countdown}초
            </div>
          )}
        </div>

        {/* 안내 메시지 */}
        <div className="text-sm text-gray-600 text-center mb-4">
          <p>광고 시청 후 강의를 무료로 볼 수 있습니다</p>
        </div>

        {/* 닫기 버튼 */}
        {canClose && (
          <Button
            onClick={handleClose}
            variant="primary"
            size="lg"
            className="w-full"
          >
            강의 시작하기
          </Button>
        )}

        {/* 카운트다운 프로그레스 */}
        {!canClose && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
