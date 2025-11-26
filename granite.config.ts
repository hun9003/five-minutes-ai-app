import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'ai5min-free-class', // 토스 앱인토스 콘솔에서 설정한 앱 이름
  brand: {
    displayName: '5분 AI', // 화면에 노출될 앱의 한글 이름
    primaryColor: '#3B82F6', // 앱의 기본 색상 (blue-500)
    icon: '', // 아이콘 이미지 주소 (추후 업데이트)
    bridgeColorMode: 'basic', // 흰 배경
  },
  web: {
    host: 'localhost', // 앱 내 웹뷰에 사용될 host
    port: 3000, // vite.config.ts와 동일한 포트
    commands: {
      dev: 'vite --host', // 개발 모드 실행
      build: 'vite build', // 빌드 명령어
    },
  },
  permissions: [],
  outdir: 'dist', // 빌드 결과물 디렉토리
});
