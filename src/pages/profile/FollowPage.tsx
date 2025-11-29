import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';

const FollowListPage = () => {
  const navigate = useNavigate();

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
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">팔로우 리스트</h1>
        <p className="text-gray-700">팔로잉/팔로워 목록이 여기에 표시됩니다.</p>
      </div>
    </MainLayout>
  );
};

export default FollowListPage;
