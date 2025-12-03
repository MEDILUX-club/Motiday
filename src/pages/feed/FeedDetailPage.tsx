import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SubLayout from '../../components/layout/SubLayout';
import { useFeedStore } from '../../store/feedStore';
import { useAuthStore } from '../../store/authStore';
import { useGetFeeds } from '../../hooks/queries/useGetFeeds';

// 아이콘
import iconBack from '../../assets/icons/ic_back.svg';
import icBookmark from '../../assets/icons/ic_bookmark.svg';
import icHeart from '../../assets/icons/ic_heart.svg';
import imgHeart from '../../assets/images/img_heart_red.png';
import icChat from '../../assets/icons/ic_chat.svg';
import defaultProfile from '../../assets/images/img_HomeFeedCard_profile.png';
import defaultFeedImage from '../../assets/images/img_HomeFeedCard.png';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const { feedId } = useParams<{ feedId: string }>();
  const feedIdNum = Number(feedId);
  
  // 로컬 피드 이미지
  const localFeedImages = useFeedStore((state) => state.localFeedImages);
  const localProfileImage = useAuthStore((state) => state.localProfileImage);
  
  // 피드 목록에서 해당 피드 찾기
  const { data: feeds = [] } = useGetFeeds();
  const feed = feeds.find((f) => f.feedId === feedIdNum);
  
  // 좋아요 상태
  const [isLiked, setIsLiked] = useState(feed?.isLikedByMe ?? false);
  
  // 피드 이미지 (로컬 > 서버 > 기본)
  const feedImage = localFeedImages[feedIdNum] || feed?.imageUrl || defaultFeedImage;
  
  // 날짜 포맷
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (!feed) {
    return (
      <SubLayout
        header={{
          title: '피드',
          left: (
            <button onClick={() => navigate(-1)} className="p-2">
              <img src={iconBack} alt="뒤로가기" className="h-6 w-6 object-contain" />
            </button>
          ),
        }}
      >
        <div className="flex items-center justify-center h-64">
          <span className="text-gray-500">피드를 찾을 수 없습니다.</span>
        </div>
      </SubLayout>
    );
  }

  return (
    <SubLayout
      header={{
        title: '피드',
        left: (
          <button onClick={() => navigate(-1)} className="p-2">
            <img src={iconBack} alt="뒤로가기" className="h-6 w-6 object-contain" />
          </button>
        ),
      }}
    >
      <div className="flex flex-col">
        {/* 이미지 영역 */}
        <div className="relative w-full">
          <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
            <img
              src={feedImage}
              alt="피드 이미지"
              className="h-full w-full object-cover"
            />
            <button className="absolute right-4 top-4 p-2 bg-white/80 rounded-full shadow-sm">
              <img src={icBookmark} alt="북마크" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="p-4 space-y-4">
          {/* 사용자 정보 */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
              <img
                src={feed.userProfileImage || localProfileImage || defaultProfile}
                alt={feed.userNickname}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-base font-bold text-gray-900">{feed.userNickname}</div>
              <div className="text-sm text-gray-500">{formatDate(feed.createdAt)}</div>
            </div>
          </div>

          {/* 루틴 태그 */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
              {feed.routineTitle || '루틴'}
            </span>
          </div>

          {/* 캡션 */}
          {feed.caption && (
            <div className="py-3 border-t border-gray-100">
              <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                {feed.caption}
              </p>
            </div>
          )}

          {/* 좋아요 & 댓글 */}
          <div className="flex items-center gap-6 py-3 border-t border-gray-100">
            <button
              onClick={() => setIsLiked((prev) => !prev)}
              className="flex items-center gap-2 transition-transform active:scale-95"
            >
              <img
                src={isLiked ? imgHeart : icHeart}
                alt="좋아요"
                className="w-7 h-7"
              />
              <span className={`text-base font-medium ${isLiked ? 'text-red-500' : 'text-gray-700'}`}>
                {isLiked ? (feed.likeCount ?? 0) + 1 : feed.likeCount ?? 0}
              </span>
            </button>

            <button className="flex items-center gap-2">
              <img src={icChat} alt="댓글" className="w-7 h-7" />
              <span className="text-base font-medium text-gray-700">
                {feed.commentCount ?? 0}
              </span>
            </button>
          </div>

          {/* 댓글 영역 (임시) */}
          <div className="py-4 border-t border-gray-100">
            <div className="text-sm font-semibold text-gray-800 mb-3">댓글</div>
            <div className="flex items-center justify-center h-20 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-400">아직 댓글이 없습니다</span>
            </div>
          </div>
        </div>
      </div>
    </SubLayout>
  );
};

export default FeedDetailPage;

