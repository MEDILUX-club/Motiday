import Button from '../common/Button';
import mainDefaultImage from '../../assets/images/img_HomeFeedCard.png';
import iconRoutineYellow from '../../assets/icons/ic_routine_yellow.svg';
import iconSunYellow from '../../assets/icons/ic_sun_yellow.svg';
import iconClockYellow from '../../assets/icons/ic_clock_yellow.svg';
import iconCameraYellow from '../../assets/icons/ic_camera_yellow.svg';

type DetailIconKey = 'routine' | 'sun' | 'clock' | 'camera';

const iconMap: Record<DetailIconKey, string> = {
  routine: iconRoutineYellow,
  sun: iconSunYellow,
  clock: iconClockYellow,
  camera: iconCameraYellow,
};

type DetailItem = {
  icon: DetailIconKey;
  title: string;
  description: string;
};

type RoutineDetailFeedProps = {
  mainImage?: string;
  tags?: string[];
  userName: string;
  title: string;
  difficulty: 'Easy' | 'Standard' | 'Hard';
  frequency: string;
  reward: string;
  participants: string;
  details: DetailItem[];
  onAction?: () => void;
  actionLabel?: string;
};

const RoutineDetailFeed = ({
  mainImage = mainDefaultImage,
  tags = [],
  userName,
  title,
  difficulty,
  frequency,
  reward,
  participants,
  details,
  onAction,
  actionLabel = '참여하기',
}: RoutineDetailFeedProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* 상단 이미지 */}
      <div className="relative">
        <img src={mainImage} alt="routine" className="w-full h-64 object-cover" />
        {tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="p-4 space-y-4 bg-linear-to-b from-white to-orange-50">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="h-3 w-3 rounded-full bg-orange-300 inline-block" />
          <span className="font-semibold">{userName}</span>
          <span className="text-gray-400">›</span>
        </div>

        <div className="space-y-1">
          <div className="text-lg font-bold text-gray-900">{title}</div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold text-xs">
              {difficulty}
            </span>
            <span>{frequency}</span>
          </div>
          <div className="text-sm text-gray-700">P {reward}</div>
          <div className="text-sm text-gray-700">현재 참여인원 {participants}</div>
        </div>

        <Button onClick={onAction}>{actionLabel}</Button>
      </div>

      {/* 상세 항목 */}
      <div className="m-4 rounded-2xl border border-orange-200 bg-orange-50/70 p-4 space-y-3">
        {details.map((item, idx) => (
          <div key={`${item.title}-${idx}`} className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-orange-100">
              <img src={iconMap[item.icon]} alt={item.title} className="h-5 w-5 object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-bold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-700 leading-snug">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineDetailFeed;
