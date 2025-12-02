import { useCallback } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import type { SocialType } from '../types/auth';

const provider = new GoogleAuthProvider();
const KAKAO_JS_KEY = 'b7a1d55e1cd02bc8e3e391874bcf8171';
const NAVER_CLIENT_ID = 'VTNbiMfoBmfIubz2rh1t';
const NAVER_REDIRECT_URI = 'http://localhost:5173/login';

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

/**
 * 소셜 로그인 성공 콜백 타입
 */
type OnSocialLoginSuccess = (socialType: SocialType, socialId: string) => void;

/**
 * useSocialLogin Hook
 * 각 소셜 플랫폼에서 토큰을 획득하고 콜백으로 전달
 */
const useSocialLogin = (onSuccess?: OnSocialLoginSuccess) => {
  const buildNaverAuthUrl = useCallback((state: string) => {
    const query = new URLSearchParams({
      response_type: 'token',
      client_id: NAVER_CLIENT_ID,
      redirect_uri: NAVER_REDIRECT_URI,
      state,
    });

    return `https://nid.naver.com/oauth2.0/authorize?${query.toString()}`;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Firebase User 객체에서 고유 ID(uid) 추출
      const uid = result.user.uid;

      console.log('Google uid:', uid);
      onSuccess?.('GOOGLE', uid);
    } catch (error) {
      console.error('Google login failed:', error);
      alert('구글 로그인에 실패했습니다.');
    }
  }, [onSuccess]);

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
        onSuccess?.('KAKAO', authObj.access_token);
      },
      fail: (err) => {
        console.error('Kakao login failed:', err);
        alert('카카오 로그인에 실패했습니다.');
      },
    });
  }, [onSuccess]);

  const loginWithNaver = useCallback(() => {
    const state =
      window.crypto?.randomUUID?.() ??
      Math.random().toString(36).slice(2, 12);

    sessionStorage.setItem('naver_oauth_state', state);

    const authUrl = buildNaverAuthUrl(state);
    window.location.href = authUrl;
  }, [buildNaverAuthUrl]);

  /**
   * 네이버 redirect 콜백 처리 (URL hash에서 토큰 파싱)
   */
  const handleNaverCallback = useCallback(
    (hash: string) => {
      if (!hash || !hash.includes('access_token')) return false;

      const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
      const accessToken = hashParams.get('access_token');
      const state = hashParams.get('state');
      const storedState = sessionStorage.getItem('naver_oauth_state');

      if (state && storedState && state !== storedState) {
        console.warn('Naver state mismatch');
        return false;
      }

      if (accessToken) {
        console.log('Naver accessToken:', accessToken);
        sessionStorage.removeItem('naver_oauth_state');
        onSuccess?.('NAVER', accessToken);
        return true;
      }

      return false;
    },
    [onSuccess]
  );

  return {
    loginWithGoogle,
    loginWithKakao,
    loginWithNaver,
    handleNaverCallback,
  };
};

export default useSocialLogin;
