/**
 * 소셜 로그인 제공자 타입 (백엔드 스펙: 대문자)
 */
export type SocialType = 'GOOGLE' | 'KAKAO' | 'NAVER';

/**
 * 로그인 요청 DTO
 * POST /api/auth/login
 */
export interface LoginRequest {
  socialType: SocialType;
  socialId: string; // 소셜에서 받은 고유 id (토큰 아님)
}

/**
 * 로그인 응답 DTO
 * POST /api/auth/login
 */
export interface LoginResponse {
  userId: number;
  nickname: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * 사용자 정보 타입 (Store용)
 */
export interface User {
  userId: number;
  nickname: string;
}

/**
 * 토큰 갱신 요청 DTO
 * POST /api/auth/refresh
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * 토큰 갱신 응답 DTO
 * POST /api/auth/refresh
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
