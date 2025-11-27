import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }
>;

const Button = ({ children, variant = 'primary', className, ...rest }: ButtonProps) => {
  const mergedClassName = ['btn', tn-, className].filter(Boolean).join(' ');

  return (
    <button className={mergedClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
