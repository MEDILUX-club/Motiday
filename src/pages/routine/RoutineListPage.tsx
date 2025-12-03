import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { TabType } from '../../components/common/TopTabBar';
import MainLayout from '../../components/layout/MainLayout';
import TopTabBar from '../../components/common/TopTabBar';
import RoutineFeedCard from '../../components/routine/RoutineFeedCard';
import FilterTab from '../../components/common/FilterTab';
import InputField from '../../components/common/InputField';
import routineProfile from '../../assets/images/img_HomeFeedCard_profile.png';
import homeFeedImage from '../../assets/images/img_HomeFeedCard.png';
import homeFeedImageStudy from '../../assets/images/img_HomeFeedCard_study.png';
import homeFeedImageBook from '../../assets/images/img_HomeFeedCard_book.png';

const ClubListPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('exercise');
  const [filter, setFilter] = useState('all');
  const feeds = Array.from({ length: 4 }, (_, idx) => ({ id: idx }));
  const contentImageMap: Record<TabType, string> = {
    exercise: homeFeedImage,
    study: homeFeedImageStudy,
    reading: homeFeedImageBook,
  };
  const titleMap: Record<TabType, string> = {
    exercise: '매주 3회 운동 루틴',
    study: '매주 3회 공부 루틴',
    reading: '매주 3회 독서 루틴',
  };

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
      <div className="p-4 h-full space-y-6 pb-28">
        <FilterTab
          tabs={[
            { label: '전체', value: 'all' },
            { label: '모집중', value: 'recruit' },
            { label: '참여중', value: 'ongoing' },
            { label: '마감', value: 'closed' },
          ]}
          active={filter}
          onChange={setFilter}
        />

        <InputField
          placeholder="모집글 찾기"
          variant="white"
          showSearchIcon
        />

        {feeds.map((feed) => (
          <RoutineFeedCard
            key={feed.id}
            userName="김모티"
            userProfileImage={routineProfile}
            createdAt="16분 전"
            title={titleMap[activeTab]}
            thumbnailImage={contentImageMap[activeTab]}
            isHot={feed.id === 0}
            difficulty="Easy"
            frequency="주 3회 인증"
            startDate="25.12.12 ~"
            currentParticipants={12}
            maxParticipants={30}
          />
        ))}
      </div>
      <div className="fixed bottom-[110px] right-5 z-50">
        <button
          className="flex items-center gap-2 rounded-xl bg-gray-700 text-white px-4 py-2 shadow-lg"
          onClick={() => navigate('/routine/register')}
        >
          <span className="text-primary-800 font-bold">+</span>
          <span className="text-white">글쓰기</span>
        </button>
      </div>
    </MainLayout>
  );
};

export default ClubListPage;
