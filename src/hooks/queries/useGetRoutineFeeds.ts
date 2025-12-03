import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { Feed } from '../../types/routine';

export type GetRoutineFeedsResponse = Feed[];

const getRoutineFeeds = async (routineId: number): Promise<GetRoutineFeedsResponse> => {
  const { data } = await apiClient.get<GetRoutineFeedsResponse>(`/routines/${routineId}/feeds`);
  return data;
};

export const useGetRoutineFeeds = (
  routineId: number,
  options?: Omit<
    UseQueryOptions<GetRoutineFeedsResponse, AxiosError, GetRoutineFeedsResponse, ['routines', number, 'feeds']>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['routines', routineId, 'feeds'],
    queryFn: () => getRoutineFeeds(routineId),
    enabled: Boolean(routineId) && (options?.enabled ?? true),
    ...options,
  });

export default useGetRoutineFeeds;
