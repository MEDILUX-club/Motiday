// 루틴 카테고리
export type RoutineCategory = 'EXERCISE' | 'STUDY' | 'READING';

// 루틴 난이도
export type RoutineDifficulty = 'EASY' | 'STANDARD' | 'HARD';

// 루틴 상태
export type RoutineStatus = 'ACTIVE' | 'RECRUITING' | 'CLOSED';

// 루틴 생성 요청
export interface CreateRoutineRequest {
  title: string;
  description: string;
  category: RoutineCategory;
  difficulty: RoutineDifficulty;
  startDate: string; // YYYY-MM-DD 형식
}

// 루틴 응답
export interface Routine {
  routineId: number;
  title: string;
  description: string;
  category: RoutineCategory;
  difficulty: RoutineDifficulty;
  currentParticipants: number;
  maxParticipants: number;
  startDate: string;
  region: string;
  status: RoutineStatus;
  createdAt: string;
}

