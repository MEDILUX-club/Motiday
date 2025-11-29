import type { ReactNode } from 'react';
import PageLayout from './PageLayout';
import Header from '../common/Header';
import BottomNavigationBar from '../common/BottomNavigationBar';

type MainLayoutProps = {
  children: ReactNode;
  // [필수] 헤더 관련 설정 (제목 or 아이콘)
  header: {
    title?: string;
    left?: ReactNode;
    right?: ReactNode;
  };
  // [선택] 상단 탭바 (홈 화면 등에서 사용)
  topTabBar?: ReactNode;
};

const MainLayout = ({ children, header, topTabBar }: MainLayoutProps) => {
  return (
    <PageLayout>
      {/* 1. Header (필수) */}
      <Header 
        title={header.title}
        left={header.left}
        right={header.right}
      />

      {/* 2. TopTabBar (선택) - 헤더 바로 아래 위치 */}
      {topTabBar && (
        <div className="w-full z-10">
          {topTabBar}
        </div>
      )}

      {/* 3. Content - 하단바 높이(60px)만큼 여백 확보 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-[60px]">
        {children}
      </div>

      {/* 4. BottomNavigationBar (필수) */}
      <BottomNavigationBar />
    </PageLayout>
  );
};

export default MainLayout;