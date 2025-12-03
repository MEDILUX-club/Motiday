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
  const [searchQuery, setSearchQuery] = useState('');
  const contentImageMap: Record<TabType, string> = {
    exercise: homeFeedImage,
    study: homeFeedImageStudy,
    reading: homeFeedImageBook,
  };
  const feedsByTab: Record<
    TabType,
    Array<{
      id: string;
      title: string;
      difficulty: 'Easy' | 'Normal' | 'Hard';
      frequency: string;
      startDate: string;
      currentParticipants: number;
      maxParticipants: number;
    }>
  > = {
    exercise: [
      {
        id: 'ex1',
        title: '매주 3회 운동 루틴',
        difficulty: 'Easy',
        frequency: '주 3회 인증',
        startDate: '25.12.12 ~',
        currentParticipants: 12,
        maxParticipants: 30,
      },
      {
        id: 'ex2',
        title: '아침 러닝 5km 루틴',
        difficulty: 'Normal',
        frequency: '주 4회 인증',
        startDate: '25.12.15 ~',
        currentParticipants: 8,
        maxParticipants: 20,
      },
    ],
    study: [
      {
        id: 'st1',
        title: '매주 3회 독서 루틴',
        difficulty: 'Easy',
        frequency: '주 3회 인증',
        startDate: '25.12.12 ~',
        currentParticipants: 10,
        maxParticipants: 25,
      },
      {
        id: 'st2',
        title: '야간 공부 루틴',
        difficulty: 'Hard',
        frequency: '주 5회 인증',
        startDate: '25.12.20 ~',
        currentParticipants: 5,
        maxParticipants: 15,
      },
    ],
    reading: [
      {
        id: 'rd1',
        title: '매주 3회 독서 루틴',
        difficulty: 'Easy',
        frequency: '주 3회 인증',
        startDate: '25.12.12 ~',
        currentParticipants: 9,
        maxParticipants: 18,
      },
      {
        id: 'rd2',
        title: '소설 20분 독서 인증',
        difficulty: 'Normal',
        frequency: '주 4회 인증',
        startDate: '25.12.18 ~',
        currentParticipants: 7,
        maxParticipants: 20,
      },
    ],
  };
  const filteredFeeds = feedsByTab[activeTab].filter(({ title }) =>
    title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredFeeds.map((feed, idx) => (
          <RoutineFeedCard
            key={feed.id}
            userName="김모티"
            userProfileImage={routineProfile}
            createdAt="16분 전"
            title={feed.title}
            thumbnailImage={contentImageMap[activeTab]}
            isHot={idx === 0}
            difficulty={feed.difficulty}
            frequency={feed.frequency}
            startDate={feed.startDate}
            currentParticipants={feed.currentParticipants}
            maxParticipants={feed.maxParticipants}
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
