import Button from '../common/Button';
import mainDefaultImage from '../../assets/images/img_HomeFeedCard.png';

type RoutineDetailFeedProps = {
  mainImage?: string;
  tags?: string[];
  userName: string;
  title: string;
  difficulty: 'Easy' | 'Standard' | 'Hard';
  frequency: string;
  reward: string;
  participants: string;
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
    </div>
  );
};

export default RoutineDetailFeed;
