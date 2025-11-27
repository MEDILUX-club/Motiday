import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, helperText, className, ...rest }, ref) => {
    const inputClasses = [
      'w-full h-14 rounded-lg bg-gray-100 px-4 text-base text-gray-900',
      'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className="flex w-full flex-col gap-2 text-sm text-gray-700">
        {label && <span className="font-medium text-gray-800">{label}</span>}
        <input ref={ref} className={inputClasses} {...rest} />
        {helperText && <small className="text-xs text-gray-500">{helperText}</small>}
      </label>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
