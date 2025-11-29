import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SubLayout from '../../components/layout/SubLayout';
import iconBack from '../../assets/icons/ic_back.svg';

const ClubDetailPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

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
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">
          {clubId ? `동아리 ${clubId}` : '동아리 이름'}
        </h1>
        <p className="text-gray-700">
          동아리 소개 내용이 여기에 표시됩니다. 활동 일정, 모집 인원 등 세부 정보를 넣어주세요.
        </p>
      </div>
    </SubLayout>
  );
};

export default ClubDetailPage;
