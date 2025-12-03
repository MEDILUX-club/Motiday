import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { Routine, RoutineCategory } from '../../types/routine';

export type GetRoutinesClosedResponse = Routine[];

const getRoutinesClosed = async (category: RoutineCategory): Promise<GetRoutinesClosedResponse> => {
  const { data } = await apiClient.get<GetRoutinesClosedResponse>('/routines/closed', {
    params: { category },
  });
  return data;
};

export const useGetRoutinesClosed = (
  category: RoutineCategory,
  options?: Omit<
    UseQueryOptions<GetRoutinesClosedResponse, AxiosError, GetRoutinesClosedResponse, ['routines', 'closed', RoutineCategory]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['routines', 'closed', category],
    queryFn: () => getRoutinesClosed(category),
    ...options,
  });

export default useGetRoutinesClosed;

