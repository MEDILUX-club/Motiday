import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import type { UserProfile } from '../../types/user';

const getUsers = async (userId: number): Promise<UserProfile> => {
  const { data } = await apiClient.get<UserProfile>(`/users/${userId}`);
  return data;
};

export const useGetUsers = (
  userId: number,
  options?: Omit<
    UseQueryOptions<
      UserProfile,
      AxiosError,
      UserProfile,
      ['users', number]
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUsers(userId),
    enabled: options?.enabled ?? Boolean(userId),
    ...options,
  });

export default useGetUsers;
