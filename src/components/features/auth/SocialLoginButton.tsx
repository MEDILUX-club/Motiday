import { ReactNode } from 'react';
import Button from '../../common/Button';

type SocialLoginButtonProps = {
  provider: 'google' | 'kakao' | 'apple' | string;
  onClick?: () => void;
  icon?: ReactNode;
};

const providerLabel: Record<string, string> = {
  google: 'Google로 계속하기',
  kakao: 'Kakao로 계속하기',
  apple: 'Apple로 계속하기',
};

const SocialLoginButton = ({ provider, onClick, icon }: SocialLoginButtonProps) => {
  const label = providerLabel[provider] ?? ${provider}로 계속하기;

  return (
    <Button type="button" variant="secondary" onClick={onClick} className={social-login social-}>
      {icon}
      <span>{label}</span>
    </Button>
  );
};

export default SocialLoginButton;
