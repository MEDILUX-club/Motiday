import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
};

const PageLayout = ({ children, className, padded = true }: PageLayoutProps) => {
  const paddingClass = padded ? 'px-6' : '';
  const mergedClassName = [
    'flex min-h-dvh w-full max-w-[430px] flex-col',
    'overflow-y-auto bg-white text-gray-900',
    'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]',
    paddingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="flex min-h-dvh w-full justify-center bg-white">
      <div className={mergedClassName}>{children}</div>
    </div>
  );
};

export default PageLayout;
