import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import InputField from '../../components/common/InputField';
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';
import defaultProfile from '../../assets/images/img_HomeFeedCard_profile.png';
import { useAuthStore } from '../../store/authStore';
import { useGetFollowers } from '../../hooks/queries/useGetFollowers';
import { useGetFollowings } from '../../hooks/queries/useGetFollowings';
import { useGetUsers } from '../../hooks/queries/useGetUsers';
import { useGetUserFeeds } from '../../hooks/queries/useGetUserFeeds';
import FollowButton from '../../components/common/FollowButton';

const FollowListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId: paramUserId } = useParams<{ userId: string }>();
  const authUser = useAuthStore((state) => state.user);
  
  // URL 파라미터가 있으면 해당 userId, 없으면 로그인된 사용자
  const userId = paramUserId ? Number(paramUserId) : authUser?.userId;
  
  const initialTab = (location.state as { tab?: 'followers' | 'following' })?.tab ?? 'followers';
  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>(initialTab);
  const [query, setQuery] = useState('');

  // API 조회
  const { data: profile } = useGetUsers(userId ?? 0, { enabled: Boolean(userId) });
  const { data: feeds = [] } = useGetUserFeeds(userId ?? 0, { enabled: Boolean(userId) });
  const { data: followers = [], isLoading: isFollowersLoading } = useGetFollowers(userId ?? 0, { 
    enabled: Boolean(userId) && activeTab === 'followers' 
  });
  const { data: followings = [], isLoading: isFollowingsLoading } = useGetFollowings(userId ?? 0, { 
    enabled: Boolean(userId) && activeTab === 'following' 
  });

  // 현재 탭에 맞는 목록
  const list = useMemo(() => {
    const data = activeTab === 'followers' ? followers : followings;
    if (!query.trim()) return data;
    return data.filter((item) => 
      item.nickname.toLowerCase().includes(query.toLowerCase())
    );
  }, [activeTab, query, followers, followings]);

  const isLoading = activeTab === 'followers' ? isFollowersLoading : isFollowingsLoading;

  const handleTab = (tab: 'posts' | 'followers' | 'following') => {
    if (tab === 'posts') {
      navigate(paramUserId ? `/profile/${paramUserId}` : '/profile');
      return;
    }
    setActiveTab(tab);
  };

  const handleUserClick = (clickedUserId: number) => {
    navigate(`/profile/${clickedUserId}`);
  };

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
      <div className="p-4 space-y-5 bg-gray-100">
        <div className="text-xl font-semibold text-gray-900 px-1">
          {profile?.nickname || 'Moti_Day'}
        </div>

        <div className="grid grid-cols-3 divide-x divide-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-800 overflow-hidden border border-gray-100">
          <button
            type="button"
            onClick={() => handleTab('posts')}
            className={`flex items-center justify-center gap-2 py-3 ${activeTab === 'posts' ? 'bg-gray-50' : ''}`}
          >
            <span>게시글</span>
            <span className="text-base font-bold">{feeds.length}</span>
          </button>
          <button
            type="button"
            onClick={() => handleTab('followers')}
            className={`flex items-center justify-center gap-2 py-3 ${activeTab === 'followers' ? 'bg-gray-50' : ''}`}
          >
            <span>팔로워</span>
            <span className="text-base font-bold">{followers.length}</span>
          </button>
          <button
            type="button"
            onClick={() => handleTab('following')}
            className={`flex items-center justify-center gap-2 py-3 ${activeTab === 'following' ? 'bg-gray-50' : ''}`}
          >
            <span>팔로잉</span>
            <span className="text-base font-bold">{followings.length}</span>
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
            {isLoading ? (
              <div className="flex items-center justify-center h-20">
                <span className="text-gray-500">불러오는 중...</span>
              </div>
            ) : list.length === 0 ? (
              <div className="flex items-center justify-center h-20">
                <span className="text-gray-500">
                  {activeTab === 'followers' ? '팔로워가 없습니다.' : '팔로잉이 없습니다.'}
                </span>
              </div>
            ) : (
              list.map((item) => (
                <div key={item.userId} className="flex items-center gap-3">
                  <button 
                    onClick={() => handleUserClick(item.userId)}
                    className="flex items-center gap-3 flex-1"
                  >
                    <img
                      src={item.profileImageUrl || defaultProfile}
                      alt={item.nickname}
                      className="h-12 w-12 rounded-full object-cover bg-gray-200"
                    />
                    <div className="flex-1 text-left">
                      <div className="text-base font-semibold text-gray-900">{item.nickname}</div>
                    </div>
                  </button>
                  <FollowButton targetUserId={item.userId} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FollowListPage;
