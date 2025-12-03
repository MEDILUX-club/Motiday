import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { RoutineStats } from '../../types/routine';

const getRoutineStats = async (routineId: number): Promise<RoutineStats> => {
  const { data } = await apiClient.get<RoutineStats>(`/routines/${routineId}/stats`);
  return data;
};

export const useGetRoutineStats = (
  routineId: number,
  options?: Omit<
    UseQueryOptions<RoutineStats, AxiosError, RoutineStats, ['routines', number, 'stats']>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['routines', routineId, 'stats'],
    queryFn: () => getRoutineStats(routineId),
    enabled: Boolean(routineId) && (options?.enabled ?? true),
    ...options,
  });

export default useGetRoutineStats;

