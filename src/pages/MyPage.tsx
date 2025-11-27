import Header from '../components/layout/Header';
import MobileLayout from '../components/layout/MobileLayout';
import useUserQuery from '../hooks/queries/useUserQuery';

const MyPage = () => {
  const { data, loading, error } = useUserQuery();

  return (
    <MobileLayout>
      <Header title="My Page" />
      <section className="my-page">
        {loading && <p>불러오는 중...</p>}
        {error && <p>에러가 발생했습니다: {error}</p>}
        {data && (
          <div className="user-profile">
            {data.avatarUrl && <img src={data.avatarUrl} alt={data.name} className="profile-avatar" />}
            <h2>{data.name}</h2>
          </div>
        )}
      </section>
    </MobileLayout>
  );
};

export default MyPage;
