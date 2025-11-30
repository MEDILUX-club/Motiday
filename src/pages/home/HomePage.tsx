// src/pages/home/HomePage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// [수정] MainLayout 하나만 불러오면 됩니다. (PageLayout, Header, BottomNav 제거)
import MainLayout from '../../components/layout/MainLayout';
import TopTabBar from '../../components/common/TopTabBar';
import type { TabType } from '../../components/common/TopTabBar';
import HomeFeedCard from '../../components/home/HomeFeedCard';

// 이미지 import
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';
import homeFeedProfile from '../../assets/images/img_HomeFeedCard_profile.png';
import homeFeedImage from '../../assets/images/img_HomeFeedCard.png';

const HomePage = () => {
  // 현재 선택된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<TabType>('exercise');
  const navigate = useNavigate();

  const feeds = Array.from({ length: 4 }, (_, idx) => ({ id: idx }));

  return (
    <MainLayout
      // 1. 헤더 설정 (필수)
      header={{
        left: (
          <button onClick={() => navigate('/home')}>
            <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
          </button>
        ),
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
      <div className="p-4 h-full space-y-6">
        {feeds.map((feed) => (
          <HomeFeedCard
            key={feed.id}
            userName="김모티"
            userBio="운동 루틴 챌린저"
            userProfileImage={homeFeedProfile}
            contentImage={homeFeedImage}
            likeCount={12}
            commentCount={3}
          />
        ))}
      </div>

    </MainLayout>
  );
};

export default HomePage;
