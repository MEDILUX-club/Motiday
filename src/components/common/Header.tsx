import type { ReactNode } from 'react';

type HeaderProps = {
  // 1. 왼쪽 요소: 뒤로가기 버튼이 올 수도 있고, 로고가 올 수도 있음
  left?: ReactNode; 
  
  // 2. 중앙 타이틀: 텍스트가 올 때를 대비
  title?: string;
  
  // 3. 오른쪽 요소: 설정 아이콘, 완료 버튼 등
  right?: ReactNode;

  // 4. 배경색이나 테두리 등을 커스텀할 때
  className?: string; 
};

const Header = ({ left, title, right, className }: HeaderProps) => {
  return (
    <header 
      className={`
        flex h-14 w-full items-center justify-between px-4 bg-white
        ${className}
      `}
    >
      {/* 왼쪽 영역 (크기 확보를 위해 min-w 설정) */}
      <div className="flex min-w-10 items-center justify-start">
        {left}
      </div>

      {/* 중앙 타이틀 (제목이 있을 때만 렌더링) */}
      {title && (
        <h1 className="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
      )}

      {/* 오른쪽 영역 */}
      <div className="flex min-w-10 items-center justify-end">
        {right}
      </div>
    </header>
  );
};

export default Header;