import React from 'react';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full overflow-hidden relative">
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};