import type { Session } from '../types';
import { Trash } from './Icons';

interface Props {
  sessions: Session[];
  onDelete: (id: string) => void;
}

export function SessionHistory({ sessions, onDelete }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
        <p className="text-4xl mb-2">📝</p>
        <p className="text-sm">No sessions logged yet. Start by logging your first session!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Session History</h2>
      <div className="space-y-3">
        {sessions.map((s) => {
          const accuracy = s.totalQuestions > 0
            ? Math.round((s.correctAnswers / s.totalQuestions) * 100)
            : 0;
          const date = new Date(s.date);
          const dateStr = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
          const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

          return (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800 truncate">{s.subject}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${accuracyBadge(accuracy)}`}
                  >
                    {accuracy}%
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {s.correctAnswers} / {s.totalQuestions} correct &nbsp;·&nbsp; {dateStr} at {timeStr}
                </p>
                {s.notes && (
                  <p className="text-xs text-gray-400 mt-1 italic">{s.notes}</p>
                )}
              </div>
              <div className="shrink-0">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="none"
                      stroke={accuracy >= 80 ? '#22c55e' : accuracy >= 60 ? '#eab308' : '#ef4444'}
                      strokeWidth="3"
                      strokeDasharray={`${accuracy} ${100 - accuracy}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                    {accuracy}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDelete(s.id)}
                className="shrink-0 text-gray-400 hover:text-red-500 transition"
                title="Delete session"
              >
                <Trash />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function accuracyBadge(acc: number) {
  if (acc >= 80) return 'bg-green-100 text-green-700';
  if (acc >= 60) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-600';
}
