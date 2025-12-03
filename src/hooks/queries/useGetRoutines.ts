import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { Routine, RoutineCategory } from '../../types/routine';

export type GetRoutinesResponse = Routine[];

interface GetRoutinesParams {
  category: RoutineCategory;
}

const getRoutines = async ({ category }: GetRoutinesParams): Promise<GetRoutinesResponse> => {
  const { data } = await apiClient.get<GetRoutinesResponse>('/routines', {
    params: { category },
  });
  return data;
};

export const useGetRoutines = (
  category: RoutineCategory,
  options?: Omit<
    UseQueryOptions<GetRoutinesResponse, AxiosError, GetRoutinesResponse, ['routines', RoutineCategory]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['routines', category],
    queryFn: () => getRoutines({ category }),
    ...options,
  });

export default useGetRoutines;

