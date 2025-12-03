import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import iconBack from '../../assets/icons/ic_back.svg';
import iconPhoto from '../../assets/icons/ic_photo.svg';
import iconCamera from '../../assets/icons/ic_camera_white2.svg';
import { useAuthStore } from '../../store/authStore';
import useGetUsers from '../../hooks/queries/useGetUsers';
import usePutUsers from '../../hooks/queries/usePutUsers';
import { useGetUsersCheckNickname } from '../../hooks/queries/useGetUsersCheckNickname';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?.userId);
  const localProfileImage = useAuthStore((state) => state.localProfileImage);
  const setLocalProfileImage = useAuthStore((state) => state.setLocalProfileImage);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    // 파일을 base64로 변환하여 미리보기 및 store에 저장
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setProfileImageUrl(result);
      setLocalProfileImage(result); // store에 저장
    };
    reader.readAsDataURL(file);
  };

  const { data: userData, isLoading } = useGetUsers(userId ?? 0, {
    enabled: Boolean(userId),
  });

  const { mutate: updateUser, isPending: isUpdating } = usePutUsers({
    onSuccess: () => navigate('/profile', { replace: true }),
  });

  const {
    data: nicknameAvailable,
    isFetching: isCheckingNickname,
    refetch: refetchNickname,
  } = useGetUsersCheckNickname(nickname, {
    enabled: false,
    retry: 0,
  });

  // 프로필 이미지는 로컬 이미지 > 서버 이미지 순으로 초기화
  useEffect(() => {
    const id = window.setTimeout(() => {
      setProfileImageUrl((prev) => prev || localProfileImage || userData?.profileImageUrl || '');
    }, 0);
    return () => clearTimeout(id);
  }, [userData, localProfileImage]);

  const handleSubmit = () => {
    if (!userId) return;
    // 이미지는 로컬에서만 관리 (서버 업로드 API 없음)
    // profileImageUrl은 서버에 보내지 않음
    updateUser({
      userId,
      payload: {
        nickname: nickname || userData?.nickname || '',
        bio: bio || userData?.bio || '',
      },
    });
  };

  const handleCheckNickname = async () => {
    if (!nickname) return;
    await refetchNickname();
  };

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
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <div className="relative">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-36 w-36 rounded-full bg-gray-300 border border-gray-400 flex items-center justify-center overflow-hidden"
            >
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="프로필 사진" className="h-full w-full object-cover" />
              ) : (
                <img src={iconPhoto} alt="사진 업로드" className="h-15 w-15 object-contain" />
              )}
            </button>
            <div className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gray-500 shadow-md flex items-center justify-center pointer-events-none">
              <img src={iconCamera} alt="카메라" className="h-5 w-5 object-contain" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="relative">
              <InputField
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={userData?.nickname || '아이디 입력'}
                className="bg-white text-lg font-semibold pr-10"
                onBlur={handleCheckNickname}
                disabled={isLoading || isUpdating}
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
            <div className="text-sm text-gray-500">
              {isCheckingNickname
                ? '중복 체크 중...'
                : nickname
                  ? nicknameAvailable === false
                    ? '이미 사용 중인 아이디예요.'
                    : '사용 가능한 아이디예요.'
                  : '아이디를 입력해주세요.'}
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <InputField
                multiline
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={userData?.bio || '한 줄 소개 입력하기'}
                className="bg-white pr-10"
                disabled={isLoading || isUpdating}
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

        <Button
          onClick={handleSubmit}
          disabled={(!nickname && !userData?.nickname) || isLoading || isUpdating}
        >
          {isUpdating ? '저장 중...' : '수정완료'}
        </Button>
      </div>
    </MainLayout>
  );
};

export default ProfileEditPage;
