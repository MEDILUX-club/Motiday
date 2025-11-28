import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
  className?: string; // 페이지별 추가 스타일 (padding 등)
};

const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    // [1] 바깥쪽 컨테이너: PC/태블릿에서 배경을 회색으로 칠하고 내용을 가운데 정렬
    <div className="flex min-h-dvh w-full justify-center bg-gray-100">
      
      {/* [2] 안쪽 컨테이너 (실제 앱 화면): 최대 너비 430px 제한 */}
      <div 
        className={`
          relative flex w-full max-w-[430px] flex-col 
          min-h-dvh bg-white shadow-lg
          pt-[env(safe-area-inset-top)] 
          pb-[env(safe-area-inset-bottom)]
          ${className} 
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;