import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getWebinarSettings } from '../firebase/services';
import { Settings, Award } from 'lucide-react';
import { WebinarBanner } from '../components/WebinarBanner';

export const MyPage: React.FC = () => {
  const [webinarUrl, setWebinarUrl] = useState('');
  const [webinarTitle, setWebinarTitle] = useState('');

  useEffect(() => {
    loadWebinarSettings();
  }, []);

  const loadWebinarSettings = async () => {
    const settings = await getWebinarSettings();
    setWebinarUrl(settings.url);
    setWebinarTitle(settings.title);
  };

  // Mock Data for chart
  const data = [
    { name: '완료', value: 4 },
    { name: '미완료', value: 6 },
  ];
  const COLORS = ['#3b82f6', '#e5e7eb'];

  return (
    <div className="min-h-full bg-gray-50">
      <header className="bg-white p-6 mb-4">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
                     <img src="https://picsum.photos/200?random=user" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">김토스님</h1>
                    <p className="text-sm text-gray-500">AI 입문자 레벨 🐣</p>
                </div>
            </div>
            <button className="p-2 text-gray-400">
                <Settings size={24} />
            </button>
        </div>

        <div className="flex space-x-4">
            <div className="flex-1 bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">4개</div>
                <div className="text-xs text-gray-500">수강한 강의</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">1일</div>
                <div className="text-xs text-gray-500">챌린지 연속</div>
            </div>
        </div>
      </header>

      <section className="bg-white p-6 mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">학습 현황</h2>
        <div className="h-48 w-full flex items-center">
            <div className="w-1/2 h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-xl font-bold text-blue-600">40%</span>
                </div>
            </div>
            <div className="w-1/2 pl-4">
                <p className="text-gray-600 text-sm mb-2">총 10개 강의 중 <br/><strong>4개</strong>를 완료했어요!</p>
                <p className="text-xs text-gray-400">조금만 더 힘내세요 💪</p>
            </div>
        </div>
      </section>

      {/* Webinar Banner */}
      {webinarUrl && webinarTitle && (
        <section className="px-4 mb-8">
          <WebinarBanner url={webinarUrl} title={webinarTitle} />
        </section>
      )}

      <section className="bg-white p-4 mb-20">
        <h2 className="text-lg font-bold text-gray-900 mb-2 px-2">획득한 배지</h2>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar p-2">
            <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2 text-3xl border-4 border-yellow-200">
                    🐣
                </div>
                <span className="text-xs font-bold text-gray-600">첫 시작</span>
            </div>
            <div className="flex flex-col items-center min-w-[80px] opacity-40 grayscale">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-gray-400">
                    <Award size={32} />
                </div>
                <span className="text-xs font-bold text-gray-400">3일 연속</span>
            </div>
            <div className="flex flex-col items-center min-w-[80px] opacity-40 grayscale">
                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-gray-400">
                    <Award size={32} />
                </div>
                <span className="text-xs font-bold text-gray-400">챌린지왕</span>
            </div>
        </div>
      </section>
    </div>
  );
};