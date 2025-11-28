import { useNavigate } from 'react-router-dom';
// 아이콘 Import
import iconHome from '../../assets/icons/ic_home.svg';
import iconRoutine from '../../assets/icons/ic_routine.svg';
import iconCamera from '../../assets/icons/ic_camera.svg';
import iconStore from '../../assets/icons/ic_store.svg';
import iconaccount from '../../assets/icons/ic_account.svg';

const BottomNavigationBar = () => {
  const navigate = useNavigate();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] h-[88px] z-50">
      
      {/* 배경 SVG */}
      <div className="absolute bottom-0 w-full h-[88px] drop-shadow-[0_-4px_6px_rgba(0,0,0,0.08)]">
         <svg 
           viewBox="0 0 375 88" 
           fill="none" 
           preserveAspectRatio="none" 
           className="w-full h-full"
         >
           <path 
             fillRule="evenodd" 
             clipRule="evenodd" 
             d="M0 0H138C149.205 0 159.284 5.68884 165.234 14.316C170.812 22.4042 178.682 28 187.5 28C196.318 28 204.188 22.4042 209.766 14.316C215.716 5.68884 225.795 0 237 0H375V88H0V0Z" 
             fill="white" 
           />
         </svg>
      </div>

      <div className="relative flex w-full h-full items-end pb-5 px-2">
        
        {/* 왼쪽 그룹 */}
        <div className="flex flex-1 justify-around items-end">
          <NavButton 
            label="홈" 
            icon={iconHome} 
            onClick={() => handleTabClick('/home')} 
          />
          <NavButton 
            label="루틴" 
            icon={iconRoutine} 
            onClick={() => handleTabClick('/routine')} 
          />
        </div>

        {/* 가운데 공백 */}
        <div className="w-20" />

        {/* 오른쪽 그룹 */}
        <div className="flex flex-1 justify-around items-end">
          <NavButton 
            label="스토어" 
            icon={iconStore} 
            onClick={() => handleTabClick('/store')} 
          />
          <NavButton 
            label="마이" 
            icon={iconaccount} 
            onClick={() => handleTabClick('/profile')} 
          />
        </div>

        {/* 중앙 카메라 버튼 */}
        <button
          onClick={() => handleTabClick('/routine/shot')}
          className="absolute left-1/2 -top-2 -translate-x-1/2 
                     flex h-[72px] w-[72px] items-center justify-center 
                     rounded-full bg-primary-800 shadow-lg 
                     transition-transform active:scale-95"
        >
          <img 
            src={iconCamera} 
            alt="촬영" 
            className="h-40 w-40 object-contain" 
          />
        </button>
      </div>
    </div>
  );
};

type NavButtonProps = {
  label: string;
  icon: string;
  onClick: () => void;
};

const NavButton = ({ label, icon, onClick }: NavButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 w-12"
    >
      <img 
        src={icon} 
        alt={label} 
        className="h-6 w-6 object-contain"
      />
      <span className="text-[10px] text-gray-900 font-medium">
        {label}
      </span>
    </button>
  );
};

export default BottomNavigationBar;