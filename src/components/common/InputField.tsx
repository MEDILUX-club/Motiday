import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import SearchIcon from '../../assets/icons/ic_search.svg';

type InputFieldProps = {
  variant?: 'white' | 'gray';
  multiline?: boolean;
  className?: string;
  showSearchIcon?: boolean; // 단일행에서만 사용되는 좌측 아이콘
  fullWidth?: boolean; // 기본은 w-full, 필요 시 폭 제어
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputField = ({
  variant = 'white',
  multiline = false,
  className,
  rows = 3,
  showSearchIcon = false,
  fullWidth = true,
  ...rest
}: InputFieldProps) => {
  const Element = multiline ? 'textarea' : 'input';

  const baseClasses = [
    'rounded-xl text-sm placeholder:text-gray-400 focus:outline-none px-4 py-3',
    fullWidth ? 'w-full' : '',
    multiline ? 'resize-none' : '',
    variant === 'gray'
      ? 'bg-gray-200 text-gray-700 border border-gray-200'
      : 'bg-white text-gray-900 border border-gray-200',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`relative w-full ${multiline ? '' : 'flex items-center'}`}>
      {!multiline && showSearchIcon && (
        <img
          src={SearchIcon}
          alt="search"
          className="absolute left-3 w-4 h-4"
        />
      )}
      <Element
        className={`${baseClasses} ${!multiline && showSearchIcon ? 'pl-9' : ''}`}
        rows={multiline ? rows : undefined}
        {...rest}
      />
    </div>
  );
};

export default InputField;
