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

type RoutineInfoTabProps = {
  details?: DetailItem[];
};

const RoutineInfoTab = ({ details = [] }: RoutineInfoTabProps) => {
  const rewardTable = [
    { period: '7일 (1주)', easy: '2', standard: '3', hard: '4' },
    { period: '14일 (2주)', easy: '4', standard: '6', hard: '8' },
    { period: '30일 (4주)', easy: '8', standard: '12', hard: '16' },
  ];

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-4 space-y-6 text-gray-800 text-sm">
      {/* 루틴 상세 (목적/효과/인증) */}
      {details.length > 0 && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-4 space-y-3">
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
      )}

      {/* 인증 예시 */}
      <div className="space-y-3">
        <div className="text-base font-bold">인증예시</div>
        <div className="text-sm text-gray-600">아래 인증방법에 유의해주세요!</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border-2 border-green-400 bg-green-50 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
              올바른 인증
              <span className="h-5 w-5 rounded-full border-2 border-green-500" />
            </div>
            <div className="text-xs text-gray-600">기상직후 시간 표시 포함</div>
          </div>
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
              잘못된 인증
              <span className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">×</span>
            </div>
            <div className="text-xs text-gray-600">기상과 무관한 사진, 시간 미표기</div>
          </div>
        </div>
      </div>

      {/* 보상 기준 */}
      <div className="space-y-3">
        <div className="text-base font-bold">보상기준</div>
        <div className="text-sm text-gray-800 space-y-1">
          <div><span className="font-bold">Easy:</span> 주 2회 인증, 충족시 +2MOTI/주</div>
          <div><span className="font-bold">Standard:</span> 주 3회 인증, 충족시 +3MOTI/주</div>
          <div><span className="font-bold">Hard:</span> 주 4회 인증, 충족시 +4MOTI/주</div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="grid grid-cols-4 bg-gray-50 text-sm font-semibold text-gray-700">
            <div className="px-3 py-2 text-left">루틴 기간</div>
            <div className="px-3 py-2 text-center text-orange-500">Easy</div>
            <div className="px-3 py-2 text-center text-orange-500">Standard</div>
            <div className="px-3 py-2 text-center text-orange-500">Hard</div>
          </div>
          <div className="divide-y divide-gray-200">
            {rewardTable.map((row) => (
              <div key={row.period} className="grid grid-cols-4 text-sm text-gray-700">
                <div className="px-3 py-2 text-left">{row.period}</div>
                <div className="px-3 py-2 text-center">{row.easy}</div>
                <div className="px-3 py-2 text-center">{row.standard}</div>
                <div className="px-3 py-2 text-center">{row.hard}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-red-600 font-semibold">
          2주 연속 기준을 충족하지 못할 경우, 해당 루틴은 1주 동안 재참여가 제한됩니다.
        </div>

        <div className="text-sm text-gray-700 leading-relaxed">
          각 루틴은 기간과 난이도에 따라 주 단위로 MOTI가 적립되며, 총 15 MOTI가 모이면 웰니스 제품을 직접 체험하며 건강한 루틴을 더 깊게 경험하실 수 있습니다.
        </div>
      </div>
    </div>
  );
};

export default RoutineInfoTab;
