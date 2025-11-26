import React, { useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import { Button } from './Button';

interface MaterialGuideProps {
  gptsUrl?: string;
  gptsTitle?: string;
  cafeGuideText?: string;
}

export const MaterialGuide: React.FC<MaterialGuideProps> = ({
  gptsUrl,
  gptsTitle = '5분 AI 교재 GPTs',
  cafeGuideText = '챗사피엔스 네이버 카페에서 더 많은 학습 자료를 확인하세요',
}) => {
  const [showWebView, setShowWebView] = useState(false);

  const handleGPTsClick = () => {
    if (gptsUrl) {
      setShowWebView(true);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">📚</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <BookOpen size={18} className="mr-2" />
              학습 교재 안내
            </h4>

            {/* GPTs 교재 */}
            {gptsUrl && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">
                  AI 실습에 필요한 교재를 확인하세요
                </p>
                <Button
                  onClick={handleGPTsClick}
                  variant="primary"
                  size="sm"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  {gptsTitle}
                </Button>
              </div>
            )}

            {/* 네이버 카페 안내 (검색 안내 텍스트만) */}
            {cafeGuideText && (
              <div className="bg-white/70 rounded-xl p-3 border border-amber-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  💡 {cafeGuideText}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  네이버에서 "챗사피엔스"를 검색하세요
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 내부 WebView 모달 */}
      {showWebView && gptsUrl && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">{gptsTitle}</h3>
              <button
                onClick={() => setShowWebView(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={gptsUrl}
                className="w-full h-full"
                title="학습 교재"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
