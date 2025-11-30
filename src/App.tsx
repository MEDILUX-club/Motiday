import { Routes, Route } from 'react-router-dom';
// 페이지들 import
import SplashPage from './pages/auth/SplashPage';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/home/HomePage';
import RoutineListPage from './pages/routine/RoutineListPage';
import RoutineDetailPage from './pages/routine/RoutineDetailPage';
import RoutineRegisterPage from './pages/routine/RoutineRegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import ProfileEditPage from './pages/profile/ProfileEditPage';
import FollowPage from './pages/profile/FollowPage';
import SettingsPage from './pages/profile/SettingPage';
import CameraPage from './pages/routine/CameraPage';
import RoutineAuthPage from './pages/routine/RoutineAuthPage';
import RoutineChatPage from './pages/routine/RoutineChatPage';
import StorePage from './pages/store/StorePage';
import StoreLoadingPage from './pages/store/StoreLoadingPage';

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
      <Route path="/routine/list" element={<RoutineListPage />} />

      {/* 5. 동아리 상세 */}
      <Route path="/routine/detail" element={<RoutineDetailPage />} />

      {/* 6. 동아리 등록 */}
      <Route path="/routine/register" element={<RoutineRegisterPage />} />

      {/* 7. 프로필 */}
      <Route path="/profile" element={<ProfilePage />} /> 

      {/* 8. 프로필 수정 */}
      <Route path="/profile/edit" element={<ProfileEditPage />} />

      {/* 9. 팔로워/팔로잉 */}
      <Route path="/profile/follow" element={<FollowPage />} />

      {/* 10. 설정 */}
      <Route path="/setting" element={<SettingsPage />} />

      {/* 11. 카메라 촬영 페이지 */}
      <Route path="/routine/camera" element={<CameraPage />} />

      {/* 12. 인증 등록 페이지 (사진을 받아서 보여주는 곳) */}
      <Route path="/routine/auth" element={<RoutineAuthPage />} />

      {/* 13. 동아리 채팅 페이지 */}
      <Route path="/routine/chat" element={<RoutineChatPage />} />

      {/* 14. 스토어 페이지 */}
      <Route path="/store" element={<StorePage />} /> 

      {/* 15. 스토어 로딩 페이지 */}
      <Route path="/store/loading" element={<StoreLoadingPage />} />
    </Routes>
  );
};

export default App;
