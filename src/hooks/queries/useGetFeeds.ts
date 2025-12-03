import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { Feed } from '../../types/routine';

export type GetFeedsResponse = Feed[];

const getFeeds = async (): Promise<GetFeedsResponse> => {
  const { data } = await apiClient.get<GetFeedsResponse>('/feeds');
  return data;
};

export const useGetFeeds = (
  options?: Omit<
    UseQueryOptions<GetFeedsResponse, AxiosError, GetFeedsResponse, ['feeds']>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['feeds'],
    queryFn: getFeeds,
    staleTime: 0, // 항상 stale 상태로 유지
    refetchOnMount: 'always', // 마운트 시 항상 refetch
    ...options,
  });

export default useGetFeeds;

