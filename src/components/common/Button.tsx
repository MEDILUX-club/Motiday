import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

// ghost 삭제함
type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  // 메인 (노랑)
  primary: 'bg-primary-700 text-gray-800 hover:opacity-90 border-none',
  // 서브 (회색)
  secondary: 'bg-gray-400 text-gray-800 hover:bg-gray-300 border-none',
  // 테두리 (흰색)
  outline: 'border border-gray-200 bg-white text-gray-800 hover:bg-gray-50',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className, disabled, fullWidth = true, ...rest }, ref) => {
    
    const mergedClassName = [
      'h-14 rounded-xl font-bold text-base flex items-center justify-center transition-all duration-200',
      fullWidth ? 'w-full' : '',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantStyles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={mergedClassName} disabled={disabled} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;