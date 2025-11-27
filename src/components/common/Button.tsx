import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type ButtonVariant = 'solid' | 'outline' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  solid: 'bg-gray-800 text-white hover:bg-gray-700',
  outline: 'border border-gray-300 text-gray-800 bg-white hover:bg-gray-100',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'solid', className, disabled, ...rest }, ref) => {
    const mergedClassName = [
      'w-full h-14 rounded-lg font-bold text-base flex items-center justify-center transition-colors duration-150',
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
