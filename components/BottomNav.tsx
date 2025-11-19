import React from 'react';
import { Home, BookOpen, Trophy, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '홈', icon: Home, path: '/' },
    { label: '강의실', icon: BookOpen, path: '/courses' },
    { label: '챌린지', icon: Trophy, path: '/challenge' },
    { label: '마이', icon: User, path: '/mypage' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe px-6 py-3 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 w-16 ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};