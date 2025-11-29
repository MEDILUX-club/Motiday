import { useParams } from 'react-router-dom';
import SubLayout from '../../components/layout/SubLayout';

const ClubDetailPage = () => {
  const { clubId } = useParams<{ clubId: string }>();

  return (
    <SubLayout
      header={{ title: '동아리 상세' }}
      bottomContent={<button className="w-full py-3 rounded-lg bg-blue-500 text-white">참여하기</button>}
    >
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">
          {clubId ? `동아리 ${clubId}` : '동아리 이름'}
        </h1>
        <p className="text-gray-700">
          동아리 소개 내용이 여기에 표시됩니다. 활동 일정, 모집 인원 등 세부 정보를 넣어주세요.
        </p>
      </div>
    </SubLayout>
  );
};

export default ClubDetailPage;
