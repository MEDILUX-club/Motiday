import { useNavigate } from 'react-router-dom';
import profileImage from '../../assets/images/img_HomeFeedCard_profile.png';
import iconFire from '../../assets/icons/ic_fire.svg';

type Participant = {
  name: string;
  image?: string;
};

type RoutineMembersTabProps = {
  participants?: Participant[];
  totalParticipants?: number;
  recentUploads?: number;
  todayUploads?: number;
  yesterdayUploads?: number;
  onClickPosts?: () => void;
  isParticipating?: boolean; // 참여 중인 사람만 활동 게시물 버튼 표시
  routineId?: number; // 활동 게시물 페이지로 이동 시 전달
};

const defaultParticipants: Participant[] = [
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
  { name: 'Moti_Day' },
];

const RoutineMembersTab = ({
  participants = defaultParticipants,
  totalParticipants = 0,
  recentUploads = 0,
  todayUploads,
  yesterdayUploads,
  onClickPosts,
  isParticipating = false,
  routineId,
}: RoutineMembersTabProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white text-gray-800 shadow-sm overflow-hidden">
      <div className="p-5 space-y-4">
        <div className="text-lg font-bold text-gray-900">참여자</div>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-y-5">
          {participants.map((participant, idx) => (
            <div key={`${participant.name}-${idx}`} className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={participant.image || profileImage}
                  alt={participant.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xs font-semibold text-gray-700">{participant.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 px-5 py-6 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <img src={iconFire} alt="participants" className="h-4 w-4" />
          <span>현재 참여자: {totalParticipants}명</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <img src={iconFire} alt="recent uploads" className="h-4 w-4" />
          <span>최근 7일 인증 업로드 수: {recentUploads}건</span>
        </div>
        <div className="text-sm text-gray-700 leading-relaxed space-y-1">
          {todayUploads !== undefined && <div>“오늘 인증 {todayUploads}건”</div>}
          {yesterdayUploads !== undefined && <div>“어제 인증 {yesterdayUploads}건”</div>}
        </div>
      </div>

      {/* 참여 중인 사람만 활동 게시물 버튼 표시 */}
      {isParticipating && (
        <button
          type="button"
          onClick={onClickPosts ?? (() => navigate('/routine/chat', { state: { routineId } }))}
          className="w-full flex items-center justify-between px-5 py-4 text-base font-semibold text-gray-800 border border-gray-200 bg-white shadow-sm "
        >
          활동 게시물
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-500"
          >
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default RoutineMembersTab;
