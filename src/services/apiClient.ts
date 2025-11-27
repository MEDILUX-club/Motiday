export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions = RequestInit & {
  params?: Record<string, string | number>;
  method?: HttpMethod;
};

export const API_BASE_URL = '/api';

const buildUrl = (path: string, params?: Record<string, string | number>) => {
  const url = new URL(${API_BASE_URL}, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...rest } = options;
  const url = buildUrl(path, params);

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...rest,
  });

  if (!response.ok) {
    throw new Error(API request failed with status );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
