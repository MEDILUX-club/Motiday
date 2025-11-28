//import { motion } from 'framer-motion'; // 부드러운 애니메이션을 위해 사용 (선택사항)

type ToggleButtonProps = {
  leftLabel: string;   // 왼쪽 텍스트 (예: 정보)
  rightLabel: string;  // 오른쪽 텍스트 (예: 참여자)
  active: 'left' | 'right'; // 현재 선택된 상태
  onToggle: (side: 'left' | 'right') => void; // 클릭 시 실행할 함수
};

const ToggleButton = ({ leftLabel, rightLabel, active, onToggle }: ToggleButtonProps) => {
  return (
    // [1] 전체 배경 트랙 (Gray-200)
    <div className="relative flex h-12 w-48 items-center rounded-full bg-gray-200 p-1">
      
      {/* [2] 노란색 배경 애니메이션 (Primary-700) */}
      {/* 배경이 쓱- 이동하는 효과를 줍니다. motion을 안 쓰면 조건부 스타일로 대체 가능 */}
      <div 
        className={`absolute h-10 w-[calc(50%-4px)] rounded-full bg-primary-700 shadow-sm transition-all duration-300 ease-in-out
          ${active === 'left' ? 'left-1' : 'left-[calc(50%+4px)]' /* 위치 이동 로직 */ }
        `} 
      />

      {/* [3] 왼쪽 버튼 */}
      <button
        onClick={() => onToggle('left')}
        className={`z-10 flex-1 rounded-full text-sm font-bold transition-colors duration-200
          ${active === 'left' ? 'text-gray-700' : 'text-gray-400'} 
        `}
      >
        {leftLabel}
      </button>

      {/* [4] 오른쪽 버튼 */}
      <button
        onClick={() => onToggle('right')}
        className={`z-10 flex-1 rounded-full text-sm font-bold transition-colors duration-200
          ${active === 'right' ? 'text-gray-700' : 'text-gray-400'}
        `}
      >
        {rightLabel}
      </button>
    </div>
  );
};

export default ToggleButton;