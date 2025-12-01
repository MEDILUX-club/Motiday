import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();

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
    alert('준비 중');
  }, []);

  const loginWithNaver = useCallback(() => {
    alert('준비 중');
  }, []);

  return { loginWithGoogle, loginWithKakao, loginWithNaver };
};

export default useSocialLogin;
