import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../../common/Button';
import Input from '../../common/Input';

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSubmit?: (values: LoginFormValues) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });

  const handleChange = (field: keyof LoginFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        type="email"
        value={values.email}
        onChange={handleChange('email')}
        placeholder="Email"
        required
        label="이메일"
      />
      <Input
        type="password"
        value={values.password}
        onChange={handleChange('password')}
        placeholder="Password"
        required
        label="비밀번호"
      />
      <Button type="submit" variant="primary">
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
