import SubLayout from '../../components/layout/SubLayout';

const ClubRegisterPage = () => {
  return (
    <SubLayout
      header={{ title: '동아리 등록' }}
      bottomContent={<button className="w-full py-3 rounded-lg bg-blue-500 text-white">등록하기</button>}
    >
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">동아리 정보를 입력하세요</h1>
        <p className="text-gray-700">폼 컴포넌트가 여기 들어갈 예정입니다.</p>
      </div>
    </SubLayout>
  );
};

export default ClubRegisterPage;
