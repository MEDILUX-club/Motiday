import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { RoutineParticipant } from '../../types/routine';

interface ErrorResponse {
  message?: string;
  statusCode?: number;
}

const postRoutineJoin = async (routineId: number): Promise<RoutineParticipant> => {
  const { data } = await apiClient.post<RoutineParticipant>(`/routines/${routineId}/join`);
  return data;
};

export const usePostRoutineJoin = (
  options?: Omit<
    UseMutationOptions<RoutineParticipant, AxiosError<ErrorResponse>, number>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<RoutineParticipant, AxiosError<ErrorResponse>, number>({
    mutationFn: postRoutineJoin,
    onSuccess: async (data, variables, context, mutation) => {
      // 참여 후 관련 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: ['routines'] });
      // 사용자 루틴 목록 캐시 무효화 (참여 여부 UI 즉시 반영)
      await queryClient.invalidateQueries({ 
        queryKey: ['users'],
        refetchType: 'all', // 모든 관련 쿼리 즉시 refetch
      });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

export default usePostRoutineJoin;

