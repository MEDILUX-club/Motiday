export interface UserProfile {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  bio: string;
  motiBalance: number;
}

export interface UpdateUserProfileRequest {
  nickname: string;
  profileImageUrl: string;
  bio: string;
}

// 닉네임 중복 체크 응답
export type CheckNicknameResponse = boolean;
