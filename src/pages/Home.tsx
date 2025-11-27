import ChallengeList from '../components/features/challenge/ChallengeList';
import Header from '../components/layout/Header';
import MobileLayout from '../components/layout/MobileLayout';
import type { Challenge } from '../types/api';

const mockChallenges: Challenge[] = [
  { id: '1', title: 'Morning Stretch', description: 'Start the day with a 5 minute stretch', progress: 45 },
  { id: '2', title: 'Read 10 pages', description: 'Finish a chapter before bed', progress: 70 },
];

const Home = () => (
  <MobileLayout>
    <Header title="Home" />
    <main>
      <ChallengeList challenges={mockChallenges} />
    </main>
  </MobileLayout>
);

export default Home;
