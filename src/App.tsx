import { Routes, Route } from 'react-router-dom';
// 페이지들 import
import SplashPage from './pages/auth/SplashPage';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/home/HomePage';

const App = () => {
  return (
    <Routes>
      {/* 1. 스플래시 화면  */}
      <Route path="/" element={<SplashPage />} />

      {/* 2. 로그인 화면 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 3. 홈 화면  */}
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default App;