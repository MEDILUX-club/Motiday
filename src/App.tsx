import { Routes, Route } from 'react-router-dom';
// 페이지들 import
import SplashPage from './pages/auth/SplashPage';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/home/HomePage';
import ClubListPage from './pages/routine/ClubListPage';
import ClubDetailPage from './pages/routine/ClubDetailPage';
import ClubRegisterPage from './pages/routine/ClubRegisterPage';
import ProfilePage from './pages/profile/Profilepage';
import ProfileEditPage from './pages/profile/ProfileEditPage';
import FollowPage from './pages/profile/FollowPage';
import SettingsPage from './pages/profile/SettingPage';

const App = () => {
  return (
    <Routes>
      {/* 1. 스플래시 화면  */}
      <Route path="/" element={<SplashPage />} />

      {/* 2. 로그인 화면 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 3. 홈 화면  */}
      <Route path="/home" element={<HomePage />} />

      {/* 4. 동아리 목록 */}
      <Route path="/clubs/list" element={<ClubListPage />} />

      {/* 5. 동아리 상세 */}
      <Route path="/clubs/detail" element={<ClubDetailPage />} />

      {/* 6. 동아리 등록 */}
      <Route path="/clubs/register" element={<ClubRegisterPage />} />

      {/* 7. 프로필 */}
      <Route path="/profile" element={<ProfilePage />} /> 

      {/* 8. 프로필 수정 */}
      <Route path="/profile/edit" element={<ProfileEditPage />} />

      {/* 9. 팔로워/팔로잉 */}
      <Route path="/profile/follow" element={<FollowPage />} />

      {/* 10. 설정 */
      <Route path="/setting" element={<SettingsPage />} />
      }
    </Routes>
  );
};

export default App;
