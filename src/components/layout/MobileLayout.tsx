import { ReactNode } from 'react';

type MobileLayoutProps = {
  children: ReactNode;
  width?: number;
  className?: string;
};

const MobileLayout = ({ children, width = 480, className }: MobileLayoutProps) => {
  const mergedClassName = ['mobile-layout', className].filter(Boolean).join(' ');

  return (
    <div className="layout-shell">
      <div className={mergedClassName} style={{ maxWidth: ${width}px }}>
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
