import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { CreateFeedRequest, Feed } from '../../types/routine';

export type PostFeedsResponse = Feed;

interface ErrorResponse {
  message?: string;
  statusCode?: number;
}

const postFeeds = async (payload: CreateFeedRequest): Promise<PostFeedsResponse> => {
  const { data } = await apiClient.post<PostFeedsResponse>('/feeds', payload);
  return data;
};

export const usePostFeeds = (
  options?: Omit<
    UseMutationOptions<PostFeedsResponse, AxiosError<ErrorResponse>, CreateFeedRequest>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<PostFeedsResponse, AxiosError<ErrorResponse>, CreateFeedRequest>({
    mutationFn: postFeeds,
    onSuccess: async (data, variables, context, mutation) => {
      // 피드 관련 캐시 무효화 (홈 피드, 프로필 피드 모두 새로고침)
      await queryClient.invalidateQueries({ queryKey: ['feeds'] });
      await queryClient.invalidateQueries({ queryKey: ['routines'] });
      // 사용자별 피드 캐시 무효화 (프로필 페이지 반영)
      await queryClient.invalidateQueries({ 
        queryKey: ['users'],
        refetchType: 'all',
      });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

export default usePostFeeds;

