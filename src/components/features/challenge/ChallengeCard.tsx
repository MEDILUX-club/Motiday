import type { Challenge } from '../../../types/api';

type ChallengeCardProps = {
  challenge: Challenge;
  onSelect?: (id: string) => void;
};

const ChallengeCard = ({ challenge, onSelect }: ChallengeCardProps) => {
  const handleClick = () => onSelect?.(challenge.id);

  return (
    <article className="challenge-card" onClick={handleClick} role="button" tabIndex={0}>
      <h3 className="challenge-title">{challenge.title}</h3>
      {challenge.description && <p className="challenge-description">{challenge.description}</p>}
      {typeof challenge.progress === 'number' && (
        <div className="challenge-progress">
          <span>Progress</span>
          <strong>{challenge.progress}%</strong>
        </div>
      )}
    </article>
  );
};

export default ChallengeCard;
