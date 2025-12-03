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
import useGetRoutines from '../../hooks/queries/useGetRoutines';
import useGetRoutinesRecruiting from '../../hooks/queries/useGetRoutinesRecruiting';
import useGetRoutinesClosed from '../../hooks/queries/useGetRoutinesClosed';
import useGetUserRoutines from '../../hooks/queries/useGetUserRoutines';
import { useAuthStore } from '../../store/authStore';
import type { RoutineCategory } from '../../types/routine';

// 탭 타입을 API 카테고리로 변환
const TAB_TO_CATEGORY: Record<TabType, RoutineCategory> = {
  exercise: 'EXERCISE',
  study: 'STUDY',
  reading: 'READING',
};

// 난이도 변환 (API → UI)
const DIFFICULTY_DISPLAY: Record<string, 'Easy' | 'Normal' | 'Hard'> = {
  EASY: 'Easy',
  STANDARD: 'Normal',
  HARD: 'Hard',
};

const ClubListPage = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?.userId);
  const [activeTab, setActiveTab] = useState<TabType>('exercise');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const category = TAB_TO_CATEGORY[activeTab];

  // API 호출 - 필터별 루틴 조회
  const { data: allRoutines = [], isLoading: isLoadingAll } = useGetRoutines(category, {
    enabled: filter === 'all',
  });
  const { data: recruitingRoutines = [], isLoading: isLoadingRecruiting } = useGetRoutinesRecruiting(category, {
    enabled: filter === 'recruit',
  });
  const { data: closedRoutines = [], isLoading: isLoadingClosed } = useGetRoutinesClosed(category, {
    enabled: filter === 'closed',
  });
  const { data: userRoutines = [], isLoading: isLoadingUser } = useGetUserRoutines(userId ?? 0, {
    enabled: filter === 'ongoing' && Boolean(userId),
  });

  // 참여중 루틴은 카테고리로 프론트에서 필터링 (API에 category 파라미터 없음)
  const ongoingRoutines = userRoutines.filter((r) => r.category === category);

  // 현재 필터에 따른 데이터 선택
  const getRoutinesByFilter = () => {
    switch (filter) {
      case 'all': return allRoutines;
      case 'recruit': return recruitingRoutines;
      case 'closed': return closedRoutines;
      case 'ongoing': return ongoingRoutines;
      default: return [];
    }
  };
  const getLoadingByFilter = () => {
    switch (filter) {
      case 'all': return isLoadingAll;
      case 'recruit': return isLoadingRecruiting;
      case 'closed': return isLoadingClosed;
      case 'ongoing': return isLoadingUser;
      default: return false;
    }
  };
  const routines = getRoutinesByFilter();
  const isLoading = getLoadingByFilter();

  const contentImageMap: Record<TabType, string> = {
    exercise: homeFeedImage,
    study: homeFeedImageStudy,
    reading: homeFeedImageBook,
  };

  // 날짜 포맷 (YYYY-MM-DD → YY.MM.DD ~)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yy}.${mm}.${dd} ~`;
  };

  // 검색 필터링
  const filteredRoutines = routines.filter(({ title }) =>
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

        {isLoading ? (
          <div className="text-center text-gray-500 py-8">로딩 중...</div>
        ) : filteredRoutines.length === 0 ? (
          <div className="text-center text-gray-500 py-8">등록된 루틴이 없습니다.</div>
        ) : (
          filteredRoutines.map((routine, idx) => (
            <RoutineFeedCard
              key={routine.routineId}
              userName="김모티" // TODO: 작성자 정보 API에서 받아오기
              userProfileImage={routineProfile}
              createdAt={routine.createdAt ? new Date(routine.createdAt).toLocaleDateString() : ''}
              title={routine.title}
              thumbnailImage={contentImageMap[activeTab]}
              isHot={idx === 0}
              difficulty={DIFFICULTY_DISPLAY[routine.difficulty] || 'Easy'}
              frequency={`${routine.difficulty} 난이도`}
              startDate={formatDate(routine.startDate)}
              currentParticipants={routine.currentParticipants}
              maxParticipants={routine.maxParticipants}
            />
          ))
        )}
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
