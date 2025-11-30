import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SubLayout from '../../components/layout/SubLayout';
import RoutineTopInfo from '../../components/routine/RoutineTopInfo';
import RoutineInfoTab from '../../components/routine/RoutineInfoTab';
import RoutineMembersTab from '../../components/routine/RoutineMembersTab';
import iconBack from '../../assets/icons/ic_back.svg';

const RoutineDetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

  const details = [
    { icon: 'sun' as const, title: '목적', description: '매일 일정한 시간에 일어나 아침 루틴 형성' },
    { icon: 'routine' as const, title: '효과', description: '하루 컨디션과 집중력 향상' },
    { icon: 'clock' as const, title: '인증 주기', description: '매일 1회, 목표시간 10분 이내 인증' },
    { icon: 'camera' as const, title: '인증 방법', description: '실제 기상 순간 사진 업로드' },
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
          userName="Khree_0"
          title="[수원] 매주 수요일 러닝할사람"
          difficulty="Easy"
          frequency="2회 인증 / 주"
          reward="+ 2 MOTI / 주"
          participants="현재 참여인원 4,342명"
          tags={['운동 루틴', '목표 루틴']}
          onAction={() => {}}
        />

        {activeTab === 'left' ? (
          <RoutineInfoTab details={details} />
        ) : (
          <RoutineMembersTab
            participants={participants}
            totalParticipants={26}
            recentUploads={148}
            todayUploads={18}
            yesterdayUploads={22}
          />
        )}
      </div>
    </SubLayout>
  );
};

export default RoutineDetailPage;
