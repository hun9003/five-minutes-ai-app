import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from './Button';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  webinarUrl?: string;
  webinarTitle?: string;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  webinarUrl,
  webinarTitle,
}) => {
  if (!isOpen) return null;

  const handleWebinarClick = () => {
    if (webinarUrl) {
      window.open(webinarUrl, '_blank');
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 slide-up">
        {/* 성공 아이콘 */}
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* 웨비나 안내 */}
        {webinarUrl && webinarTitle && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🎓</div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">다음 단계로!</h4>
                <p className="text-sm text-gray-600 mb-3">
                  AI를 더 깊이 배우고 싶으신가요?<br/>
                  무료 공개특강에 참여해보세요!
                </p>
                <Button
                  onClick={handleWebinarClick}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  <ExternalLink size={16} className="mr-2" />
                  {webinarTitle}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 닫기 버튼 */}
        <Button
          onClick={onClose}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          계속 학습하기
        </Button>
      </div>
    </div>
  );
};
