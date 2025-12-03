import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { CheckNicknameResponse } from '../../types/user';

const getUsersCheckNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const { data } = await apiClient.get<CheckNicknameResponse>('/users/check-nickname', {
    params: { nickname },
  });
  return data;
};

export const useGetUsersCheckNickname = (
  nickname: string,
  options?: Omit<
    UseQueryOptions<
      CheckNicknameResponse,
      AxiosError,
      CheckNicknameResponse,
      ['users', 'check-nickname', string]
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['users', 'check-nickname', nickname],
    queryFn: () => getUsersCheckNickname(nickname),
    enabled: options?.enabled ?? Boolean(nickname),
    staleTime: options?.staleTime ?? 0,
    ...options,
  });

export default useGetUsersCheckNickname;
