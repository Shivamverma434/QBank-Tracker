import type { Session, Stats, SubjectStat, DailyTrend } from '../types';

const STORAGE_KEY = 'qbank_sessions';

export function loadSessions(): Session[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session[]) : [];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: Session[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function addSession(session: Session): Session[] {
  const sessions = loadSessions();
  const updated = [session, ...sessions];
  saveSessions(updated);
  return updated;
}

export function deleteSession(id: string): Session[] {
  const sessions = loadSessions().filter((s) => s.id !== id);
  saveSessions(sessions);
  return sessions;
}

export function computeStats(sessions: Session[]): Stats {
  const totalQuestions = sessions.reduce((sum, s) => sum + s.totalQuestions, 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + s.correctAnswers, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Subject breakdown
  const subjectMap = new Map<string, { q: number; c: number }>();
  for (const s of sessions) {
    const prev = subjectMap.get(s.subject) ?? { q: 0, c: 0 };
    subjectMap.set(s.subject, { q: prev.q + s.totalQuestions, c: prev.c + s.correctAnswers });
  }
  const subjectStats: SubjectStat[] = Array.from(subjectMap.entries()).map(([subject, { q, c }]) => ({
    subject,
    totalQuestions: q,
    totalCorrect: c,
    accuracy: q > 0 ? Math.round((c / q) * 100) : 0,
  }));

  // Streak — consecutive days with at least one session (most recent first)
  const uniqueDates = Array.from(new Set(sessions.map((s) => s.date.slice(0, 10)))).sort().reverse();
  let streakDays = 0;
  const today = new Date().toISOString().slice(0, 10);
  let cursor = today;
  for (const d of uniqueDates) {
    if (d === cursor) {
      streakDays++;
      const prev = new Date(cursor);
      prev.setDate(prev.getDate() - 1);
      cursor = prev.toISOString().slice(0, 10);
    } else {
      break;
    }
  }

  return {
    totalSessions: sessions.length,
    totalQuestions,
    totalCorrect,
    overallAccuracy,
    streakDays,
    subjectStats,
  };
}

export function computeDailyTrends(sessions: Session[]): DailyTrend[] {
  const dayMap = new Map<string, { q: number; c: number }>();
  for (const s of sessions) {
    const day = s.date.slice(0, 10);
    const prev = dayMap.get(day) ?? { q: 0, c: 0 };
    dayMap.set(day, { q: prev.q + s.totalQuestions, c: prev.c + s.correctAnswers });
  }
  return Array.from(dayMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { q, c }]) => ({
      date,
      questions: q,
      correct: c,
      accuracy: q > 0 ? Math.round((c / q) * 100) : 0,
    }));
}
