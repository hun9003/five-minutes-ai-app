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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center px-4 py-2 max-w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 flex-1 max-w-[80px] py-1 ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};