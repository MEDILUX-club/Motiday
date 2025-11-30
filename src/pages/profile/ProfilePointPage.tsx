import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';

const tabs = [
  { label: '전체', value: 'all' },
  { label: '적립', value: 'earn' },
  { label: '차감', value: 'use' },
];

const history = [
  '+2Moti | EASY 운동 루틴 보상 적립 (25.12.22)',
  '-15Moti | “체험단 이름” 루틴부스터 체험단 신청 차감 (26.12.22)',
];

const ProfilePointPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'earn' | 'use'>('all');

  return (
    <MainLayout
      header={{
        left: (
          <button onClick={() => navigate('/home')}>
            <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
          </button>
        ),
        right: (
          <button onClick={() => navigate('/setting')}>
            <img src={iconSetting} alt="setting" className="h-6 w-6 object-contain" />
          </button>
        ),
      }}
    >
      <div className="p-4 space-y-4 bg-gray-100">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-700 text-white text-xs font-bold">
              P
            </span>
            <span className="font-semibold">100 MOTI</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white font-semibold text-xs">
              ?
            </span>
          </div>

          <div className="flex gap-2">
            {tabs.map((tab) => {
              const active = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as typeof activeTab)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    active ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4 space-y-2 text-sm text-gray-800">
          {history.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePointPage;
