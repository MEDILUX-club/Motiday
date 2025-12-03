import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SubLayout from '../../components/layout/SubLayout';
import RoutineTopInfo from '../../components/routine/RoutineTopInfo';
import RoutineInfoTab from '../../components/routine/RoutineInfoTab';
import RoutineMembersTab from '../../components/routine/RoutineMembersTab';
import AlertModal from '../../components/common/AlertModal';
import iconBack from '../../assets/icons/ic_back.svg';
import useGetRoutineStats from '../../hooks/queries/useGetRoutineStats';
import useGetUserRoutines from '../../hooks/queries/useGetUserRoutines';
import usePostRoutineJoin from '../../hooks/queries/usePostRoutineJoin';
import { useAuthStore } from '../../store/authStore';
import type { Routine } from '../../types/routine';

// 난이도 변환 (API → UI)
const DIFFICULTY_DISPLAY: Record<string, 'Easy' | 'Standard' | 'Hard'> = {
  EASY: 'Easy',
  STANDARD: 'Standard',
  HARD: 'Hard',
};

// 카테고리 한글 변환
const CATEGORY_DISPLAY: Record<string, string> = {
  EXERCISE: '운동 루틴',
  STUDY: '공부 루틴',
  READING: '독서 루틴',
};

const RoutineDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { routineId } = useParams<{ routineId: string }>();
  const userId = useAuthStore((state) => state.user?.userId);
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');
  
  // RoutineListPage에서 전달받은 루틴 데이터
  const routine = location.state?.routine as Routine | undefined;
  
  // Alert 모달 상태
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    message: '',
    type: 'success',
  });

  // 루틴 통계 조회
  const { data: stats } = useGetRoutineStats(Number(routineId) || 0, {
    enabled: Boolean(routineId),
  });

  // 참여 중인 루틴 목록 조회 (참여 여부 확인용)
  const { data: userRoutines = [], refetch: refetchUserRoutines } = useGetUserRoutines(userId ?? 0, {
    enabled: Boolean(userId),
  });

  // 현재 루틴 참여 여부 확인
  const isParticipating = userRoutines.some(
    (r) => r.routineId === Number(routineId)
  );

  // 루틴 참여하기
  const { mutate: joinRoutine, isPending: isJoining } = usePostRoutineJoin({
    onSuccess: async () => {
      // 참여 목록 즉시 새로고침하여 버튼 상태 변경
      await refetchUserRoutines();
      setAlertModal({
        isOpen: true,
        title: '참여 완료',
        message: '루틴에 참여했습니다!',
        type: 'success',
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || '참여에 실패했습니다.';
      setAlertModal({
        isOpen: true,
        title: '알림',
        message: errorMessage,
        type: 'error',
      });
    },
  });

  // 버튼 클릭 핸들러
  const handleAction = () => {
    if (isParticipating) {
      // 참여 중이면 인증 페이지로 이동 (routineId 전달)
      navigate('/routine/camera', { state: { routineId: Number(routineId) } });
    } else {
      // 참여 중이 아니면 참여하기
      joinRoutine(Number(routineId));
    }
  };

  // 버튼 텍스트 결정
  const getActionLabel = () => {
    if (isJoining) return '참여 중...';
    return isParticipating ? '인증하기' : '참여하기';
  };


  // 난이도에 따른 인증 주기 (예시)
  const getFrequencyByDifficulty = (difficulty?: string) => {
    switch (difficulty) {
      case 'EASY': return '주 2회 인증';
      case 'STANDARD': return '주 3회 인증';
      case 'HARD': return '주 5회 인증';
      default: return '주 2회 인증';
    }
  };

  // 난이도에 따른 리워드 (예시)
  const getRewardByDifficulty = (difficulty?: string) => {
    switch (difficulty) {
      case 'EASY': return '+ 2 MOTI / 주';
      case 'STANDARD': return '+ 3 MOTI / 주';
      case 'HARD': return '+ 5 MOTI / 주';
      default: return '+ 2 MOTI / 주';
    }
  };

  const details = [
    { icon: 'sun' as const, title: '목적', description: routine?.description || '루틴을 통한 목표 달성' },
    { icon: 'routine' as const, title: '효과', description: '꾸준한 습관 형성과 성취감' },
    { icon: 'clock' as const, title: '인증 주기', description: getFrequencyByDifficulty(routine?.difficulty) },
    { icon: 'camera' as const, title: '인증 방법', description: '실제 활동 사진 업로드' },
  ];

  const participants = Array(10).fill({ name: 'Moti_Day' });

  return (
    <SubLayout
      header={{
        title: '챌린지',
        left: (
          <button onClick={() => navigate(-1)} className="p-2">
            <img src={iconBack} alt="뒤로가기" className="h-6 w-6 object-contain" />
          </button>
        ),
      }}
      footer={{
        type: 'toggle',
        toggleActive: activeTab,
        onToggle: setActiveTab,
      }}
    >
      <div className="space-y-6">
        <RoutineTopInfo
          userName="김모티" // TODO: 작성자 정보 API에서 받아오기
          title={routine?.title || '루틴 상세'}
          difficulty={routine ? DIFFICULTY_DISPLAY[routine.difficulty] || 'Easy' : 'Easy'}
          frequency={getFrequencyByDifficulty(routine?.difficulty)}
          reward={getRewardByDifficulty(routine?.difficulty)}
          participants={`현재 참여인원 ${routine?.currentParticipants?.toLocaleString() || 0}명`}
          tags={routine ? [CATEGORY_DISPLAY[routine.category] || '루틴', '목표 루틴'] : ['루틴']}
          onAction={handleAction}
          actionLabel={getActionLabel()}
        />

        {activeTab === 'left' ? (
          <RoutineInfoTab details={details} />
        ) : (
          <RoutineMembersTab
            participants={participants}
            totalParticipants={stats?.activeParticipants ?? 0}
            recentUploads={stats?.last7DaysCertCount ?? 0}
            todayUploads={stats?.dailyCertificationCount ?? 0}
            yesterdayUploads={stats?.yesterdayCertificationCount ?? 0}
            isParticipating={isParticipating}
            routineId={Number(routineId)}
          />
        )}
      </div>

      {/* Alert 모달 */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal((prev) => ({ ...prev, isOpen: false }))}
        title={alertModal.title}
        message={alertModal.message}
        confirmText="확인"
      />
    </SubLayout>
  );
};

export default RoutineDetailPage;
