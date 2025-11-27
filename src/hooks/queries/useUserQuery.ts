import { useEffect, useState } from 'react';
import type { ApiResponse, User } from '../../types/api';

export type UserQueryResult = {
  data: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const mockFetchUser = async (): Promise<ApiResponse<User>> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ data: { id: 'user-demo', name: 'Demo User', avatarUrl: '' } });
    }, 200);
  });
};

const useUserQuery = (): UserQueryResult => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await mockFetchUser();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUser();
  }, []);

  return { data, loading, error, refetch: fetchUser };
};

export default useUserQuery;
