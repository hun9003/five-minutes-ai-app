import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  userKey: number;
  name?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 토스 앱 환경 체크 및 자동 로그인 시도
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // 로컬 스토리지에서 사용자 정보 확인
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);

      // 토스 앱 환경에서는 실제 토스 로그인 SDK 사용
      if (typeof window !== 'undefined' && (window as any).TossAppBridge) {
        try {
          // TODO: 실제 토스 appLogin API 연동 필요
          // const { partner } = await import('@apps-in-toss/web-bridge');
          // const { authorizationCode, referrer } = await partner.appLogin();

          // 현재는 데모 모드로 폴백
          console.log('Toss app detected, but using demo mode for now');
          await loginAsDemo();
        } catch (bridgeError) {
          console.error('Toss login failed:', bridgeError);
          // 폴백: 데모 사용자로 로그인
          await loginAsDemo();
        }
      } else {
        // 웹 환경에서는 데모 사용자로 로그인
        await loginAsDemo();
      }
    } catch (error) {
      console.error('Login failed:', error);
      // 에러 시에도 데모 사용자로 폴백
      await loginAsDemo();
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = async () => {
    // 데모 사용자 생성 (개발/테스트용)
    const demoUser: User = {
      userKey: Date.now(),
      name: '김토스',
    };
    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
