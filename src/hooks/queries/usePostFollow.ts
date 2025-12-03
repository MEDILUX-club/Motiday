import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';

/**
 * 팔로우 API
 * POST /api/users/{userId}/follow
 */
const postFollow = async (userId: number): Promise<void> => {
  await apiClient.post(`/users/${userId}/follow`);
};

/**
 * usePostFollow Hook
 * 특정 사용자를 팔로우합니다.
 */
export const usePostFollow = (
  options?: Omit<UseMutationOptions<void, AxiosError, number>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFollow,
    onSuccess: async (data, userId, context, mutation) => {
      // 팔로우 상태 갱신
      await queryClient.invalidateQueries({ queryKey: ['users', userId, 'follow', 'status'] });
      // 팔로워/팔로잉 목록 갱신
      await queryClient.invalidateQueries({ queryKey: ['users', userId, 'followers'] });
      await queryClient.invalidateQueries({ queryKey: ['users', userId, 'followings'] });
      
      options?.onSuccess?.(data, userId, context, mutation);
    },
    ...options,
  });
};

export default usePostFollow;
