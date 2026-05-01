import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { DailyTrend } from '../types';

interface Props {
  trends: DailyTrend[];
}

export function TrendsChart({ trends }: Props) {
  if (trends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <p className="text-4xl mb-2">📈</p>
        <p className="text-sm">No trend data yet. Log some sessions to see your progress!</p>
      </div>
    );
  }

  const data = trends.map((t) => ({
    ...t,
    date: t.date.slice(5), // show "MM-DD" for brevity
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All-Time Trends</h2>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Questions Attempted &amp; Accuracy Over Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'accuracy') return [`${value}%`, 'Accuracy'];
                if (name === 'questions') return [value, 'Total Questions'];
                if (name === 'correct') return [value, 'Correct'];
                return [value, String(name)];
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="questions" fill="#c7d2fe" name="questions" radius={[3, 3, 0, 0]} />
            <Bar yAxisId="left" dataKey="correct" fill="#6366f1" name="correct" radius={[3, 3, 0, 0]} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="accuracy"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              name="accuracy"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
