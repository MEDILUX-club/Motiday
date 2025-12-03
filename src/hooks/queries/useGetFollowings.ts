import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { FollowUser } from '../../types/user';

/**
 * 팔로잉 목록 조회 API
 * GET /api/users/{userId}/followings
 */
const getFollowings = async (userId: number): Promise<FollowUser[]> => {
  const response = await apiClient.get<FollowUser[]>(`/users/${userId}/followings`);
  return response.data;
};

/**
 * useGetFollowings Hook
 * 특정 사용자의 팔로잉 목록을 조회합니다.
 */
export const useGetFollowings = (
  userId: number,
  options?: Omit<UseQueryOptions<FollowUser[], AxiosError>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['users', userId, 'followings'],
    queryFn: () => getFollowings(userId),
    enabled: Boolean(userId) && (options?.enabled ?? true),
    ...options,
  });

export default useGetFollowings;

