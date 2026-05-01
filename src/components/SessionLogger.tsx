import { useState } from 'react';
import type { Session } from '../types';
import { Plus } from './Icons';

interface Props {
  onAdd: (session: Session) => void;
}

export function SessionLogger({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [total, setTotal] = useState('');
  const [correct, setCorrect] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setSubject('');
    setTotal('');
    setCorrect('');
    setNotes('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = parseInt(total, 10);
    const c = parseInt(correct, 10);

    if (!subject.trim()) return setError('Subject is required.');
    if (isNaN(t) || t < 1) return setError('Total questions must be at least 1.');
    if (isNaN(c) || c < 0) return setError('Correct answers cannot be negative.');
    if (c > t) return setError('Correct answers cannot exceed total questions.');

    const session: Session = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      subject: subject.trim(),
      totalQuestions: t,
      correctAnswers: c,
      notes: notes.trim() || undefined,
    };

    onAdd(session);
    reset();
    setOpen(false);
  };

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <Plus />
          Log Session
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Log New Session</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Topic</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics, Biology"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Questions</label>
                <input
                  type="number"
                  min="1"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answers</label>
                <input
                  type="number"
                  min="0"
                  value={correct}
                  onChange={(e) => setCorrect(e.target.value)}
                  placeholder="e.g. 42"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
            {total && correct && !isNaN(parseInt(total)) && !isNaN(parseInt(correct)) && parseInt(total) > 0 && (
              <p className="text-sm text-indigo-600 font-medium">
                Accuracy preview: {Math.round((parseInt(correct) / parseInt(total)) * 100)}%
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Any notes about this session…"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Save Session
              </button>
              <button
                type="button"
                onClick={() => { reset(); setOpen(false); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
