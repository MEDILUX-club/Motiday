/**
 * 사용자 프로필 정보
 * GET /api/users/{userId} 응답
 */
export interface UserProfile {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  bio?: string;
  motiBalance?: number;
  // TODO: 백엔드에서 제공 시 추가
  // feedCount?: number;
}

/**
 * 팔로우 사용자 정보 (팔로워/팔로잉 목록용)
 * GET /api/users/{userId}/followers, /followings 응답
 */
export interface FollowUser {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
}

/**
 * 프로필 수정 요청 본문
 */
export interface UpdateUserProfileRequest {
  nickname?: string;
  bio?: string;
  profileImageUrl?: string;
}

/**
 * 닉네임 중복 확인 응답 (true: 사용 가능)
 */
export type CheckNicknameResponse = boolean;
