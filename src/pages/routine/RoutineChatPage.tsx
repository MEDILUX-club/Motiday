import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button';
import RoutineChatBubble from '../../components/routine/RoutineChatBubble';
import iconBack from '../../assets/icons/ic_back.svg';
import defaultProfile from '../../assets/images/img_HomeFeedCard_profile.png';
import { useGetRoutineFeeds } from '../../hooks/queries/useGetRoutineFeeds';
import { useFeedStore } from '../../store/feedStore';

const RoutineChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // RoutineDetailPage에서 전달받은 routineId
  const routineId = location.state?.routineId as number | undefined;
  
  // 루틴별 피드 조회 (isSharedToRoutine: true인 피드들)
  const { data: feeds = [], isLoading } = useGetRoutineFeeds(routineId ?? 0, {
    enabled: Boolean(routineId),
  });
  
  // 로컬 피드 이미지 (이미지 업로드 API 연동 전까지 사용)
  const localFeedImages = useFeedStore((state) => state.localFeedImages);

  // 시간 포맷 (HH:MM)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <MainLayout
      header={{
        title: '활동 게시물',
        left: (
          <button onClick={() => navigate(-1)} className="p-2">
            <img src={iconBack} alt="뒤로가기" className="h-6 w-6 object-contain" />
          </button>
        ),
      }}
    >
      <div className="p-4 pb-32">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm min-h-[calc(100vh-250px)] p-4 mb-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <span className="text-gray-500">게시물을 불러오는 중...</span>
            </div>
          ) : feeds.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <span className="text-gray-500">등록된 활동 게시물이 없습니다.</span>
            </div>
          ) : (
            feeds.map((feed) => (
              <RoutineChatBubble
                key={feed.feedId}
                userProfile={feed.userProfileImage || defaultProfile}
                userName={feed.userNickname}
                contentImage={localFeedImages[feed.feedId] || (feed.imageUrl !== 'pending_upload' ? feed.imageUrl : undefined)}
                contentText={feed.caption}
                timestamp={formatTime(feed.createdAt)}
              />
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-[110px] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-40">
        <Button onClick={() => navigate('/routine/camera', { state: { routineId } })}>클럽 게시물 작성</Button>
      </div>
    </MainLayout>
  );
};

export default RoutineChatPage;
