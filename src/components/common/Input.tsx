import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, className, ...rest }, ref) => {
    const mergedClassName = ['input', className].filter(Boolean).join(' ');

    return (
      <label className="input-wrapper">
        {label && <span className="input-label">{label}</span>}
        <input ref={ref} className={mergedClassName} {...rest} />
        {helperText && <small className="input-helper">{helperText}</small>}
      </label>
    );
  },
);

Input.displayName = 'Input';

export default Input;
