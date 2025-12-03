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
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      // 캐시된 사용자 프로필 즉시 업데이트
      queryClient.setQueryData(['users', variables.userId], data);
      options?.onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      options?.onError?.(error, variables, onMutateResult, mutationContext);
    },
    ...options,
  });
};

export default usePutUsers;
