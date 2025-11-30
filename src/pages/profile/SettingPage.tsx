import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import iconBack from '../../assets/icons/ic_back.svg';
import Button from '../../components/common/Button';

type ModalType = 'logout' | 'withdrawal' | null;

const SettingPage = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleConfirm = () => {
    // TODO: 실제 로그아웃/탈퇴 로직 연동
    setModalType(null);
  };

  return (
    <MainLayout
      header={{
        left: (
          <button onClick={() => navigate(-1)} className="p-2">
            <img src={iconBack} alt="back" className="h-6 w-6 object-contain" />
          </button>
        ),
        title: '환경설정',
      }}
    >
      <div className="p-4 space-y-6 bg-gray-100 min-h-full">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm divide-y divide-gray-200">
          <button
            type="button"
            className="w-full text-left px-4 py-5 text-lg text-gray-900"
            onClick={() => setModalType('logout')}
          >
            로그아웃
          </button>
          <button
            type="button"
            className="w-full text-left px-4 py-5 text-lg text-gray-900"
            onClick={() => setModalType('withdrawal')}
          >
            회원탈퇴
          </button>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 space-y-4 shadow-lg">
            <div className="text-center text-lg font-semibold text-gray-900">
              {modalType === 'logout' ? '로그아웃 하시겠어요?' : '회원탈퇴 하시겠어요?'}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setModalType(null)} className="h-12">
                취소
              </Button>
              <Button fullWidth onClick={handleConfirm} className="h-12">
                {modalType === 'logout' ? '로그아웃' : '탈퇴'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default SettingPage;
