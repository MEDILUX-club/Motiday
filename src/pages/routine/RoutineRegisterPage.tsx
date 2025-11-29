import SubLayout from '../../components/layout/SubLayout';

const RoutineRegisterPage = () => {
  return (
    <SubLayout
      header={{ title: '루틴' }}
      footer={{
        type: 'double-button',
        onCancel: () => {},
        onOk: () => {},
        cancelText: '취소',
        okText: '등록',
      }}
    >
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">동아리 정보를 입력하세요</h1>
        <p className="text-gray-700">폼 컴포넌트가 여기 들어갈 예정입니다.</p>
      </div>
    </SubLayout>
  );
};

export default RoutineRegisterPage;
