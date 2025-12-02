import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

/**
 * Axios 인스턴스 생성
 * 모든 API 요청에 사용되는 기본 설정
 */
const apiClient = axios.create({
  // 개발환경: Vite 프록시 사용 (/api → 백엔드로 전달)
  // 프로덕션: 환경변수 사용
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * 모든 요청에 액세스 토큰을 자동으로 헤더에 추가
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * 401 에러 발생 시 토큰 갱신 또는 로그아웃 처리
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken) {
        try {
          // 토큰 갱신 요청
          const response = await axios.post(
            `${apiClient.defaults.baseURL}/auth/refresh`,
            { refreshToken }
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data;

          // 새 토큰 저장
          useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

          // 원래 요청 재시도
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return apiClient(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패 시 로그아웃
          useAuthStore.getState().logout();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // 리프레시 토큰이 없으면 로그아웃
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

