import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { Feed } from '../../types/routine';

export type GetUserFeedsResponse = Feed[];

const getUserFeeds = async (userId: number): Promise<GetUserFeedsResponse> => {
  const { data } = await apiClient.get<GetUserFeedsResponse>(`/users/${userId}/feeds`);
  return data;
};

export const useGetUserFeeds = (
  userId: number,
  options?: Omit<
    UseQueryOptions<GetUserFeedsResponse, AxiosError, GetUserFeedsResponse, ['users', number, 'feeds']>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['users', userId, 'feeds'],
    queryFn: () => getUserFeeds(userId),
    enabled: Boolean(userId) && (options?.enabled ?? true),
    ...options,
  });

export default useGetUserFeeds;

