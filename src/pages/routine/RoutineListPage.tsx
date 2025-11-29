import { useState } from 'react';
import type { TabType } from '../../components/common/TopTabBar';
import MainLayout from '../../components/layout/MainLayout';
import TopTabBar from '../../components/common/TopTabBar';
import RoutineFeedCard from '../../components/routine/RoutineFeedCard';
import routineProfile from '../../assets/images/img_HomeFeedCard_profile.png';
import routineThumbnail from '../../assets/images/img_HomeFeedCard.png';

const ClubListPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('exercise');
  const feeds = Array.from({ length: 4 }, (_, idx) => ({ id: idx }));

  return (
    <MainLayout
      header={{
        title: '루틴',
      }}
    
      topTabBar={
        <TopTabBar 
          currentTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      }
    >
      <div className="p-4 h-full space-y-6">
        {feeds.map((feed) => (
          <RoutineFeedCard
            key={feed.id}
            userName="김모티"
            userProfileImage={routineProfile}
            createdAt="16분 전"
            title="매주 3회 아침 운동 루틴"
            thumbnailImage={routineThumbnail}
            isHot={feed.id === 0}
            difficulty="Easy"
            frequency="주 3회 인증"
            startDate="25.12.12 ~"
            currentParticipants={12}
            maxParticipants={30}
          />
        ))}
      </div>

    </MainLayout>
  );
};

export default ClubListPage;
