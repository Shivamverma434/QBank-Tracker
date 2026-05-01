import type { Stats } from '../types';
import { BookOpen, CheckCircle, Target, Flame } from './Icons';

interface Props {
  stats: Stats;
}

export function Dashboard({ stats }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<BookOpen />}
          label="Total Questions"
          value={stats.totalQuestions.toLocaleString()}
          color="blue"
        />
        <StatCard
          icon={<CheckCircle />}
          label="Correct Answers"
          value={stats.totalCorrect.toLocaleString()}
          color="green"
        />
        <StatCard
          icon={<Target />}
          label="Overall Accuracy"
          value={`${stats.overallAccuracy}%`}
          color="purple"
        />
        <StatCard
          icon={<Flame />}
          label="Day Streak"
          value={`${stats.streakDays} day${stats.streakDays !== 1 ? 's' : ''}`}
          color="orange"
        />
      </div>

      {stats.subjectStats.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">By Subject</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.subjectStats.map((s) => (
              <div key={s.subject} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700 truncate">{s.subject}</span>
                  <span className={`text-sm font-bold ${accuracyColor(s.accuracy)}`}>{s.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${accuracyBg(s.accuracy)}`}
                    style={{ width: `${s.accuracy}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {s.totalCorrect} / {s.totalQuestions} correct
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function accuracyColor(acc: number) {
  if (acc >= 80) return 'text-green-600';
  if (acc >= 60) return 'text-yellow-600';
  return 'text-red-500';
}

function accuracyBg(acc: number) {
  if (acc >= 80) return 'bg-green-500';
  if (acc >= 60) return 'bg-yellow-400';
  return 'bg-red-400';
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorMap = {
  blue: 'bg-blue-50 border-blue-200 text-blue-600',
  green: 'bg-green-50 border-green-200 text-green-600',
  purple: 'bg-purple-50 border-purple-200 text-purple-600',
  orange: 'bg-orange-50 border-orange-200 text-orange-600',
};

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-2 shadow-sm ${colorMap[color]}`}>
      <div className="text-2xl">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs font-medium opacity-70">{label}</div>
    </div>
  );
}
