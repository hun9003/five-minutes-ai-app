import React, { createContext, useContext, useState, ReactNode } from 'react';
// @ts-ignore - web-bridge types
import { GoogleAdMob } from '@apps-in-toss/web-bridge';

interface AdContextType {
  isAdLoaded: boolean;
  isAdShowing: boolean;
  loadAd: (adId: string) => void;
  showAd: () => Promise<boolean>;
  isAdReady: boolean;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

interface AdProviderProps {
  children: ReactNode;
}

// 프로덕션 광고 ID
const DEFAULT_AD_ID = 'ait.live.f7882484d2704417';

export const AdProvider: React.FC<AdProviderProps> = ({ children }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdShowing, setIsAdShowing] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);
  const [currentAdId, setCurrentAdId] = useState<string>(DEFAULT_AD_ID);

  const loadAd = (adId: string = DEFAULT_AD_ID): void => {
    console.log(`Loading ad with ID: ${adId}`);
    setCurrentAdId(adId);
    setIsAdReady(false);
    setIsAdLoaded(false);

    // 광고 SDK 지원 여부 확인
    if (GoogleAdMob?.loadAppsInTossAdMob?.isSupported?.() !== true) {
      console.warn('GoogleAdMob is not supported');
      setIsAdLoaded(true);
      setIsAdReady(true);
      return;
    }

    try {
      // 광고 로드 (올바른 API 사용)
      const cleanup = GoogleAdMob.loadAppsInTossAdMob({
        options: {
          adGroupId: adId, // adUnitId가 아닌 adGroupId 사용
        },
        onEvent: (event) => {
          console.log('광고 로드 이벤트:', event);
          if (event.type === 'loaded') {
            console.log('광고 로드 성공');
            setIsAdLoaded(true);
            setIsAdReady(true);
          }
        },
        onError: (error) => {
          console.error('광고 로드 실패:', error);
          setIsAdLoaded(false);
          setIsAdReady(false);
        },
      });

      // cleanup 함수는 컴포넌트 언마운트 시 호출되어야 하지만, 여기서는 무시
    } catch (error) {
      console.error('Load ad error:', error);
      // 에러 시에도 계속 진행 (개발 환경)
      setIsAdLoaded(true);
      setIsAdReady(true);
    }
  };

  const showAd = async (): Promise<boolean> => {
    if (!isAdReady) {
      console.warn('광고가 아직 준비되지 않았습니다. loadAd를 먼저 호출해주세요.');
      return false;
    }

    console.log(`광고 표시 시작 - ID: ${currentAdId}`);
    setIsAdShowing(true);

    // 광고 SDK 지원 여부 확인
    if (GoogleAdMob?.showAppsInTossAdMob?.isSupported?.() !== true) {
      console.warn('GoogleAdMob showAd is not supported');
      setIsAdShowing(false);
      return true;
    }

    try {
      return new Promise((resolve) => {
        let adCompleted = false;
        let hasResolved = false; // 중복 resolve 방지

        GoogleAdMob.showAppsInTossAdMob({
          options: {
            adGroupId: currentAdId, // adUnitId가 아닌 adGroupId 사용
          },
          onEvent: (event) => {
            console.log('광고 표시 이벤트:', event);

            switch (event.type) {
              case 'requested':
                console.log('광고 보여주기 요청 완료');
                break;

              case 'show':
                console.log('광고 콘텐츠 표시됨');
                break;

              case 'impression':
                console.log('광고 노출');
                break;

              case 'clicked':
                console.log('광고 클릭');
                break;

              case 'userEarnedReward':
                console.log('광고 보상 획득 (리워드형 광고 완료)');
                adCompleted = true;
                // dismissed 이벤트를 기다리지 않고 바로 완료 처리하지 않음
                break;

              case 'dismissed':
                console.log('광고 닫힘, 보상 획득 여부:', adCompleted);
                if (!hasResolved) {
                  hasResolved = true;
                  setIsAdShowing(false);
                  setIsAdReady(false);

                  // 리워드형 광고에서 userEarnedReward를 받았는지 확인
                  if (adCompleted) {
                    console.log('광고 시청 완료 - 강의 시청 가능');
                    resolve(true);
                  } else {
                    console.warn('광고를 끝까지 시청하지 않았습니다');
                    resolve(false);
                  }
                }
                break;

              case 'failedToShow':
                console.log('광고 보여주기 실패');
                if (!hasResolved) {
                  hasResolved = true;
                  setIsAdShowing(false);
                  setIsAdReady(false);
                  resolve(false);
                }
                break;
            }
          },
          onError: (error) => {
            console.error('광고 표시 실패:', error);
            if (!hasResolved) {
              hasResolved = true;
              setIsAdShowing(false);
              setIsAdReady(false);
              resolve(false);
            }
          },
        });
      });
    } catch (error) {
      console.error('Show ad error:', error);
      setIsAdShowing(false);
      return false;
    }
  };

  return (
    <AdContext.Provider
      value={{
        isAdLoaded,
        isAdShowing,
        loadAd,
        showAd,
        isAdReady,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useAd = (): AdContextType => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAd must be used within AdProvider');
  }
  return context;
};
