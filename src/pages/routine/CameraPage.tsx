import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/common/Button';

// 이미지 import
import logoWhite from '../../assets/images/img_Motiday_white.png';
import iconClock from '../../assets/icons/ic_clock.svg';
import iconTimeLine from '../../assets/icons/ic_time-line.svg';
import iconCamera from '../../assets/icons/ic_camera_white.svg';
import iconLoop from '../../assets/icons/ic_loop.svg';

const CameraPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef<Webcam>(null);
  
  // 이전 페이지에서 전달받은 routineId와 이전 이미지들
  const routineId = location.state?.routineId as number | undefined;
  const previousImages = (location.state?.previousImages as string[] | undefined) ?? [];
  
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [time, setTime] = useState(new Date());

  // 시간 갱신
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = time.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.');
  const timeStr = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 사진 촬영 및 합성 (워터마크)
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.src = imageSrc;
    image.onload = () => {
      if (!ctx) return;

      // 기본 가로/세로 비율 그대로 그림
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // 워터마크(텍스트/로고) 그리기
      // 2. 텍스트 설정
      const fontSize = canvas.width * 0.04;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;

      // 3. 날짜/시간 그리기
      ctx.fillText(dateStr, canvas.width * 0.05, canvas.height - canvas.width * 0.05); // 좌측 하단
      ctx.textAlign = 'right';
      ctx.fillText(timeStr, canvas.width - canvas.width * 0.05, canvas.height - canvas.width * 0.05); // 우측 하단

      // 4. 로고 합성 (좌측 상단)
      const logo = new Image();
      logo.src = logoWhite;
      logo.onload = () => {
        const logoX = canvas.width * 0.05;
        const logoY = canvas.width * 0.1;
        const logoWidth = canvas.width * 0.05; // 크기 축소
        const logoHeight = logoWidth * (logo.height / logo.width);
        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

        // 로고 오른쪽에 텍스트 추가
        const textPadding = logoWidth * 0.3;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = `bold ${logoHeight * 0.9}px sans-serif`;
        ctx.fillText('MOTIDAY', logoX + logoWidth + textPadding, logoY + logoHeight / 2);

        // 5. 최종 결과물 저장
        setImgSrc(canvas.toDataURL('image/jpeg'));
      };
    };
  }, [webcamRef, dateStr, timeStr]);

  return (
    <PageLayout className="bg-black">
      {imgSrc ? (
        // [결과 확인 화면]
        <div className="relative w-full h-full flex flex-col bg-gray-500">
          <img src={imgSrc} alt="captured" className="w-full h-full object-contain" />
          
          <div className="absolute bottom-10 w-full px-6">
            <div className="flex w-full gap-3">
              <Button variant="secondary" onClick={() => setImgSrc(null)}>
                재촬영
              </Button>
              
              {/* ▼▼▼ [여기가 핵심!] 사진을 들고 이동하는 코드 ▼▼▼ */}
              <Button
                onClick={() => {
                  if (imgSrc) {
                    // state에 사진 데이터(capturedImage)와 routineId를 담아서 보냅니다.
                    navigate('/routine/auth', { 
                      state: { 
                        capturedImage: imgSrc,
                        previousImages,
                        routineId, // 루틴 ID 전달
                      } 
                    });
                  }
                }}
              >
                사용하기
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // [촬영 화면]
        <div className="relative w-full h-full bg-black overflow-hidden">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: facingMode }}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* 상단 로고 */}
          <div className="absolute top-10 w-full p-5 flex items-center gap-3 z-10 pt-[env(safe-area-inset-top)]">
             <img src={logoWhite} alt="logo" className="h-6 object-contain drop-shadow-md" />
             <span className="text-white font-bold text-xl leading-none h-6 flex items-center drop-shadow-md tracking-wide">MOTIDAY</span>
          </div>

          {/* 중앙 가이드라인 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border border-white/30 rounded-2xl relative">
               <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white/80 rounded-tl-lg"></div>
               <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white/80 rounded-tr-lg"></div>
               <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white/80 rounded-bl-lg"></div>
               <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white/80 rounded-br-lg"></div>
            </div>
          </div>

          {/* 하단 컨트롤러 */}
          <div className="absolute bottom-0 w-full pb-10 pt-20 bg-linear-to-t from-black/80 to-transparent z-10 flex flex-col items-center">
            <div className="w-full flex justify-between px-8 mb-8 text-white font-medium text-lg drop-shadow-md">
                <span className="inline-flex items-center gap-2">
                    <img src={iconTimeLine} alt="date" className="h-5 w-5 object-contain" />
                    {dateStr}
                </span>
                <span className="inline-flex items-center gap-2">
                    <img src={iconClock} alt="time" className="h-5 w-5 object-contain" />
                    {timeStr}
                </span>
            </div>

            <div className="relative w-full flex items-center justify-between px-10">
               <div className="w-20 h-20" aria-hidden="true"></div>
               <button onClick={capture} className="absolute left-1/2 -translate-x-1/2 w-20 h-20 bg-primary-800 rounded-full  flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                 <img src={iconCamera} alt="촬영" className="h-10 w-10 object-contain" />
               </button>
               <button onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')} className="w-20 h-20 flex items-center justify-center bg-gray-600/50 rounded-full border border-white/30">
                 <img src={iconLoop} alt="화면 전환" className="h-8 w-8 object-contain" />
               </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default CameraPage;
