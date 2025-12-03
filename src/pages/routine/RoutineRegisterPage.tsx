import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubLayout from '../../components/layout/SubLayout';
import InputField from '../../components/common/InputField';
import mainPlaceholder from '../../assets/images/img_plus_box.png';
import { useAuthStore } from '../../store/authStore';
import usePostRoutines from '../../hooks/queries/usePostRoutines';
import type { RoutineCategory, RoutineDifficulty } from '../../types/routine';

const CATEGORY_MAP: Record<string, RoutineCategory> = {
  exercise: 'EXERCISE',
  study: 'STUDY',
  reading: 'READING',
};

const DIFFICULTY_MAP: Record<string, RoutineDifficulty> = {
  Easy: 'EASY',
  Standard: 'STANDARD',
  Hard: 'HARD',
};

const RoutineRegisterPage = () => {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const localProfileImage = useAuthStore((state) => state.localProfileImage);

  // 폼 상태
  const [category, setCategory] = useState<'exercise' | 'study' | 'reading'>('exercise');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // 목적
  const [difficulty, setDifficulty] = useState<'Easy' | 'Standard' | 'Hard'>('Easy');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mainImage, setMainImage] = useState<string>(''); // 메인 사진 (로컬)
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  // 메인 사진 선택 핸들러
  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    // 파일을 base64로 변환하여 미리보기
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setMainImage(result);
    };
    reader.readAsDataURL(file);
  };

  // 루틴 생성 mutation
  const { mutate: createRoutine, isPending } = usePostRoutines({
    onSuccess: () => {
      alert('루틴이 등록되었습니다!');
      navigate('/routine/list');
    },
    onError: (error) => {
      alert(error.response?.data?.message || '루틴 등록에 실패했습니다.');
    },
  });

  // 날짜 포맷 (YYYY-MM-DD)
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 등록 핸들러
  const handleSubmit = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!description.trim()) {
      alert('목적을 입력해주세요.');
      return;
    }
    if (!selectedDate) {
      alert('시작 날짜를 선택해주세요.');
      return;
    }

    createRoutine({
      title: title.trim(),
      description: description.trim(),
      category: CATEGORY_MAP[category],
      difficulty: DIFFICULTY_MAP[difficulty],
      startDate: formatDate(selectedDate),
    });
  };

  // 달력 계산
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const leadingEmpty = startOfMonth.getDay();
  const calendarCells = [
    ...Array(leadingEmpty).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // 프로필 이미지
  // @ts-expect-error Temporary: backend User type mismatch
  const profileImage = localProfileImage || authUser?.profileImageUrl;

  return (
    <SubLayout
      header={{ title: '루틴' }}
      footer={{
        type: 'double-button',
        onCancel: () => navigate('/routine/list'),
        onOk: handleSubmit,
        cancelText: '취소',
        okText: isPending ? '등록 중...' : '등록',
      }}
    >
      <div className="space-y-4 bg-gray-50 rounded-2xl p-4">
        {/* 프로필/분류 영역 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-400 overflow-hidden">
              {profileImage && (
                <img src={profileImage} alt="프로필" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="text-base font-semibold text-gray-900">
              {authUser?.nickname || '닉네임'}
            </div>
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

        {/* 메인 사진 영역 (로컬 미리보기, 서버 업로드 API 구현 시 연동 예정) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
          <div className="text-sm font-semibold text-gray-800">*메인 사진</div>
          <input
            ref={mainImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleMainImageSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => mainImageInputRef.current?.click()}
            className="h-48 w-full max-w-[150px] rounded-2xl bg-gray-400 flex items-center justify-center overflow-hidden"
          >
            {mainImage ? (
              <img src={mainImage} alt="메인 사진" className="h-full w-full object-cover" />
            ) : (
              <img src={mainPlaceholder} alt="메인 사진 추가" className="h-8 w-8 object-contain" />
            )}
          </button>
        </div>

        {/* 입력 필드 영역 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*제목</div>
            <InputField
              variant="gray"
              placeholder="예시) 일주일에 3번씩 운동 인증할사람 구해요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*목적</div>
            <InputField
              variant="gray"
              placeholder="예시) 아침 루틴 형성"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* 효과 필드 - API 미지원으로 주석 처리
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*효과</div>
            <InputField
              variant="gray"
              placeholder="예시) 하루 컨디션과 집중력 향상"
            />
          </div>
          */}

          {/* 인증 주기 */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">*인증 주기</div>
            <div className="flex items-center gap-2">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
                className="h-12 w-24 rounded-lg border border-gray-300 bg-white px-2 text-sm font-semibold text-gray-700"
              >
                <option value="Easy">Easy</option>
                <option value="Standard">Standard</option>
                <option value="Hard">Hard</option>
              </select>
              {/* 횟수 필드 - API 미지원으로 주석 처리
              <div className="flex items-center gap-1">
                <InputField
                  variant="white"
                  className="w-14 px-0 text-center"
                  fullWidth={false}
                  placeholder="00"
                />
                <span className="text-sm text-gray-700">회</span>
              </div>
              */}
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

          {/* 예상 보상 (API 미지원 - UI만 표시) */}
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
