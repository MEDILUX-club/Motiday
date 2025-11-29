import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubLayout from '../../components/layout/SubLayout';

// 프로필 이미지 (임시)
import dummyProfile from '../../assets/images/img_Motiday.png'; 

const RoutineAuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. 카메라 페이지에서 보낸 사진 받기 ('state.capturedImage')
  const capturedImage = location.state?.capturedImage;

  const [content, setContent] = useState('');
  const [isShareEnabled, setIsShareEnabled] = useState(false);

  // 사진이 없으면 다시 카메라로 돌려보냄 (예외처리)
  useEffect(() => {
    if (!capturedImage) {
      alert("인증 사진이 없습니다. 카메라 화면으로 이동합니다.");
      navigate('/routine/shot');
    }
  }, [capturedImage, navigate]);

  return (
    <SubLayout
      header={{ title: '인증' }}
      footer={{
        type: 'single-button',
        text: '등록',
        onOk: () => alert('인증 등록 완료!'),
      }}
    >
      <div className="flex flex-col gap-6">
        
        {/* === 이미지 영역 (2열) === */}
        <div className="grid grid-cols-2 gap-3 h-48">
          
          {/* [왼쪽] 카메라에서 찍은 사진이 들어가는 곳 */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            {capturedImage ? (
              <img 
                src={capturedImage} 
                alt="인증 사진" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                사진 없음
              </div>
            )}
          </div>

          {/* [오른쪽] 추가 업로드 버튼 (빈 칸) */}
          <button className="w-full h-full rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="text-3xl text-gray-400 mb-1">+</span>
          </button>
        </div>

        {/* 유저 정보 */}
        <div className="flex items-center gap-3">
          <img src={dummyProfile} alt="profile" className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">2025.10.23</span>
            <span className="text-base font-bold text-gray-900">김모티</span>
          </div>
          <div className="ml-auto text-sm text-gray-500 flex items-center gap-1 cursor-pointer">
            운동루틴 <span className="text-xs">∨</span>
          </div>
        </div>

        {/* 텍스트 입력 영역 */}
        <div className="w-full rounded-xl border border-gray-200 p-4 min-h-[200px] bg-white">
          <div className="flex items-center gap-2 mb-3 text-red-500 text-xs font-bold">
            📌 운동 루틴 기록 가이드
          </div>
          <textarea
            className="w-full h-[150px] resize-none text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none"
            placeholder="오늘 어떤 운동을 했는지 간단히 적어보세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 공유 토글 */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-bold text-gray-500">클럽 활동 게시물에도 등록</span>
          <button 
            onClick={() => setIsShareEnabled(!isShareEnabled)}
            className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${isShareEnabled ? 'bg-primary-800' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${isShareEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

      </div>
    </SubLayout>
  );
};

export default RoutineAuthPage;
