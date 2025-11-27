import { useState } from 'react';

type LikeButtonProps = {
  initialLiked?: boolean;
  initialCount?: number;
  onToggle?: (liked: boolean) => void;
};

const LikeButton = ({ initialLiked = false, initialCount = 0, onToggle }: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    setLiked((prev) => {
      const next = !prev;
      setCount((current) => (next ? current + 1 : Math.max(current - 1, 0)));
      onToggle?.(next);
      return next;
    });
  };

  return (
    <button type="button" className={liked ? 'like-button is-liked' : 'like-button'} onClick={handleClick}>
      <span aria-hidden>{liked ? '♥' : '♡'}</span>
      <span className="like-count">{count}</span>
    </button>
  );
};

export default LikeButton;
