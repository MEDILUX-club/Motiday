import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { Routine } from '../../types/routine';

export type GetUserRoutinesResponse = Routine[];

const getUserRoutines = async (userId: number): Promise<GetUserRoutinesResponse> => {
  const { data } = await apiClient.get<GetUserRoutinesResponse>(`/users/${userId}/routines`);
  return data;
};

export const useGetUserRoutines = (
  userId: number,
  options?: Omit<
    UseQueryOptions<GetUserRoutinesResponse, AxiosError, GetUserRoutinesResponse, ['users', number, 'routines']>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['users', userId, 'routines'],
    queryFn: () => getUserRoutines(userId),
    enabled: Boolean(userId) && (options?.enabled ?? true),
    staleTime: 0, // 항상 fresh 상태 유지
    ...options,
  });

export default useGetUserRoutines;

