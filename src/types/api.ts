export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type Challenge = {
  id: string;
  title: string;
  description?: string;
  progress?: number;
};

export type FeedItem = {
  id: string;
  author: User;
  message: string;
  liked: boolean;
  likeCount: number;
  createdAt: string;
};
