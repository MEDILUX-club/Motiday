import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { CreateRoutineRequest, Routine } from '../../types/routine';

export type PostRoutinesResponse = Routine;

interface ErrorResponse {
  message?: string;
  statusCode?: number;
}

const postRoutines = async (payload: CreateRoutineRequest): Promise<PostRoutinesResponse> => {
  const { data } = await apiClient.post<PostRoutinesResponse>('/routines', payload);
  return data;
};

export const usePostRoutines = (
  options?: Omit<
    UseMutationOptions<PostRoutinesResponse, AxiosError<ErrorResponse>, CreateRoutineRequest>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<PostRoutinesResponse, AxiosError<ErrorResponse>, CreateRoutineRequest>({
    mutationFn: postRoutines,
    onSuccess: async (data, variables, context, mutation) => {
      // 루틴 목록 캐시 무효화 → 전체/모집중/마감/참여중 모두 새로 fetch
      await queryClient.invalidateQueries({ queryKey: ['routines'] });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

export default usePostRoutines;

