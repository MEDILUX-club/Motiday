import MainLayout from '../../components/layout/MainLayout';
import iconBack from '../../assets/icons/ic_back.svg';

const SettingPage = () => {
  return (
    <MainLayout
      header={{
        left: <img src={iconBack} alt="back" className="h-8 w-8 object-contain" />,
        title: '환경설정', 
    }}
    >
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">설정</h1>
        <p className="text-gray-700">설정 항목들이 여기 표시됩니다.</p>
      </div>
    </MainLayout>
  );
};

export default SettingPage;
