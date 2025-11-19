import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface WebinarBannerProps {
  url: string;
  title: string;
}

export const WebinarBanner: React.FC<WebinarBannerProps> = ({ url, title }) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white cursor-pointer transition-transform hover:scale-105 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Sparkles size={20} className="mr-2" fill="white" />
            <span className="text-xs font-bold uppercase tracking-wide">특별 혜택</span>
          </div>
          <h3 className="text-xl font-bold mb-2 leading-tight">{title}</h3>
          <p className="text-sm opacity-90 mb-4">
            챗사피엔스의 AI 전문가와 함께하는<br/>
            무료 온라인 특강에 초대합니다
          </p>
          <div className="flex items-center text-sm font-medium">
            지금 신청하기
            <ExternalLink size={16} className="ml-2" />
          </div>
        </div>
        <div className="text-4xl ml-4">
          🎓
        </div>
      </div>
    </div>
  );
};
