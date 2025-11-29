import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import iconBack from '../../assets/icons/ic_back.svg';

const ProfileEditPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout
      header={{
        left: (
          <button onClick={() => navigate(-1)} className="p-2">
            <img src={iconBack} alt="back" className="h-6 w-6 object-contain" />
          </button>
        ),
        title: '프로필 사진/아이디 등록', 
    }}
    >
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">프로필 사진/아이디 등록</h1>
        <p className="text-gray-700">설정 항목들이 여기 표시됩니다.</p>
      </div>
    </MainLayout>
  );
};

export default ProfileEditPage;
