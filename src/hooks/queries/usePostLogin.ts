import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import type { LoginRequest, LoginResponse } from '../../types/auth';

/**
 * 백엔드 로그인 API 호출 함수
 * POST /api/auth/login
 */
const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  return response.data;
};

/**
 * 에러 응답 타입
 */
interface ErrorResponse {
  message: string;
  statusCode: number;
}

/**
 * usePostLogin Hook
 *
 * 소셜 로그인으로 받은 토큰을 백엔드에 전송하여
 * 서비스 자체 토큰과 사용자 정보를 받아오는 mutation hook
 *
 * @example
 * ```tsx
 * const { mutate: login, isPending } = usePostLogin();
 *
 * const handleGoogleLogin = async () => {
 *   const googleToken = await getGoogleToken();
 *   login(
 *     { socialType: 'GOOGLE', socialId: googleToken },
 *     {
 *       onSuccess: () => navigate('/home'),
 *       onError: (error) => console.error(error),
 *     }
 *   );
 * };
 * ```
 */
export const usePostLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, AxiosError<ErrorResponse>, LoginRequest>,
    'mutationFn'
  >
) => {
  const login = useAuthStore((state) => state.login);

  return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginRequest>({
    ...options,
    mutationFn: postLogin,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      // Store에 토큰과 사용자 정보 저장
      login(data.accessToken, data.refreshToken, {
        userId: data.userId,
        nickname: data.nickname,
      });

      // 외부에서 전달된 onSuccess 콜백 실행
      options?.onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      console.error('로그인 실패:', error.response?.data?.message || error.message);

      // 외부에서 전달된 onError 콜백 실행
      options?.onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
};

export default usePostLogin;
