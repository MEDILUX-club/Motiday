import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/common/Button';
import logo from '../../assets/images/img_Motiday.png';
import kakaoIcon from '../../assets/images/img_kakao.png';
import googleIcon from '../../assets/images/img_Google.png';
import naverIcon from '../../assets/images/img_Naver.png';

const LoginPage = () => (
  // [1] flex-col과 h-full(min-h-dvh는 PageLayout에 있음)을 활용해 상하 배치
  <PageLayout className="flex flex-col p-6">
    
    {/* [2] 로고 영역 (화면의 주인공)
      flex-1을 줘서 남은 빈 공간을 다 차지하게 만들고,
      justify-center로 내용을 정중앙에 배치합니다.
    */}
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="MOTIDAY 로고" 
          className="h-10 w-10 object-contain" 
        />
        <span className="text-3xl font-bold text-gray-900">MOTIDAY</span>
        {/* 텍스트 크기도 조금 키웠습니다 (text-2xl -> text-3xl) */}
      </div>
      <p className="text-lg text-gray-500">루틴이 모여 모티를 만든다</p>
    </div>

    {/* [3] 하단 버튼 영역
      여기는 flex-1이 없으므로 내용물 크기만큼만 아래에 깔림.
      mb-8로 하단 여백을 좀 넉넉히 줌.
    */}
    <div className="flex flex-col gap-3 mb-8">
      <Button type="button" variant="outline" className="gap-2 bg-[#FEE500]! text-gray-800 h-14">
        <img src={kakaoIcon} alt="카카오" className="h-5 w-5 object-contain" />
        <span className="font-normal">카카오 로그인</span>
      </Button>
      <Button type="button" variant="outline" className="gap-2 bg-[#FFFFFF] text-gray-800 h-14">
        <img src={googleIcon} alt="구글" className="h-5 w-5 object-contain" />
        <span className="font-normal">구글 로그인</span>
      </Button>
      <Button type="button" variant="outline" className="gap-2 bg-[#03C75A]! text-white h-14">
        <img src={naverIcon} alt="네이버" className="h-5 w-5 object-contain" />
        <span className="font-normal">네이버 로그인</span>
      </Button>
    </div>

  </PageLayout>
);

export default LoginPage;