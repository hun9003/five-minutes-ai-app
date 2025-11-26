import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  if (!isOpen) return null;

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
