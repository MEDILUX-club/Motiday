import { useState } from 'react';
import SubLayout from '../../components/layout/SubLayout';
import InputField from '../../components/common/InputField';
import mainPlaceholder from '../../assets/images/img_plus_box.png';

const RoutineRegisterPage = () => {
  const [category, setCategory] = useState<'exercise' | 'study' | 'reading'>('exercise');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const leadingEmpty = startOfMonth.getDay();
  const calendarCells = [
    ...Array(leadingEmpty).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <SubLayout
      header={{ title: '루틴' }}
      footer={{
        type: 'double-button',
        onCancel: () => {},
        onOk: () => {},
        cancelText: '취소',
        okText: '등록',
      }}
    >
      <div className="space-y-4 bg-gray-50 rounded-2xl p-4">
        {/* 프로필/분류 영역 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-400" />
            <div className="text-base font-semibold text-gray-900">김모티</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*분류</div>
            <div className="flex gap-2">
              {[
                { label: '운동', value: 'exercise' },
                { label: '공부', value: 'study' },
                { label: '독서', value: 'reading' },
              ].map(({ label, value }) => {
                const active = category === value;
                return (
                  <button
                    key={value}
                    onClick={() => setCategory(value as typeof category)}
                    className={`flex-1 h-10 rounded-lg border text-sm font-semibold transition-colors ${
                      active
                        ? 'border-primary-800 text-primary-800 bg-primary-50'
                        : 'border-gray-300 text-gray-600 bg-white'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 메인 사진 영역 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
          <div className="text-sm font-semibold text-gray-800">*메인 사진</div>
            <div className="h-48 w-full max-w-[150px] rounded-2xl bg-gray-400 flex items-center justify-center">
              <img src={mainPlaceholder} alt="메인 사진 추가" className="h-8 w-8 object-contain" />
            </div>
          
        </div>

        {/* 입력 필드 영역 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*제목</div>
            <InputField
              variant="gray"
              placeholder="예시) 일주일에 3번씩 운동 인증할사람 구해요"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*목적</div>
            <InputField
              variant="gray"
              placeholder="예시) 아침 루틴 형성"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*효과</div>
            <InputField
              variant="gray"
              placeholder="예시) 하루 컨디션과 집중력 향상"
            />
          </div>

          {/* 인증 주기 */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*인증 주기</div>
            <div className="flex items-center gap-2">
              <select className="h-12 w-24 rounded-lg border border-gray-300 bg-white px-2 text-sm font-semibold text-gray-700">
                <option>Easy</option>
                <option>Standard</option>
                <option>Hard</option>
              </select>
              <div className="flex items-center gap-1">
                <InputField
                  variant="white"
                  className="w-14 px-0 text-center"
                  fullWidth={false}
                  placeholder="00"
                />
                <span className="text-sm text-gray-700">회</span>
              </div>
            </div>
          </div>

          {/* 시작 날짜 */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*시작 날짜</div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
                    )
                  }
                  className="p-2 text-gray-500"
                >
                  ‹
                </button>
                <span className="text-base text-primary-800">
                  {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                </span>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
                    )
                  }
                  className="p-2 text-gray-500"
                >
                  ›
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-700">
                {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                  <span key={d} className="text-xs text-gray-400">
                    {d}
                  </span>
                ))}
                {calendarCells.map((day, idx) => {
                  if (day === null) return <span key={idx} />;
                  const isSelected =
                    selectedDate &&
                    selectedDate.getFullYear() === currentMonth.getFullYear() &&
                    selectedDate.getMonth() === currentMonth.getMonth() &&
                    selectedDate.getDate() === day;
                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        setSelectedDate(
                          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
                        )
                      }
                      className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors
                        ${
                          isSelected
                            ? 'bg-primary-800 text-white border-primary-800'
                            : 'bg-white text-gray-700 '
                        }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 예상 보상 */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*예상 보상</div>
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-bold">
                  M
                </span>
                <span>+2 MOTI / 주</span>
              </div>
              <button className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-700 border border-gray-200">
                보상기준
              </button>
            </div>
          </div>
        </div>
      </div>
    </SubLayout>
  );
};

export default RoutineRegisterPage;
