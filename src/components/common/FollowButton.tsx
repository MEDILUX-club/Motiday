import { useGetFollowStatus } from '../../hooks/queries/useGetFollowStatus';
import { usePostFollow } from '../../hooks/queries/usePostFollow';
import { useDeleteFollow } from '../../hooks/queries/useDeleteFollow';
import { useAuthStore } from '../../store/authStore';

type FollowButtonProps = {
  targetUserId: number;
};

/**
 * 팔로우/언팔로우 버튼 컴포넌트
 */
const FollowButton = ({ targetUserId }: FollowButtonProps) => {
  const authUser = useAuthStore((state) => state.user);
  const isSelf = authUser?.userId === targetUserId;

  const { data: isFollowing, isLoading: isStatusLoading } = useGetFollowStatus(targetUserId, {
    enabled: Boolean(targetUserId) && Boolean(authUser?.userId) && !isSelf,
  });

  const { mutate: follow, isPending: isFollowPending } = usePostFollow();
  const { mutate: unfollow, isPending: isUnfollowPending } = useDeleteFollow();

  const isPending = isFollowPending || isUnfollowPending;

  // 자기 자신이면 버튼 표시 안 함
  if (isSelf) {
    return null;
  }

  const handleClick = () => {
    if (isPending) return;
    
    if (isFollowing) {
      unfollow(targetUserId);
    } else {
      follow(targetUserId);
    }
  };

  if (isStatusLoading) {
    return (
      <span className="px-3 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-400">
        ...
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
        isFollowing
          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          : 'bg-primary-700 text-gray-900 hover:bg-primary-600'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isPending ? '...' : isFollowing ? '팔로잉' : '팔로우'}
    </button>
  );
};

export default FollowButton;
