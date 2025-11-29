import { useState } from 'react';
import type { TabType } from '../../components/common/TopTabBar';
import MainLayout from '../../components/layout/MainLayout';
import TopTabBar from '../../components/common/TopTabBar';

const ClubListPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('exercise');

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

export default ClubListPage;
