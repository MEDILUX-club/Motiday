import Header from '../components/layout/Header';
import MobileLayout from '../components/layout/MobileLayout';
import type { Challenge } from '../types/api';

const placeholderChallenge: Challenge = {
  id: 'detail-1',
  title: 'Daily Walk',
  description: 'Walk 7,000 steps every day for a month',
  progress: 25,
};

const ChallengeDetail = () => (
  <MobileLayout>
    <Header title="Challenge Detail" onBack={() => window.history.back()} />
    <section className="challenge-detail">
      <h2>{placeholderChallenge.title}</h2>
      <p>{placeholderChallenge.description}</p>
      <p>진행률: {placeholderChallenge.progress}%</p>
    </section>
  </MobileLayout>
);

export default ChallengeDetail;
