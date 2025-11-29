import iconExerciseActive from '../../assets/images/img_Exercise_Active.png';
import iconExerciseInactive from '../../assets/images/img_Exercise_Inactive.png';
import iconStudyActive from '../../assets/images/img_Study_Active.png';
import iconStudyInactive from '../../assets/images/img_Study_Inactive.png';
import iconBookActive from '../../assets/images/img_Book_Active.png';
import iconBookInactive from '../../assets/images/img_Book_Inactive.png';

export type TabType = 'exercise' | 'study' | 'reading';

type TopTabBarProps = {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
};

const TopTabBar = ({ currentTab, onTabChange }: TopTabBarProps) => {
  
  // [2] 탭 데이터 매핑
  const tabs = [
    { 
      id: 'exercise' as TabType, 
      label: '운동', 
      activeIcon: iconExerciseActive, 
      inactiveIcon: iconExerciseInactive 
    },
    { 
      id: 'study' as TabType,    
      label: '공부', 
      activeIcon: iconStudyActive,    
      inactiveIcon: iconStudyInactive 
    },
    { 
      id: 'reading' as TabType,  
      label: '독서', 
      activeIcon: iconBookActive,     
      inactiveIcon: iconBookInactive 
    },
  ];

  return (
    // 하단 라인을 위해 border-b 추가
    <div
      className="flex w-full bg-white border-b border-gray-300"
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-1 flex-col items-center justify-center gap-2 py-3"
          >
            {/* [3] 활성/비활성 상태에 따라 이미지 교체 */}
            <img 
              src={isActive ? tab.activeIcon : tab.inactiveIcon} 
              alt={tab.label} 
              className="h-8 w-8 object-contain transition-all duration-200" 
            />
            
            {/* 텍스트 스타일 변경 (활성시 진하게) */}
            <span className={`text-xs ${isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-500'}`}>
              {tab.label}
            </span>

            {/* [4] 활성 상태일 때 하단 노란색 바 표시 */}
            {isActive && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary-800"
              /> 
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TopTabBar;
