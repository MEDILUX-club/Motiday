import PageLayout from '../../components/layout/PageLayout';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import logo from '../../assets/images/img_Motiday.png';
import kakaoIcon from '../../assets/images/img_kakao.png';
import googleIcon from '../../assets/images/img_Google.png';
import naverIcon from '../../assets/images/img_Naver.png';

const LoginPage = () => (
  <PageLayout className="gap-8 p-6">
    <div className="flex flex-col items-center gap-3 pt-4">
      <div className="flex items-center gap-3">
        <img src={logo} alt="MOTIDAY 로고" className="h-12 w-12 object-contain filter grayscale" />
        <span className="text-2xl font-bold text-gray-900">MOTIDAY</span>
      </div>
      <p className="text-base text-gray-500">루틴이 모여 모티를 만든다</p>
    </div>

    <div className="flex flex-1 flex-col justify-center gap-4">
      <InputField placeholder="아이디를 입력해주세요" aria-label="아이디" autoComplete="username" />
      <InputField
        type="password"
        placeholder="비밀번호를 입력해주세요."
        aria-label="비밀번호"
        autoComplete="current-password"
      />

      <div className="flex flex-col gap-3 pt-1">
        <Button variant="outline" className="gap-2 bg-gray-50 text-gray-800">
          <img src={kakaoIcon} alt="카카오" className="h-5 w-5 object-contain filter grayscale" />
          <span className="font-semibold">카카오 로그인</span>
        </Button>
        <Button variant="outline" className="gap-2 bg-gray-50 text-gray-800">
          <img src={googleIcon} alt="구글" className="h-5 w-5 object-contain filter grayscale" />
          <span className="font-semibold">구글 로그인</span>
        </Button>
        <Button variant="outline" className="gap-2 bg-gray-50 text-gray-800">
          <img src={naverIcon} alt="네이버" className="h-5 w-5 object-contain filter grayscale" />
          <span className="font-semibold">네이버 로그인</span>
        </Button>
      </div>
    </div>

    <div className="mb-8 mt-auto flex flex-col items-center gap-3">
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <button className="underline decoration-gray-400 underline-offset-4">아이디 찾기</button>
        <span className="text-gray-300">|</span>
        <button className="underline decoration-gray-400 underline-offset-4">비밀번호 찾기</button>
      </div>
    </div>
  </PageLayout>
);

export default LoginPage;
