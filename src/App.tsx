import { useState } from 'react';
import type { Session } from './types';
import { loadSessions, addSession, deleteSession, computeStats, computeDailyTrends } from './utils/storage';
import { Dashboard } from './components/Dashboard';
import { SessionLogger } from './components/SessionLogger';
import { TrendsChart } from './components/TrendsChart';
import { SessionHistory } from './components/SessionHistory';

type Tab = 'overview' | 'trends' | 'history';

export default function App() {
  const [sessions, setSessions] = useState<Session[]>(loadSessions);
  const [tab, setTab] = useState<Tab>('overview');

  const handleAdd = (session: Session) => {
    const updated = addSession(session);
    setSessions(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteSession(id);
    setSessions(updated);
  };

  const stats = computeStats(sessions);
  const trends = computeDailyTrends(sessions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <div>
              <h1 className="text-xl font-bold text-indigo-700 leading-tight">QBank Tracker</h1>
              <p className="text-xs text-gray-400">Track your questions, accuracy &amp; trends</p>
            </div>
          </div>
          <SessionLogger onAdd={handleAdd} />
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
          {(['overview', 'trends', 'history'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`capitalize px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                tab === t
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pb-12">
          {tab === 'overview' && <Dashboard stats={stats} />}
          {tab === 'trends' && <TrendsChart trends={trends} />}
          {tab === 'history' && (
            <SessionHistory sessions={sessions} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
