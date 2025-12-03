// src/pages/home/HomePage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// [수정] MainLayout 하나만 불러오면 됩니다. (PageLayout, Header, BottomNav 제거)
import MainLayout from '../../components/layout/MainLayout';
import TopTabBar from '../../components/common/TopTabBar';
import type { TabType } from '../../components/common/TopTabBar';
import HomeFeedCard from '../../components/home/HomeFeedCard';
import { useGetFeeds } from '../../hooks/queries/useGetFeeds';
import { useFeedStore } from '../../store/feedStore';

// 이미지 import
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';
import defaultProfile from '../../assets/images/img_HomeFeedCard_profile.png';
import homeFeedImage from '../../assets/images/img_HomeFeedCard.png';
import homeFeedImageStudy from '../../assets/images/img_HomeFeedCard_study.png';
import homeFeedImageBook from '../../assets/images/img_HomeFeedCard_book.png';

const HomePage = () => {
  // 현재 선택된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<TabType>('exercise');
  const navigate = useNavigate();

  // 피드 목록 조회
  const { data: feeds = [], isLoading } = useGetFeeds();
  
  // 로컬 피드 이미지 (이미지 업로드 API 연동 전까지 사용)
  const localFeedImages = useFeedStore((state) => state.localFeedImages);

  // 탭에 따른 기본 이미지 (이미지 업로드 API 연동 전 fallback용)
  const contentImageMap: Record<TabType, string> = {
    exercise: homeFeedImage,
    study: homeFeedImageStudy,
    reading: homeFeedImageBook,
  };

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
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <span className="text-gray-500">피드를 불러오는 중...</span>
          </div>
        ) : feeds.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <span className="text-gray-500">등록된 피드가 없습니다.</span>
          </div>
        ) : (
          feeds.map((feed) => (
            <HomeFeedCard
              key={feed.feedId}
              feedId={feed.feedId}
              userName={feed.userNickname}
              userBio={feed.routineTitle}
              userProfileImage={feed.userProfileImage || defaultProfile}
              contentImage={localFeedImages[feed.feedId] || feed.imageUrl || contentImageMap[activeTab]}
              caption={feed.caption}
              likeCount={feed.likeCount}
              commentCount={feed.commentCount}
              isLikedByMe={feed.isLikedByMe}
              createdAt={feed.createdAt}
            />
          ))
        )}
      </div>

    </MainLayout>
  );
};

export default HomePage;
