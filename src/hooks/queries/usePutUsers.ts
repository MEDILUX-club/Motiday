import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { UserProfile, UpdateUserProfileRequest } from '../../types/user';

export type PutUsersResponse = UserProfile;

interface PutUsersVariables {
  userId: number;
  payload: UpdateUserProfileRequest;
}

interface ErrorResponse {
  message?: string;
  statusCode?: number;
}

const putUsers = async ({ userId, payload }: PutUsersVariables): Promise<PutUsersResponse> => {
  const { data } = await apiClient.put<PutUsersResponse>(`/users/${userId}`, payload);
  return data;
};

export const usePutUsers = (
  options?: Omit<
    UseMutationOptions<PutUsersResponse, AxiosError<ErrorResponse>, PutUsersVariables>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<PutUsersResponse, AxiosError<ErrorResponse>, PutUsersVariables>({
    mutationFn: putUsers,
    onSuccess: async (data, variables, context, mutation) => {
      // 캐시 직접 업데이트 (비활성 쿼리에도 적용됨)
      queryClient.setQueryData(['users', variables.userId], data);
      // 캐시 무효화하여 다음 접근 시 stale 상태로 표시
      await queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    onError: (error, variables, context, mutation) => {
      options?.onError?.(error, variables, context, mutation);
    },
    ...options,
  });
};

export default usePutUsers;
