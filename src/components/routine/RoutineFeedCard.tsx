// [1] 에셋 가져오기
import { useNavigate } from 'react-router-dom';
import imgHot from '../../assets/images/img_hot.png';
import imgClock from '../../assets/images/img_clock_gray.png';
import imgUser from '../../assets/images/img_user_gray.png';

type ChallengeCardProps = {
  // 루틴 ID
  routineId?: number;
  
  // 유저 정보
  userName: string;
  userProfileImage?: string;
  createdAt: string; // 예: "16분전"
  
  // 챌린지 정보
  title: string;
  thumbnailImage: string;
  isHot?: boolean;
  difficulty: 'Easy' | 'Normal' | 'Hard'; // 난이도에 따라 색상 변경 가능
  frequency: string; // 예: "주 3회"
  startDate: string; // 예: "25.12.12 ~"
  currentParticipants: number;
  maxParticipants: number;
  
  // 클릭 이벤트
  onClickDetail?: () => void;
};

const RoutineFeedCard = ({
  routineId,
  userName,
  userProfileImage,
  createdAt,
  title,
  thumbnailImage,
  isHot = false,
  difficulty,
  frequency,
  startDate,
  currentParticipants,
  maxParticipants,
  onClickDetail,
}: ChallengeCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white px-5 py-6 mb-2 rounded-xl">
      
      {/* 1. 상단 헤더 (유저정보 & Hot 태그) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* 프로필 이미지 */}
          <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-200">
            <img 
              src={userProfileImage || "https://via.placeholder.com/40"} 
              alt={userName} 
              className="h-full w-full object-cover"
            />
          </div>
          {/* 이름 & 시간 */}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">
              {userName}
            </span>
            <span className="text-xs text-gray-400 mt-0.5">
              {createdAt}
            </span>
          </div>
        </div>

        {/* Hot 태그 이미지 (isHot일 때만 표시) */}
        {isHot && (
          <img src={imgHot} alt="hot" className="h-6 object-contain" />
        )}
      </div>

      {/* 2. 챌린지 제목 */}
      <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug">
        {title}
      </h3>

      {/* 3. 챌린지 정보 박스 (테두리 있는 영역) */}
      <div className="flex items-center border border-gray-200 rounded-2xl p-3 bg-white gap-4">

        {/* 썸네일: 제목과 동일한 좌측 패딩에 맞춰 왼쪽 정렬 */}
        <div className="basis-2/5 min-w-[120px] max-w-[170px] h-24 overflow-hidden rounded-xl bg-gray-100">
          <img 
            src={thumbnailImage} 
            alt="challenge" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* 상세 정보 */}
        <div className="flex flex-col justify-center gap-1.5 w-full">
          
          {/* 난이도 뱃지 & 인증 횟수 */}
          <div className="flex items-center gap-2 mb-0.5">
            <span className="bg-primary-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {difficulty}
            </span>
            <span className="text-xs text-gray-600 font-medium">
              {frequency}
            </span>
          </div>

          {/* 기간 (시계 아이콘) */}
          <div className="flex items-center gap-1.5">
            <img src={imgClock} alt="time" className="w-3.5 h-3.5" />
            <span className="text-xs text-gray-500">{startDate}</span>
          </div>

          {/* 참여 인원 (사람 아이콘) */}
          <div className="flex items-center gap-1.5">
            <img src={imgUser} alt="user" className="w-3.5 h-3.5" />
            <span className="text-xs text-gray-500">
              참여인원 <span className="font-semibold text-gray-700">{currentParticipants}</span> / {maxParticipants}
            </span>
          </div>

        </div>
      </div>

      {/* 4. 하단 자세히보기 링크 */}
      <div className="flex justify-end mt-3">
        <button 
          onClick={onClickDetail ?? (() => navigate(`/routine/detail/${routineId}`))}
          className="flex items-center text-xs text-gray-500 hover:text-gray-600 transition-colors"
        >
          자세히보기
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default RoutineFeedCard;
