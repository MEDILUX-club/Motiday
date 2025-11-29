import type { ReactNode } from 'react';
import PageLayout from './PageLayout';
import Header from '../common/Header';

type SubLayoutProps = {
  children: ReactNode;
  
  // [1] 헤더 설정 (제목 필수)
  header: {
    left?: ReactNode;
    title: string;
    right?: ReactNode;
  };

  // [2] 하단에 고정될 요소 (버튼 OR 토글버튼) - 필수!
  // 여기에 <Button>을 넣거나 <ToggleButton>을 넣으면 됩니다.
  bottomContent: ReactNode;
};

const SubLayout = ({ children, header, bottomContent }: SubLayoutProps) => {
  return (
    <PageLayout>
      {/* 1. 헤더 (뒤로가기 포함) */}
      <Header 
        title={header.title}
        left={<button className="text-xl">←</button>} // 나중에 아이콘으로 교체
        right={header.right}
      />

      {/* 2. 컨텐츠 (가운데 영역) */}
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>

      {/* 3. 하단 고정 영역 (버튼이든 토글이든 여기 들어감) */}
      {/* mt-auto: 내용이 적어도 항상 바닥에 붙음 */}
      {/* bg-white border-t: 하단 영역 구분선과 배경 */}
      <div className="w-full p-4 border-t border-gray-100 bg-white mt-auto flex justify-center">
        {bottomContent}
      </div>

    </PageLayout>
  );
};

export default SubLayout;