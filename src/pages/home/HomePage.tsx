import { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import Header from '../../components/common/Header';
import TopTabBar from '../../components/common/TopTabBar';
import type { TabType } from '../../components/common/TopTabBar';
import BottomNavigationBar from '../../components/common/BottomNavigationBar';

// 이미지 import
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';

const HomePage = () => {
  // 현재 선택된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<TabType>('exercise');

  return (
    <PageLayout>
      {/* 1. 헤더 조립 */}
      <Header 
        // 왼쪽: 로고
        left={<img src={logo} alt="logo" className="h-8 w-8 object-contain" />}
        
        // 오른쪽: 설정 아이콘
        right={<img src={iconSetting} alt="setting" className="h-6 w-6 object-contain" />}
      />

      {/* 2. 상단 탭바 조립 */}
      <TopTabBar 
        currentTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* 3. 메인 컨텐츠 (탭에 따라 내용 바뀜) */}
      <div className="flex-1 bg-white p-4 overflow-y-auto">
        {activeTab === 'exercise' && <div>운동 피드 나오는 곳</div>}
        {activeTab === 'study' && <div>공부 피드 나오는 곳</div>}
        {activeTab === 'reading' && <div>독서 피드 나오는 곳</div>}
      </div>

      {/* 하단 내비게이션 바 추가 */}
      <BottomNavigationBar />
    </PageLayout>
  );
};

export default HomePage;