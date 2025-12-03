import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { Routine, RoutineCategory } from '../../types/routine';

export type GetRoutinesRecruitingResponse = Routine[];

const getRoutinesRecruiting = async (category: RoutineCategory): Promise<GetRoutinesRecruitingResponse> => {
  const { data } = await apiClient.get<GetRoutinesRecruitingResponse>('/routines/recruiting', {
    params: { category },
  });
  return data;
};

export const useGetRoutinesRecruiting = (
  category: RoutineCategory,
  options?: Omit<
    UseQueryOptions<GetRoutinesRecruitingResponse, AxiosError, GetRoutinesRecruitingResponse, ['routines', 'recruiting', RoutineCategory]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['routines', 'recruiting', category],
    queryFn: () => getRoutinesRecruiting(category),
    ...options,
  });

export default useGetRoutinesRecruiting;

