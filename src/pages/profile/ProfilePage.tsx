import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import logo from '../../assets/images/img_Motiday.png';
import iconSetting from '../../assets/images/img_Setting.png';
import mainImage from '../../assets/images/img_HomeFeedCard.png';
import heartIcon from '../../assets/images/img_heart_red.png';
import iconPencil from '../../assets/icons/ic_pencil.svg';

const ProfilePage = () => {
  const navigate = useNavigate();

  const galleryImages = [mainImage, mainImage, mainImage, mainImage, mainImage, mainImage];

  return (
    <MainLayout
      header={{
        left: <img src={logo} alt="logo" className="h-8 w-8 object-contain" />,
        right: (
          <button onClick={() => navigate('/setting')}>
            <img src={iconSetting} alt="setting" className="h-6 w-6 object-contain" />
          </button>
        ),
      }}
    >
      <div className="p-4 space-y-5 bg-gray-100">
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-16 w-16 rounded-full bg-primary-700 ">
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <div className="text-xl text-gray-900">Moti_Day</div>
                <span className="flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1">
                  <span className="text-[10px]">✔</span> 인증 12회
                </span>
                <button
                  className="ml-auto text-gray-400 hover:text-gray-600"
                  onClick={() => navigate('/profile/edit')}
                >
                  <img src={iconPencil} alt="프로필 수정" className="h-4 w-4 object-contain" />
                </button>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <span>가슴살 먹는 상.남.자 안김모티</span>
                <img src={heartIcon} alt="heart" className="h-4 w-4 object-contain" />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/profile/point')}
            className="flex items-center gap-2 text-sm text-gray-800"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-700 text-white font-semibold text-sm">
              P
            </span>
            <span className="font-semibold">100 MOTI</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white font-semibold text-sm">
              ?
            </span>
          </button>

          <div className="grid grid-cols-3 divide-x divide-gray-200 rounded-xl bg-gray-50 text-sm font-semibold text-gray-800 overflow-hidden">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3"
              onClick={() => navigate('/profile')}
            >
              <span>게시글</span>
              <span className="text-base font-bold">3</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3"
              onClick={() => navigate('/profile/follow', { state: { tab: 'followers' } })}
            >
              <span>팔로워</span>
              <span className="text-base font-bold">2,432</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3"
              onClick={() => navigate('/profile/follow', { state: { tab: 'following' } })}
            >
              <span>팔로잉</span>
              <span className="text-base font-bold">42</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold flex items-center gap-2">
              목표 루틴 <span className="h-2 w-2 rounded-full bg-yellow-300" />
            </button>
            <button className="px-3 py-2 rounded-full bg-gray-200 text-gray-800 text-sm font-semibold flex items-center gap-2">
              운동 루틴 <span className="h-2 w-2 rounded-full bg-green-300" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {galleryImages.map((img, idx) => (
            <div key={`${img}-${idx}`} className="aspect-square rounded-2xl bg-white overflow-hidden shadow-sm">
              <img src={img} alt={`gallery-${idx}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
