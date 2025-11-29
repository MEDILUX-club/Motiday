// src/pages/home/HomePage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// [수정] MainLayout 하나만 불러오면 됩니다. (PageLayout, Header, BottomNav 제거)
import MainLayout from '../../components/layout/MainLayout';
import TopTabBar from '../../components/common/TopTabBar';
import type { TabType } from '../../components/common/TopTabBar';

// 이미지 import
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';

const HomePage = () => {
  // 현재 선택된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<TabType>('exercise');
  const navigate = useNavigate();

  return (
    <MainLayout
      // 1. 헤더 설정 (필수)
      header={{
        left: <img src={logo} alt="logo" className="h-8 w-8 object-contain" />,
        right: (
          <button onClick={() => navigate('/setting')}>
            <img src={iconSetting} alt="setting" className="h-6 w-6 object-contain" />
          </button>
        )
      }}
      
      // 2. 상단 탭바 설정 (선택 - 여기에 넣으면 헤더 바로 아래에 붙습니다)
      topTabBar={
        <TopTabBar 
          currentTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      }
    >
      {/* 3. 메인 컨텐츠 (children) */}
      {/* MainLayout이 이미 스크롤(overflow-y-auto)과 배경색을 가지고 있으므로, 
          여기서는 내부 패딩(p-4) 정도만 주면 됩니다. */}
      <div className="p-4 h-full">
        {activeTab === 'exercise' && <div>🏋️ 운동 피드 나오는 곳</div>}
        {activeTab === 'study' && <div>🧑‍💻 공부 피드 나오는 곳</div>}
        {activeTab === 'reading' && <div>📖 독서 피드 나오는 곳</div>}
      </div>

    </MainLayout>
  );
};

export default HomePage;
