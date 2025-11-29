import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubLayout from '../../components/layout/SubLayout';
import profileImage from '../../assets/images/img_HomeFeedCard_profile.png';
import plusBox from '../../assets/images/img_plus_box.png';

const RoutineAuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. 카메라 페이지에서 보낸 사진들
  const initialImages = useMemo(() => {
    const capturedImage = location.state?.capturedImage as string | undefined;
    const previousImages = (location.state?.previousImages as string[] | undefined) ?? [];
    return capturedImage ? [...previousImages, capturedImage] : previousImages;
  }, [location.state]);

  const [images] = useState<string[]>(initialImages);

  const [content, setContent] = useState('');
  const [isShareEnabled, setIsShareEnabled] = useState(false);

  // 사진이 없으면 다시 카메라로 돌려보냄 (예외처리)
  useEffect(() => {
    if (images.length === 0) {
      navigate('/routine/camera');
    }
  }, [images.length, navigate]);

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
        <div className="grid grid-cols-2 gap-3 h-64">
          
          {/* [왼쪽] 카메라에서 찍은 사진이 들어가는 곳 */}
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-400">
            {images[0] ? (
              <img 
                src={images[0]} 
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
          {images[1] ? (
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-400">
              <img src={images[1]} alt="추가 인증 사진" className="w-full h-full object-cover" />
            </div>
          ) : (
            <button
              className="w-full h-full rounded-xl bg-gray-400 border border-gray-200 flex flex-col items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={() => navigate('/routine/camera', { state: { previousImages: images } })}
            >
              <img src={plusBox} alt="추가" className="h-10 w-10 object-contain" />
            </button>
          )}
        </div>

        {/* 유저 정보 */}
        <div className="flex items-center gap-3">
          <img src={profileImage} alt="profile" className="w-12 h-12 rounded-full bg-gray-200 object-cover" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">2025.10.23</span>
            <span className="text-base font-bold text-gray-900">김모티</span>
          </div>
          <div className="ml-auto text-sm text-gray-600 flex items-center gap-1 cursor-pointer">
            운동루틴 <span className="text-xs">∨</span>
          </div>
        </div>

        {/* 텍스트 입력 영역 */}
        <div className="w-full rounded-2xl border border-gray-500 p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm ">
            📌 공부 루틴 기록 가이드
          </div>
          <textarea
            className="w-full h-[220px] resize-none text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
            placeholder="오늘 공부한 과목/파트 및 시간을 간단히 적어주세요.&#10;잘 된 점이나 어려웠던 부분을 한두 줄로 써도 좋아요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 공유 토글 */}
        <div className="flex items-center justify-between py-2">
          <span className="text-m text-gray-600">클럽 활동 게시물에도 등록</span>
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
