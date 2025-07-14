import React from 'react';

export default function TaskTabs({ tab, setTab }) {
  return (
    <div className="flex gap-2 mt-4">
      {['ongoing', 'done', 'overdue'].map(t => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`px-4 py-2 rounded ${tab === t ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}