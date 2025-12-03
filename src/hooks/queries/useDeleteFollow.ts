import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';

/**
 * 언팔로우 API
 * DELETE /api/users/{userId}/follow
 */
const deleteFollow = async (userId: number): Promise<void> => {
  await apiClient.delete(`/users/${userId}/follow`);
};

/**
 * useDeleteFollow Hook
 * 특정 사용자를 언팔로우합니다.
 */
export const useDeleteFollow = (
  options?: Omit<UseMutationOptions<void, AxiosError, number>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFollow,
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

export default useDeleteFollow;
