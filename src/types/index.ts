export interface Session {
  id: string;
  date: string; // ISO date string
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  notes?: string;
}

export interface Stats {
  totalSessions: number;
  totalQuestions: number;
  totalCorrect: number;
  overallAccuracy: number;
  streakDays: number;
  subjectStats: SubjectStat[];
}

export interface SubjectStat {
  subject: string;
  totalQuestions: number;
  totalCorrect: number;
  accuracy: number;
}

export interface DailyTrend {
  date: string;
  questions: number;
  correct: number;
  accuracy: number;
}
