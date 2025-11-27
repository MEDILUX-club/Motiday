import type { Challenge } from '../../../types/api';
import ChallengeCard from './ChallengeCard';

type ChallengeListProps = {
  challenges: Challenge[];
  onSelect?: (id: string) => void;
};

const ChallengeList = ({ challenges, onSelect }: ChallengeListProps) => (
  <div className="challenge-list">
    {challenges.map((challenge) => (
      <ChallengeCard key={challenge.id} challenge={challenge} onSelect={onSelect} />
    ))}
  </div>
);

export default ChallengeList;
