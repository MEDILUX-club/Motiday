import logo from '../../assets/images/img_Motiday.png';

const StoreLoadingPage = () => {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-gray-100 px-6 pb-12 text-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <img src={logo} alt="logo" className="h-24 w-24 object-contain" />
        <div className="space-y-2">
          <div className="text-lg font-semibold text-gray-900">지금의 클릭이 내일의 활력이 됩니다.</div>
          <div className="text-sm text-gray-500">외부 링크 연결 중...</div>
        </div>
      </div>
    </div>
  );
};

export default StoreLoadingPage;
