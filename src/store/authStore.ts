import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types/auth';

/**
 * Auth Store 상태 타입
 */
interface AuthState {
  // 상태
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  localProfileImage: string | null; // 서버 업로드 전 임시 로컬 이미지

  // 액션
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  setLocalProfileImage: (image: string | null) => void;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

/**
 * Auth Store
 * Zustand + persist 미들웨어로 LocalStorage에 상태 영구 저장
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      localProfileImage: null,

      // 토큰만 업데이트 (토큰 갱신 시 사용)
      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      // 사용자 정보만 업데이트
      setUser: (user) =>
        set({
          user,
        }),

      // 로컬 프로필 이미지 업데이트 (서버 업로드 전 임시)
      setLocalProfileImage: (image) =>
        set({
          localProfileImage: image,
        }),

      // 로그인 (토큰 + 사용자 정보 한번에 저장)
      login: (accessToken, refreshToken, user) =>
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
        }),

      // 로그아웃 (모든 상태 초기화)
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'motiday-auth', // LocalStorage 키 이름
      storage: createJSONStorage(() => localStorage),
      // 영구 저장할 필드 지정 (토큰과 사용자 정보, 로컬 프로필 이미지)
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        localProfileImage: state.localProfileImage,
      }),
    }
  )
);

