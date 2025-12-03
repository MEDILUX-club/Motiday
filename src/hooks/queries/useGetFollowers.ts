import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { FollowUser } from '../../types/user';

/**
 * 팔로워 목록 조회 API
 * GET /api/users/{userId}/followers
 */
const getFollowers = async (userId: number): Promise<FollowUser[]> => {
  const response = await apiClient.get<FollowUser[]>(`/users/${userId}/followers`);
  return response.data;
};

/**
 * useGetFollowers Hook
 * 특정 사용자의 팔로워 목록을 조회합니다.
 */
export const useGetFollowers = (
  userId: number,
  options?: Omit<UseQueryOptions<FollowUser[], AxiosError>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['users', userId, 'followers'],
    queryFn: () => getFollowers(userId),
    enabled: Boolean(userId) && (options?.enabled ?? true),
    ...options,
  });

export default useGetFollowers;

