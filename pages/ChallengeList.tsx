import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, Circle } from 'lucide-react';
import { CHALLENGES } from '../constants';

export const ChallengeList: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-green-500" size={24} />;
      case 'active': return <Circle className="text-blue-600" size={24} strokeWidth={3} />;
      default: return <Lock className="text-gray-300" size={24} />;
    }
  };

  const getBgColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-50 border-blue-200 ring-2 ring-blue-100';
      case 'completed': return 'bg-white border-gray-100 opacity-70';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="bg-white min-h-full">
      <header className="bg-emerald-600 p-6 text-white pb-10">
        <h1 className="text-2xl font-bold mb-2">14일 챌린지</h1>
        <p className="opacity-90">매일 조금씩 AI와 친해지는 미션!</p>
        
        <div className="mt-6 bg-white/20 rounded-full h-2 w-full overflow-hidden">
            <div className="bg-white h-full w-[14%]"></div>
        </div>
        <p className="text-right text-xs font-bold mt-2">1 / 14 Days</p>
      </header>

      <div className="px-4 -mt-6 space-y-3 pb-6">
        {CHALLENGES.map((challenge) => (
          <div
            key={challenge.day}
            onClick={() => {
                if (challenge.status !== 'locked') {
                    navigate(`/challenge/${challenge.day}`);
                }
            }}
            className={`relative p-4 rounded-2xl border flex items-center transition-all ${getBgColor(challenge.status)} ${challenge.status !== 'locked' ? 'cursor-pointer active:scale-[0.98]' : ''}`}
          >
            <div className="mr-4">
               {getIcon(challenge.status)}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wider ${challenge.status === 'active' ? 'text-blue-600' : 'text-gray-400'}`}>Day {challenge.day}</span>
                    {challenge.status === 'active' && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">TODAY</span>}
                </div>
                <h3 className={`font-bold text-lg ${challenge.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                    {challenge.title}
                </h3>
                {challenge.status !== 'locked' && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{challenge.description}</p>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};