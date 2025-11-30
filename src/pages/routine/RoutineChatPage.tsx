import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button';
import RoutineChatBubble from '../../components/routine/RoutineChatBubble';
import iconBack from '../../assets/icons/ic_back.svg';
import profileImage from '../../assets/images/img_HomeFeedCard_profile.png';
import mainImage from '../../assets/images/img_HomeFeedCard.png';

const RoutineChatPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout
      header={{
        title: '활동 게시물',
        left: (
          <button onClick={() => navigate(-1)} className="p-2">
            <img src={iconBack} alt="뒤로가기" className="h-6 w-6 object-contain" />
          </button>
        ),
      }}
    >
      <div className="p-4 pb-32">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm min-h-[calc(100vh-250px)] p-4 mb-6 space-y-6">
          <RoutineChatBubble
            userProfile={profileImage}
            userName="김모티"
            contentText="운동 인증 공유합니다! 오늘 5km 조깅 완료했어요."
            timestamp="10:11"
            initialClapCount={2}
          />
          <RoutineChatBubble
            userProfile={profileImage}
            userName="모티데이"
            contentImage={mainImage}
            contentText="Today Run"
            timestamp="10:11"
            initialClapCount={5}
          />
        </div>
      </div>

      <div className="fixed bottom-[110px] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-40">
        <Button onClick={() => navigate('/routine/register')}>클럽 게시물 작성</Button>
      </div>
    </MainLayout>
  );
};

export default RoutineChatPage;
