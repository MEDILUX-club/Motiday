import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import iconBack from '../../assets/icons/ic_back.svg';
import iconPhoto from '../../assets/icons/ic_photo.svg';
import iconCamera from '../../assets/icons/ic_camera_white2.svg';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('모티데이');
  const [bio, setBio] = useState('');

  return (
    <MainLayout
      header={{
        left: (
          <button onClick={() => navigate(-1)} className="p-2">
            <img src={iconBack} alt="뒤로가기" className="h-6 w-6 object-contain" />
          </button>
        ),
        title: '프로필 사진/아이디 등록',
      }}
    >
      <div className="p-4 space-y-6 bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-36 w-36 rounded-full bg-gray-300 border border-gray-400 flex items-center justify-center">
            <img src={iconPhoto} alt="사진 업로드" className="h-15 w-15 object-contain" />
            <button
              type="button"
              className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gray-500 shadow-md flex items-center justify-center"
            >
              <img src={iconCamera} alt="카메라" className="h-5 w-5 object-contain" />
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="relative">
              <InputField
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="아이디 입력"
                className="bg-white text-lg font-semibold pr-10"
              />
              {nickname && (
                <button
                  type="button"
                  onClick={() => setNickname('')}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 text-lg"
                >
                  ×
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500">사용 가능한 아이디예요.</div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <InputField
                multiline
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="한 줄 소개 입력하기"
                className="bg-white pr-10"
              />
              {bio && (
                <button
                  type="button"
                  onClick={() => setBio('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500">나를 소개하는 한 줄을 간단히 작성해주세요.</div>
          </div>
        </div>

        <Button onClick={() => navigate(-1)}>수정완료</Button>
      </div>
    </MainLayout>
  );
};

export default ProfileEditPage;
