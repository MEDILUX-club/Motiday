import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';

/**
 * 팔로우 여부 확인 API
 * GET /api/users/{userId}/follow/status
 */
const getFollowStatus = async (userId: number): Promise<boolean> => {
  const response = await apiClient.get<boolean>(`/users/${userId}/follow/status`);
  return response.data;
};

/**
 * useGetFollowStatus Hook
 * 특정 사용자를 팔로우하고 있는지 확인합니다.
 */
export const useGetFollowStatus = (
  userId: number,
  options?: Omit<UseQueryOptions<boolean, AxiosError>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['users', userId, 'follow', 'status'],
    queryFn: () => getFollowStatus(userId),
    enabled: Boolean(userId) && (options?.enabled ?? true),
    ...options,
  });

export default useGetFollowStatus;

