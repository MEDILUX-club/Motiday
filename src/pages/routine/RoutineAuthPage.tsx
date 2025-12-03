import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubLayout from '../../components/layout/SubLayout';
import profileImage from '../../assets/images/img_HomeFeedCard_profile.png';
import plusBox from '../../assets/images/img_plus_box.png';
import { usePostFeeds } from '../../hooks/queries/usePostFeeds';
import { useAuthStore } from '../../store/authStore';
import { useFeedStore } from '../../store/feedStore';
import { useGetUserRoutines } from '../../hooks/queries/useGetUserRoutines';

// 카테고리 한글 변환
const CATEGORY_LABEL: Record<string, string> = {
  EXERCISE: '운동루틴',
  STUDY: '공부루틴',
  READING: '독서루틴',
};

const RoutineAuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const localProfileImage = useAuthStore((state) => state.localProfileImage);
  const [isRoutineMenuOpen, setIsRoutineMenuOpen] = useState(false);
  
  // 카메라 페이지에서 전달받은 routineId
  const initialRoutineId = location.state?.routineId as number | undefined;
  
  // 사용자가 참여 중인 루틴 목록 조회
  const { data: userRoutines = [], isLoading: isRoutinesLoading } = useGetUserRoutines(user?.userId ?? 0, {
    enabled: Boolean(user?.userId),
  });
  
  // 사용자가 직접 선택한 루틴 ID (null이면 아직 선택 안 함)
  const [manuallySelectedRoutineId, setManuallySelectedRoutineId] = useState<number | null>(null);
  
  // 최종 사용할 루틴 ID (우선순위: 수동 선택 > 전달받은 값 > 첫 번째 참여 루틴)
  const selectedRoutineId = useMemo(() => {
    // 사용자가 직접 선택한 경우
    if (manuallySelectedRoutineId !== null) return manuallySelectedRoutineId;
    // 전달받은 routineId가 있고, 참여 중인 루틴 목록에 있는 경우
    if (initialRoutineId && userRoutines.some(r => r.routineId === initialRoutineId)) {
      return initialRoutineId;
    }
    // 첫 번째 참여 루틴
    if (userRoutines.length > 0) return userRoutines[0].routineId;
    return undefined;
  }, [manuallySelectedRoutineId, initialRoutineId, userRoutines]);
  
  // 현재 선택된 루틴 정보
  const selectedRoutine = useMemo(() => {
    return userRoutines.find(r => r.routineId === selectedRoutineId);
  }, [userRoutines, selectedRoutineId]);
  
  // 1. 카메라 페이지에서 보낸 사진들
  const initialImages = useMemo(() => {
    const capturedImage = location.state?.capturedImage as string | undefined;
    const previousImages = (location.state?.previousImages as string[] | undefined) ?? [];
    return capturedImage ? [...previousImages, capturedImage] : previousImages;
  }, [location.state]);

  const [images] = useState<string[]>(initialImages);

  const [content, setContent] = useState('');
  const [isShareEnabled, setIsShareEnabled] = useState(false);
  
  // 로컬 피드 이미지 저장 함수
  const setLocalFeedImage = useFeedStore((state) => state.setLocalFeedImage);

  // 피드 생성 mutation
  const { mutateAsync: createFeed, isPending } = usePostFeeds();

  // 피드 등록 핸들러
  const handleSubmit = async () => {
    if (!selectedRoutineId) {
      if (userRoutines.length === 0) {
        alert('참여 중인 루틴이 없습니다. 먼저 루틴에 참여해주세요.');
      } else {
        alert('루틴을 선택해주세요.');
      }
      return;
    }
    
    if (images.length === 0) {
      alert('사진을 먼저 촬영해주세요.');
      return;
    }

    // TODO: 이미지 업로드 API 연동 필요
    // 현재는 이미지 업로드 API가 없어서 임시 placeholder 사용
    // 나중에 이미지 업로드 API가 생기면 아래 순서로 연동:
    // 1. images[0] (base64)를 이미지 업로드 API로 전송
    // 2. 응답받은 imageUrl을 createFeed에 전달
    const tempImageUrl = 'pending_upload'; // 임시 값

    try {
      const res = await createFeed({
        routineId: selectedRoutineId,
        imageUrl: tempImageUrl,
        caption: content,
        isSharedToRoutine: isShareEnabled,
      });

      // 로컬에 피드 이미지 저장 (이미지 업로드 API 연동 전까지 사용)
      if (images[0] && res.feedId) {
        setLocalFeedImage(res.feedId, images[0]);
      }

      alert('인증이 완료되었습니다!');
      navigate('/home', { replace: true }); // 홈 피드로 이동
    } catch (error) {
      // error가 AxiosError 타입(axios import 필요)로 가정
      let message = '인증 등록에 실패했습니다.';
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object') {
        // @ts-expect-error: axios 에러 타입 추론 어려움
        message = error.response.data?.message || message;
      }
      alert(message);
    }
  };

  // 사진이 없으면 다시 카메라로 돌려보냄 (예외처리)
  useEffect(() => {
    if (images.length === 0) {
      navigate('/routine/camera', { state: { routineId: selectedRoutineId } });
    }
  }, [images.length, navigate, selectedRoutineId]);

  // 오늘 날짜 포맷
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  return (
    <SubLayout
      header={{ title: '인증' }}
      footer={{
        type: 'single-button',
        text: isPending ? '등록 중...' : '등록',
        onOk: handleSubmit,
        disabled: isPending,
      }}
    >
      <div className="flex flex-col gap-6">
        
        {/* === 이미지 영역 (2열) === */}
        <div className="grid grid-cols-2 gap-3 h-64">
          
          {/* [왼쪽] 카메라에서 찍은 사진이 들어가는 곳 */}
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-400">
            {images[0] ? (
              <img 
                src={images[0]} 
                alt="인증 사진" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                사진 없음
              </div>
            )}
          </div>

          {/* [오른쪽] 추가 업로드 버튼 (빈 칸) */}
          {images[1] ? (
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-400">
              <img src={images[1]} alt="추가 인증 사진" className="w-full h-full object-cover" />
            </div>
          ) : (
            <button
              className="w-full h-full rounded-xl bg-gray-400 border border-gray-200 flex flex-col items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={() => navigate('/routine/camera', { state: { previousImages: images, routineId: selectedRoutineId } })}
            >
              <img src={plusBox} alt="추가" className="h-10 w-10 object-contain" />
            </button>
          )}
        </div>

        {/* 유저 정보 */}
        <div className="flex items-center gap-3 relative">
          <img 
            src={localProfileImage || profileImage} 
            alt="profile" 
            className="w-12 h-12 rounded-full bg-gray-200 object-cover" 
          />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">{formattedDate}</span>
            <span className="text-base font-bold text-gray-900">{user?.nickname || '사용자'}</span>
          </div>
          <div className="ml-auto relative z-20">
            <button
              type="button"
              onClick={() => setIsRoutineMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm text-gray-600 px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
              disabled={isRoutinesLoading || userRoutines.length === 0}
            >
              {isRoutinesLoading ? '로딩 중...' : 
               userRoutines.length === 0 ? '참여 중인 루틴 없음' :
               selectedRoutine ? (selectedRoutine.title || CATEGORY_LABEL[selectedRoutine.category] || '루틴') : '루틴 선택'}
              {userRoutines.length > 0 && <span className="text-xs">∨</span>}
            </button>
            {isRoutineMenuOpen && userRoutines.length > 0 && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50 max-h-60 overflow-y-auto">
                {userRoutines.map((routine) => (
                  <button
                    key={routine.routineId}
                    type="button"
                    onClick={() => {
                      setManuallySelectedRoutineId(routine.routineId);
                      setIsRoutineMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm ${
                      selectedRoutineId === routine.routineId
                        ? 'bg-primary-50 text-primary-800 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium truncate">{routine.title || '이름 없는 루틴'}</div>
                    <div className="text-xs text-gray-400">{CATEGORY_LABEL[routine.category] || routine.category}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 텍스트 입력 영역 */}
        <div className="w-full rounded-2xl border border-gray-500 p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm ">
            📌 공부 루틴 기록 가이드
          </div>
          <textarea
            className="w-full h-[220px] resize-none text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
            placeholder="오늘 공부한 과목/파트 및 시간을 간단히 적어주세요.&#10;잘 된 점이나 어려웠던 부분을 한두 줄로 써도 좋아요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 공유 토글 */}
        <div className="flex items-center justify-between py-2">
          <span className="text-m text-gray-600">클럽 활동 게시물에도 등록</span>
          <button 
            onClick={() => setIsShareEnabled(!isShareEnabled)}
            className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${isShareEnabled ? 'bg-primary-800' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${isShareEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

      </div>
    </SubLayout>
  );
};

export default RoutineAuthPage;
