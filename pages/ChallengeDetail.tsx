import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Camera, CheckCircle2 } from 'lucide-react';
import { CHALLENGES, WEBINAR_URL } from '../constants';
import { Button } from '../components/Button';

export const ChallengeDetail: React.FC = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const challenge = CHALLENGES.find(c => c.day === Number(day));
  
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!challenge) return <div>Challenge not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
      return (
        <div className="min-h-screen bg-emerald-600 flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 animate-bounce text-emerald-600 text-4xl">
                🏆
            </div>
            <h1 className="text-3xl font-bold mb-2">미션 성공!</h1>
            <p className="text-emerald-100 mb-8 text-lg">
                Day {challenge.day} 챌린지를 완료했어요.<br/>
                AI 마스터에 한 걸음 더 가까워졌네요!
            </p>
            <Button 
                variant="secondary" 
                className="bg-white text-emerald-600 hover:bg-gray-100 w-full mb-4 shadow-none"
                onClick={() => window.open(WEBINAR_URL, '_blank')}
            >
                🎁 보상: 무료 특강 신청하기
            </Button>
             <Button 
                variant="outline" 
                className="border-emerald-300 text-emerald-100 hover:bg-emerald-700 w-full"
                onClick={() => navigate('/challenge')}
            >
                목록으로 돌아가기
            </Button>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="p-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <span className="font-bold text-lg text-gray-900">Day {challenge.day} 미션</span>
      </div>

      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">
            진행중
        </span>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{challenge.title}</h1>
        <div className="bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
            <p className="text-gray-700 leading-relaxed font-medium">
                {challenge.description}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    1. 텍스트 인증
                </label>
                <textarea
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    rows={4}
                    placeholder="실습하면서 느낀 점이나 결과를 적어주세요."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    2. 이미지 인증 (선택)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                         {file ? (
                            <div className="flex items-center text-blue-600">
                                <CheckCircle2 size={24} className="mr-2" />
                                <span className="font-bold">{file.name}</span>
                            </div>
                         ) : (
                             <>
                                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">결과물 캡처 사진 올리기</p>
                             </>
                         )}
                    </div>
                    <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => e.target.files && setFile(e.target.files[0])}
                    />
                </label>
            </div>

            <div className="pt-4">
                <Button 
                    type="submit" 
                    fullWidth 
                    size="lg" 
                    disabled={textInput.length < 5 || isSubmitting}
                >
                    {isSubmitting ? '제출 중...' : '미션 완료하고 인증하기'}
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
};