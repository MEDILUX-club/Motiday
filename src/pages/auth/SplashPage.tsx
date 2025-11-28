import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import logo from '../../assets/images/img_Motiday.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate('/login'), 2000);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <PageLayout className="items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={logo} alt="MOTIDAY logo" className="h-24 w-24 object-contain" />
        <p className="text-2xl font-bold tracking-wide text-gray-900">MOTIDAY</p>
      </div>
    </PageLayout>
  );
};

export default SplashScreen;
