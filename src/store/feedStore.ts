import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * 로컬 피드 이미지 저장소
 * 이미지 업로드 API가 없어서 임시로 로컬에 저장
 */
interface FeedState {
  // feedId -> 로컬 이미지 (base64) 매핑
  localFeedImages: Record<number, string>;

  // 액션
  setLocalFeedImage: (feedId: number, image: string) => void;
  getLocalFeedImage: (feedId: number) => string | undefined;
  removeLocalFeedImage: (feedId: number) => void;
  clearAllLocalFeedImages: () => void;
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      localFeedImages: {},

      // 피드 이미지 저장
      setLocalFeedImage: (feedId, image) =>
        set((state) => ({
          localFeedImages: {
            ...state.localFeedImages,
            [feedId]: image,
          },
        })),

      // 피드 이미지 가져오기
      getLocalFeedImage: (feedId) => get().localFeedImages[feedId],

      // 피드 이미지 삭제
      removeLocalFeedImage: (feedId) =>
        set((state) => {
          const { [feedId]: _removed, ...rest } = state.localFeedImages;
          void _removed; // 사용하지 않는 변수 경고 방지
          return { localFeedImages: rest };
        }),

      // 모든 로컬 이미지 삭제
      clearAllLocalFeedImages: () =>
        set({ localFeedImages: {} }),
    }),
    {
      name: 'motiday-feed-images',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

