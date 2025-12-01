import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();
const KAKAO_JS_KEY = 'b7a1d55e1cd02bc8e3e391874bcf8171';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (authObj: { access_token: string }) => void;
          fail: (err: unknown) => void;
        }) => void;
      };
    };
  }
}

const useSocialLogin = () => {
  const navigate = useNavigate();

  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      console.log('Google idToken:', idToken);
      navigate('/home');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  }, [navigate]);

  const loginWithKakao = useCallback(() => {
    if (!window?.Kakao) {
      alert('카카오 SDK를 불러오지 못했습니다.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }

    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log('Kakao accessToken:', authObj.access_token);
        navigate('/home');
      },
      fail: (err) => {
        console.error('Kakao login failed:', err);
        alert('카카오 로그인에 실패했습니다.');
      },
    });
  }, [navigate]);

  const loginWithNaver = useCallback(() => {
    alert('준비 중');
  }, []);

  return { loginWithGoogle, loginWithKakao, loginWithNaver };
};

export default useSocialLogin;
