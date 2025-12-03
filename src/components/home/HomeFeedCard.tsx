import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 아이콘 이미지들 import
import icdots from '../../assets/icons/ic_dots.svg';
import icBookmark from '../../assets/icons/ic_bookmark.svg';
import icHeart from '../../assets/icons/ic_heart.svg';            
import imgHeart from '../../assets/images/img_heart_red.png'; 
import icChat from '../../assets/icons/ic_chat.svg';
import defaultProfile from '../../assets/images/img_HomeFeedCard_profile.png';

type FeedCardProps = {
  userId?: number; // 프로필 페이지 이동용
  userName: string;
  userBio: string;
  userProfileImage?: string;
  contentImage: string;
  caption?: string;
  likeCount: number;
  commentCount: number;
  isLikedByMe?: boolean;
  createdAt?: string;
};

const HomeFeedCard = ({
  userId,
  userName,
  userBio,
  userProfileImage,
  contentImage,
  caption,
  likeCount,
  commentCount,
  isLikedByMe = false,
}: FeedCardProps) => {
  const navigate = useNavigate();
  // 좋아요 상태 관리 (서버에서 받은 isLikedByMe로 초기화)
  const [isLiked, setIsLiked] = useState(isLikedByMe);

  // 좋아요 토글 함수
  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="w-full bg-white pb-6 border-b border-gray-100 last:border-none">
      
      {/* 1. 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          className="flex items-center gap-3"
          onClick={() => userId && navigate(`/profile/${userId}`)}
        >
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
            <img
              src={userProfileImage || defaultProfile}
              alt={userName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-gray-800">{userName}</span>
            <span className="text-xs text-gray-500">{userBio}</span>
          </div>
        </button>
        <button>
          <img src={icdots} alt="more" className="w-6 h-6" />
        </button>
      </div>

      {/* 2. 메인 이미지 & 북마크 */}
      <div className="relative w-full px-4">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={contentImage}
            alt="feed content"
            className="h-full w-full object-cover"
          />
          <div className="absolute right-3 top-3">
            <button className="p-1">
              <img src={icBookmark} alt="bookmark" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. 캡션 (있는 경우) */}
      {caption && (
        <div className="mt-3 px-4">
          <p className="text-sm text-gray-800 line-clamp-2">{caption}</p>
        </div>
      )}

      {/* 4. 하단 액션 */}
      <div className="mt-3 flex items-center gap-4 px-4">
        
        {/* [수정됨] 좋아요 버튼: 클릭 시 토글 기능 추가 */}
        <button 
          onClick={handleToggleLike} 
          className="flex items-center gap-1.5 transition-transform active:scale-95" // 클릭시 살짝 눌리는 효과 추가
        >
          {/* isLiked 상태에 따라 이미지를 다르게 보여줌 */}
          <img 
            src={isLiked ? imgHeart : icHeart} 
            alt="like" 
            className="w-6 h-6" 
          />
          
          {/* 숫자가 빨간색으로 변하거나, 숫자가 1 늘어나는 시각적 효과도 줄 수 있음 */}
          <span className={`text-sm font-medium ${isLiked ? 'text-red-500' : 'text-gray-700'}`}>
            {/* 좋아요 누르면 +1 된 것처럼 보이게 처리 */}
            {isLiked ? likeCount + 1 : likeCount}
          </span>
        </button>

        {/* 댓글 버튼 */}
        <button className="flex items-center gap-1.5">
          <img src={icChat} alt="comment" className="w-6 h-6" />
          <span className="text-sm font-medium text-gray-700">
            {commentCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomeFeedCard;
