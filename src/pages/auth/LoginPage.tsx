import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/common/Button';
import useSocialLogin from '../../hooks/useSocialLogin';
import logo from '../../assets/images/img_Motiday.png';
import kakaoIcon from '../../assets/images/img_kakao.png';
import googleIcon from '../../assets/images/img_Google.png';
import naverIcon from '../../assets/images/img_Naver.png';

const LoginPage = () => {
  const { loginWithGoogle, loginWithKakao, loginWithNaver } = useSocialLogin();

  return (
    <PageLayout className="flex flex-col p-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="MOTIDAY 로고"
            className="h-10 w-10 object-contain"
          />
          <span className="text-3xl font-bold text-gray-900">MOTIDAY</span>
        </div>
        <p className="text-lg text-gray-500">루틴이 모여 모티가 됩니다.</p>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-14 gap-2 bg-[#FEE500]! text-gray-800"
          onClick={loginWithKakao}
        >
          <img src={kakaoIcon} alt="카카오" className="h-5 w-5 object-contain" />
          <span className="font-normal">카카오 로그인</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-14 gap-2 bg-[#FFFFFF] text-gray-800"
          onClick={loginWithGoogle}
        >
          <img src={googleIcon} alt="구글" className="h-5 w-5 object-contain" />
          <span className="font-normal">구글 로그인</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-14 gap-2 bg-[#03C75A]! text-white"
          onClick={loginWithNaver}
        >
          <img src={naverIcon} alt="네이버" className="h-5 w-5 object-contain" />
          <span className="font-normal">네이버 로그인</span>
        </Button>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
