import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdContextType {
  isAdLoaded: boolean;
  isAdShowing: boolean;
  loadAd: (adId: string) => Promise<void>;
  showAd: () => Promise<boolean>;
  isAdReady: boolean;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

interface AdProviderProps {
  children: ReactNode;
}

// 테스트용 광고 ID
const TEST_AD_ID = 'ait-ad-test-interstitial-id';

export const AdProvider: React.FC<AdProviderProps> = ({ children }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdShowing, setIsAdShowing] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);

  const loadAd = async (adId: string = TEST_AD_ID): Promise<void> => {
    try {
      // 토스 앱 환경에서만 실제 광고 로드
      if (typeof window !== 'undefined' && (window as any).TossAppBridge) {
        try {
          const { GoogleAdMob } = await import('@apps-in-toss/web-bridge');

          // isSupported 확인
          if (!GoogleAdMob.loadAppsInTossAdMob.isSupported()) {
            console.warn('GoogleAdMob is not supported');
            setIsAdLoaded(true);
            setIsAdReady(true);
            return;
          }

          // loadAppsInTossAdMob 호출
          GoogleAdMob.loadAppsInTossAdMob({
            options: {
              adUnitId: adId,
            },
            onEvent: (event) => {
              console.log('Ad event:', event);
              if (event.type === 'loaded') {
                console.log('Ad loaded successfully');
                setIsAdLoaded(true);
                setIsAdReady(true);
              }
            },
            onError: (error) => {
              console.error('Ad failed to load:', error);
              setIsAdLoaded(false);
              setIsAdReady(false);
            },
          });
        } catch (error) {
          console.error('Failed to load Toss ad:', error);
          // 폴백: 로컬 테스트를 위해 광고 준비 완료로 설정
          setIsAdLoaded(true);
          setIsAdReady(true);
        }
      } else {
        // 웹 환경에서는 즉시 준비 완료
        console.log('Dev mode: Ad loaded (simulated)');
        setIsAdLoaded(true);
        setIsAdReady(true);
      }
    } catch (error) {
      console.error('Load ad error:', error);
      // 에러 시에도 계속 진행 (개발 환경)
      setIsAdLoaded(true);
      setIsAdReady(true);
    }
  };

  const showAd = async (): Promise<boolean> => {
    if (!isAdReady) {
      console.warn('Ad is not ready yet');
      return false;
    }

    try {
      setIsAdShowing(true);

      // 토스 앱 환경에서만 실제 광고 표시
      if (typeof window !== 'undefined' && (window as any).TossAppBridge) {
        try {
          const { GoogleAdMob } = await import('@apps-in-toss/web-bridge');

          // isSupported 확인
          if (!GoogleAdMob.showAppsInTossAdMob.isSupported()) {
            console.warn('GoogleAdMob showAd is not supported');
            setIsAdShowing(false);
            return true;
          }

          return new Promise((resolve) => {
            GoogleAdMob.showAppsInTossAdMob({
              options: {
                adUnitId: TEST_AD_ID,
              },
              onEvent: (event) => {
                console.log('Show ad event:', event);
                if (event.type === 'showed') {
                  console.log('Ad showed');
                } else if (event.type === 'dismissed') {
                  console.log('Ad dismissed');
                  setIsAdShowing(false);
                  setIsAdReady(false);
                  resolve(true);
                }
              },
              onError: (error) => {
                console.error('Ad failed to show:', error);
                setIsAdShowing(false);
                setIsAdReady(false);
                resolve(false);
              },
            });
          });
        } catch (error) {
          console.error('Failed to show Toss ad:', error);
          setIsAdShowing(false);
          return true; // 개발 환경에서는 성공으로 처리
        }
      } else {
        // 웹 환경에서는 시뮬레이션 (2초 대기)
        console.log('Dev mode: Showing ad (simulated - 2 seconds)');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Dev mode: Ad completed');
        setIsAdShowing(false);
        setIsAdReady(false);
        return true;
      }
    } catch (error) {
      console.error('Show ad error:', error);
      setIsAdShowing(false);
      return true; // 개발 환경에서는 성공으로 처리
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
