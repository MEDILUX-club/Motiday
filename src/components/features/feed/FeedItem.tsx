import { useState } from 'react';
import type { FeedItem as FeedItemType } from '../../../types/api';
import LikeButton from './LikeButton';
import formatDate from '../../../utils/formatDate';

type FeedItemProps = {
  item: FeedItemType;
  onPressLike?: (id: string, liked: boolean) => void;
};

const FeedItem = ({ item, onPressLike }: FeedItemProps) => {
  const [liked, setLiked] = useState(item.liked);
  const [likeCount, setLikeCount] = useState(item.likeCount);

  const handleToggle = (nextLiked: boolean) => {
    setLiked(nextLiked);
    setLikeCount((prev) => (nextLiked ? prev + 1 : Math.max(prev - 1, 0)));
    onPressLike?.(item.id, nextLiked);
  };

  return (
    <article className="feed-item">
      <header className="feed-item-header">
        <div className="feed-item-author">
          {item.author.avatarUrl && <img src={item.author.avatarUrl} alt={item.author.name} className="feed-avatar" />}
          <div>
            <strong>{item.author.name}</strong>
            <time className="feed-time">{formatDate(item.createdAt)}</time>
          </div>
        </div>
      </header>
      <p className="feed-message">{item.message}</p>
      <LikeButton initialLiked={liked} initialCount={likeCount} onToggle={handleToggle} />
    </article>
  );
};

export default FeedItem;
