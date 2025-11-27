import LoginForm from '../components/features/auth/LoginForm';
import SocialLoginButton from '../components/features/auth/SocialLoginButton';
import Header from '../components/layout/Header';
import MobileLayout from '../components/layout/MobileLayout';

const Login = () => (
  <MobileLayout>
    <Header title="Login" onBack={() => window.history.back()} />
    <section className="login-page">
      <LoginForm onSubmit={(values) => console.log('login submit', values)} />
      <div className="social-login-group">
        <SocialLoginButton provider="google" onClick={() => console.log('google login')} />
        <SocialLoginButton provider="kakao" onClick={() => console.log('kakao login')} />
        <SocialLoginButton provider="apple" onClick={() => console.log('apple login')} />
      </div>
    </section>
  </MobileLayout>
);

export default Login;
