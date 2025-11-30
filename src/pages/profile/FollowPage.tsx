import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import InputField from '../../components/common/InputField';
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';
import profileImage from '../../assets/images/img_HomeFeedCard_profile.png';

type FollowItem = {
  name: string;
  status: string;
  avatar?: string;
  isMutual?: boolean;
};

const sampleFollowers: FollowItem[] = [
  { name: 'Jefferey illiams', status: 'Seen on Monday', isMutual: false },
  { name: 'Talia Gomez', status: 'Seen on Wednesday', isMutual: false },
  { name: 'Francis Ofori', status: 'Active 1hr ago', isMutual: false },
  { name: 'Jordan Amil', status: 'Active now', isMutual: true },
  { name: 'Jade Chen', status: 'Sent', isMutual: true },
];

const sampleFollowing: FollowItem[] = [
  { name: 'Sophie Park', status: 'Active now', isMutual: true },
  { name: 'Lee Min', status: 'Seen yesterday', isMutual: false },
  { name: 'Chris Lim', status: 'Sent', isMutual: false },
];

const FollowListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab = (location.state as { tab?: 'followers' | 'following' })?.tab ?? 'followers';
  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>(initialTab);
  const [query, setQuery] = useState('');
  const [followers, setFollowers] = useState<FollowItem[]>(sampleFollowers);
  const [following, setFollowing] = useState<FollowItem[]>(sampleFollowing);

  const list = useMemo(() => {
    const data = activeTab === 'followers' ? followers : following;
    if (!query.trim()) return data;
    return data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [activeTab, query, followers, following]);

  const toggleMutual = (name: string) => {
    if (activeTab === 'followers') {
      setFollowers((prev) =>
        prev.map((item) => (item.name === name ? { ...item, isMutual: !item.isMutual } : item)),
      );
    } else {
      setFollowing((prev) =>
        prev.map((item) => (item.name === name ? { ...item, isMutual: !item.isMutual } : item)),
      );
    }
  };

  const handleTab = (tab: 'posts' | 'followers' | 'following') => {
    if (tab === 'posts') {
      navigate('/profile');
      return;
    }
    setActiveTab(tab);
  };

  return (
    <MainLayout
      header={{
        left: <img src={logo} alt="logo" className="h-8 w-8 object-contain" />,
        right: (
          <button onClick={() => navigate('/setting')}>
            <img src={iconSetting} alt="setting" className="h-6 w-6 object-contain" />
          </button>
        ),
      }}
    >
      <div className="p-4 space-y-5 bg-gray-100">
        <div className="text-xl font-semibold text-gray-900 px-1">Moti_Day</div>

        <div className="grid grid-cols-3 divide-x divide-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-800 overflow-hidden border border-gray-100">
          <button
            type="button"
            onClick={() => handleTab('posts')}
            className={`flex items-center justify-center gap-2 py-3 ${activeTab === 'posts' ? 'bg-gray-50' : ''}`}
          >
            <span>게시글</span>
            <span className="text-base font-bold">3</span>
          </button>
          <button
            type="button"
            onClick={() => handleTab('followers')}
            className={`flex items-center justify-center gap-2 py-3 ${activeTab === 'followers' ? 'bg-gray-50' : ''}`}
          >
            <span>팔로워</span>
            <span className="text-base font-bold">2,432</span>
          </button>
          <button
            type="button"
            onClick={() => handleTab('following')}
            className={`flex items-center justify-center gap-2 py-3 ${activeTab === 'following' ? 'bg-gray-50' : ''}`}
          >
            <span>팔로잉</span>
            <span className="text-base font-bold">42</span>
          </button>
        </div>

        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-4">
          <InputField
            variant="gray"
            showSearchIcon
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색"
            className="text-gray-700"
          />

          <div className="space-y-4">
            {list.map((item, idx) => (
              <div key={`${item.name}-${idx}`} className="flex items-center gap-3">
                <img
                  src={item.avatar || profileImage}
                  alt={item.name}
                  className="h-12 w-12 rounded-full object-cover bg-gray-200"
                />
                <div className="flex-1">
                  <div className="text-base font-semibold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.status}</div>
                </div>
                <button
                  type="button"
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${item.isMutual ? 'bg-gray-200 text-gray-700' : 'bg-primary-700 text-gray-900'}`}
                  onClick={() => toggleMutual(item.name)}
                >
                  {item.isMutual ? '맞팔해제' : '맞팔로우'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FollowListPage;
