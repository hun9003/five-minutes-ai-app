import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CourseList } from './pages/CourseList';
import { CourseDetail } from './pages/CourseDetail';
import { ChallengeList } from './pages/ChallengeList';
import { ChallengeDetail } from './pages/ChallengeDetail';
import { MyPage } from './pages/MyPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/challenge" element={<ChallengeList />} />
          <Route path="/challenge/:day" element={<ChallengeDetail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;